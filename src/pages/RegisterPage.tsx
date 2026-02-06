  
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchRegistrationConfig, type RegistrationConfigResponse } from '../api/public'
import { initiatePayment, verifyPaymentSignature } from '../api/registration'
import { fetchMe } from '../api/auth'
import { showToast } from '../utils/toast'
import PaymentProcessingModal from '../components/PaymentProcessingModal'
import LiquidGlassCard from '../components/liquidglass/LiquidGlassCard'
import regBg from '../assets/reg-bg.jpg'


function RegisterPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Clean URL params if any (legacy token handling)
    const params = new URLSearchParams(window.location.search)
    if (params.get('token')) {
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])
  
  const { data: userData, isLoading: isUserLoading, isError: isUserError, refetch: refetchUser } = useQuery({
      queryKey: ['me'],
      queryFn: fetchMe,
      retry: false,
  })




  // Redirect if not authenticated (and not loading)
  useEffect(() => {
    // If we have no token, or if fetchMe failed
    if (!isUserLoading && !userData) {
        window.location.href = `${import.meta.env.VITE_AUTH_URL}/?redirect=${encodeURIComponent(window.location.href)}`
        return
    }
    
    if (!isUserLoading && isUserError) {
         window.location.href = `${import.meta.env.VITE_AUTH_URL}/?redirect=${encodeURIComponent(window.location.href)}`
    }
  }, [isUserLoading, isUserError])

  const user = userData?.user
  
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    status: 'SUCCESS' | 'FAILED' | 'PENDING'
    pid?: string | null
  }>({
    isOpen: false,
    status: 'PENDING',
    pid: null,
  })

  // Redirect if user already has PID and modal is closed
  useEffect(() => {
    if (user?.pid && !modalState.isOpen) {
      navigate('/')
    }
  }, [user?.pid, modalState.isOpen, navigate])

  const { data: registrationConfig, isLoading: isConfigLoading } = useQuery<RegistrationConfigResponse>({
    queryKey: ['registration-config'],
    queryFn: fetchRegistrationConfig,
  })
  
  const [registrationOption, setRegistrationOption] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isPaymentInitiating, setIsPaymentInitiating] = useState(false)

  const computedSelection = useMemo(() => {
      if (!user) return 'NMAMIT';
      if (user.collegeId === 1) return 'NMAMIT';
      return 'OTHER';
  }, [user]);

  const feeOptions = useMemo(() => {
    if (!registrationConfig) return []
    const { fees, isRegistrationOpen, isSpotRegistration } = registrationConfig
    
    if (!isRegistrationOpen) return []

    let options = []

    if (computedSelection === 'NMAMIT') {
          if (isSpotRegistration) {
            options = [
              {
                id: 'internal-onspot',
                label: 'On spot registration',
                amount: Number(fees.internalRegistrationOnSpot) || 0,
              },
            ]
          } else {
             // Filter out Merch, only keep Pass
             options = [
                {
                  id: 'internal-pass',
                  label: 'Incridea Pass',
                  amount: fees.internalRegistrationFeeGen,
                },
             ]
          }
    } else {
      // OTHER
       if (isSpotRegistration) {
          options = [
            {
              id: 'external-onspot',
              label: 'On spot registration',
              amount: fees.externalRegistrationFeeOnSpot,
            },
          ]
        } else {
           options = [{ id: 'external-early', label: 'Early Bird', amount: fees.externalRegistrationFee }]
        }
    }
    
    return options
  }, [registrationConfig, computedSelection])

  useEffect(() => {
    if (feeOptions.length > 0) {
      setRegistrationOption(feeOptions[0]?.id ?? '')
    } else {
      setRegistrationOption('')
    }
  }, [feeOptions])

  // Pricing Calculation
  const selectedFee = useMemo(() => {
      return feeOptions.find(o => o.id === registrationOption)
  }, [feeOptions, registrationOption])

  const pricingBreakdown = useMemo(() => {
      if (!selectedFee) return null
      const base = Number(selectedFee.amount)
      // 2.36% tax
      const taxRate = 0.0236
      const taxAmount = base * taxRate
      const total = Math.ceil(base + taxAmount)
      
      return {
          base,
          tax: taxAmount, 
          total
      }
  }, [selectedFee])


  const handlePayment = async () => {
     if (!registrationOption || !termsAccepted || isPaymentInitiating) return
     
     setIsPaymentInitiating(true)

     const loadScript = (src: string) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
     }

     try {
         const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
         if (!res) {
             showToast('Razorpay SDK failed to load', 'error')
             setIsPaymentInitiating(false)
             return
         }

         const data = await initiatePayment(registrationOption)
         
         const options = {
             key: data.key,
             amount: data.amount,
             currency: data.currency,
             name: "Incridea'26 - Registration",
             description: 'Fest Registration',
             order_id: data.orderId,
             prefill: {
                 name: user?.name,
                 email: user?.email,
                 contact: user?.phoneNumber
             },
             theme: {
                 color: '#460c78' 
             },
             handler: async function (response: any) {
                setModalState({ 
                  isOpen: true, 
                  status: 'PENDING',
                })
                setIsPaymentInitiating(false)

                try {
                  await verifyPaymentSignature(response)
                } catch (error) {
                  console.error('Payment verification request failed', error)
                  setModalState({
                    isOpen: true,
                    status: 'FAILED',
                    pid: null,
                  })
                }
              },
              modal: {
                ondismiss: async function () {
                   setModalState((prev) => ({ ...prev, isOpen: true, status: 'PENDING', pid: null }))
                   setIsPaymentInitiating(false)
                   const { data: updatedUser } = await refetchUser()
                    if (updatedUser?.user?.pid) {
                      setModalState({
                        isOpen: true,
                        status: 'SUCCESS',
                        pid: updatedUser.user.pid,
                      })
                    } else {
                       setModalState({
                        isOpen: true,
                        status: 'FAILED',
                        pid: null,
                      })
                    }
                },
              },
         }
         
         const paymentObject = new (window as any).Razorpay(options)
         paymentObject.on('payment.failed', function (response: any) {
             showToast(response.error.description || 'Payment Failed', 'error')
             setIsPaymentInitiating(false)
         })
         paymentObject.open()
         // Note: We don't set isPaymentInitiating(false) here immediately because we want it to stay 'loading'
         // until the user interacts with the modal (dismiss or success).
         // However, `open()` is non-blocking usually? No, the modal opens.
         // Actually, if we want to show "Opening...", maybe we should reset after open?
         // But the user said "Show Opening payment page when clicked and razorpay page is opened".
         // The razorpay page IS the modal/iframe.
         // So keeping it "Opening..." might be confusing if the modal is already there?
         // User might mean "Show 'Opening...' WHILST it is opening".
         // Let's keep it disabled but maybe change text back? 
         // "Disable the complete payment button and show Opening payment page when clicked and razorpay page is opened"
         // This phrasing suggests: Click -> Button Disabled & Text "Opening..." -> Razorpay Opens.
         // It doesn't explicitly say "Re-enable". But logically it should be disabled while payment is in progress?
         // Or strictly "Opening..." is for the loading phase.
         // Ill keep it simple: Start loading -> Open -> Stop loading (or keep disabled)?
         // If I stop loading immediately after `open()`, it flashes.
         // If I wait for dismiss/handler, it stays "Opening..." while user is paying.
         // That might be better.
         
     } catch (err: any) {
         console.error(err)
         showToast(err.response?.data?.message || 'Error initiating payment', 'error')
         setIsPaymentInitiating(false)
     }
  }


  if (isUserLoading || isConfigLoading) {
      return <div className="p-8 text-center text-slate-400 font-moco">Loading...</div>
  }

  if (registrationConfig && !registrationConfig.isRegistrationOpen) {
    return (
      <section className="space-y-4 max-w-2xl mx-auto p-4">
        <LiquidGlassCard className="p-6">
          <p className="muted mb-2 font-moco">Registration</p>
          <h1 className="text-2xl text-slate-50 font-moco font-bold">Register Incridea</h1>
          <p className="mt-2 text-slate-300 font-moco">Registrations are not open yet. Please check back soon.</p>
        </LiquidGlassCard>
      </section>
    )
  }

  return (
    <>
      <div 
          className="fixed inset-0 -z-10 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${regBg})` }}
      />
      <section className="relative max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8">
            <h1 className="text-3xl text-slate-50 font-moco font-bold">Incridea Registration</h1>
            <p className="text-slate-400 mt-1 font-moco">Confirm your details and complete payment to join.</p>
        </div>

        <LiquidGlassCard className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column: Details & Terms */}
              <div className="space-y-6 h-fit">
                  <div>
                      <h2 className="text-xl text-slate-100 mb-4 font-moco font-bold">Your Details</h2>
                      <div className="space-y-4 text-sm">
                          <div className="p-3 rounded-lg">
                              <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1 font-moco">Name</span>
                              <div className="text-slate-200 font-moco font-bold">{user?.name}</div>
                          </div>
                          <div className="p-3 rounded-lg">
                              <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1 font-moco">Email</span>
                              <div className="text-slate-200 font-moco font-bold">{user?.email}</div>
                          </div>
                          <div className="p-3 rounded-lg">
                              <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1 font-moco">Contact</span>
                              <div className="text-slate-200 font-moco font-bold">{user?.phoneNumber || 'N/A'}</div>
                          </div>
                      </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                      <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-center mt-0.5">
                              <input 
                                  type="checkbox" 
                                  className="peer h-5 w-5 appearance-none rounded border border-slate-600 checked:border-sky-500 checked:bg-sky-500 transition-colors"
                                  checked={termsAccepted}
                                  onChange={(e) => setTermsAccepted(e.target.checked)}
                              />
                              <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors font-moco">
                              I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 hover:underline">Terms and Conditions</a>, <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 hover:underline">Privacy Policy</a>, and <a href="/refund" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 hover:underline">Refund Policy</a> of Incridea.
                          </div>
                      </label>
                  </div>
              </div>

              {/* Right Column: Pricing */}
              <div className="space-y-6 flex flex-col h-fit relative lg:pl-12 lg:border-l border-slate-800">
                  <div>
                      <h2 className="text-xl text-slate-100 font-moco font-bold">Payment Summary</h2>                  
                      {/* Status Message */}
                      <div className={`py-2 rounded-lg text-xs font-moco ${
                          !registrationConfig?.isSpotRegistration 
                      }`}>
                          {!registrationConfig?.isSpotRegistration ? (
                              <p>Oh nice you are a early bird therefore you have early bird discount, Don't wait until Incridea !</p>
                          ) : (
                              <p>You missed the early bird discount. Only On-Spot Registration is available</p>
                          )}
                      </div>
                  </div>

                  {pricingBreakdown ? (
                      <div className="space-y-4">
                          <div className="rounded-lg p-4 border border-slate-800 space-y-3">
                              <div className="flex justify-between items-center text-slate-300 font-moco">
                                  <span>{selectedFee?.label}</span>
                                  <span>₹ {pricingBreakdown.base.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-400 text-sm font-moco">
                                  <span>Tax & Gateway Charges</span>
                                  <span>₹ {pricingBreakdown.tax.toFixed(2)}</span>
                              </div>
                              <div className="h-px bg-slate-700/50 my-2"></div>
                              <div className="flex justify-between items-center text-slate-100 text-lg font-moco font-bold">
                                  <span>Total Payable</span>
                                  <span>₹ {pricingBreakdown.total}</span>
                              </div>
                          </div>
                          
                          <div className="border border-sky-500/20 p-3 rounded text-xs text-sky-200/80 font-moco">
                              Note: The total amount is rounded up to the nearest integer.
                          </div>
                      </div>
                  ) : (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded font-moco">
                          No valid registration option available.
                      </div>
                  )}

                  <button 
                      className={`button w-full py-4 text-base shadow-lg shadow-sky-900/20 font-moco font-bold ${(!registrationOption || !termsAccepted || isPaymentInitiating) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                      onClick={handlePayment}
                      disabled={!registrationOption || !termsAccepted || isPaymentInitiating}
                  >
                      {isPaymentInitiating ? 'Opening payment page...' : (pricingBreakdown ? `Pay ₹ ${pricingBreakdown.total}` : 'Complete Registration')}
                  </button>
              </div>
          </div>
        </LiquidGlassCard>

        <PaymentProcessingModal 
          isOpen={modalState.isOpen}
          onClose={() => {
              setModalState(prev => ({ ...prev, isOpen: false }))
              // Optionally refetch user or redirect
              if (modalState.status === 'SUCCESS' || modalState.pid) {
                  navigate('/')
              }
          }}
          userId={user?.id}
          completedPid={modalState.pid}
          failed={modalState.status === 'FAILED'}
        />
      </section>
    </>
  )
}

export default RegisterPage
