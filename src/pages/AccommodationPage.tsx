
import { useQuery } from '@tanstack/react-query'
import { IndividualBookingForm } from '../components/accommodation/BookingForms'
import { getAccommodationStats } from '../api/accommodation'
import { Loader2, Moon, User, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import LiquidGlassCard from '../components/liquidglass/LiquidGlassCard'

export default function AccommodationPage() {
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['accommodationStats'],
    queryFn: getAccommodationStats,
  })

  // Auth Guard
  const { data: meData, isError: isAuthError, isLoading: isAuthLoading } = useQuery({
      queryKey: ['me'],
      queryFn: async () => {
          try {
             return await import('../api/auth').then(m => m.fetchMe())
          } catch (e) {
              throw e
          }
      },
      retry: false
  })

  const user = meData?.user

  if (isAuthError) {
       window.location.href = `${import.meta.env.VITE_AUTH_URL}/?redirect=${encodeURIComponent(window.location.href)}`
       return null
  }

  if (isAuthLoading) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-50">
             <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
        </div>
      )
  }

  // Simple check - in real app might want to check user gender context too if applicable
  const accommodationsFull = stats && stats.boys.available <= 0 && stats.girls.available <= 0

  return (
      <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <header className="mb-10 text-center relative">
           <h1 className="text-4xl md:text-5xl font-font-heading font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 mb-4 font-moco">
            Accommodation
           </h1>
           <p className="text-gray-400 max-w-2xl mx-auto font-moco">
             Book your stay for Incridea. Secure a spot for yourself or your team.
             Limited availability!
           </p>
        </header>

        {isLoading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats / Info Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <LiquidGlassCard className="p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center font-moco">
                            <Moon className="w-5 h-5 mr-2 text-yellow-400" /> Availability
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-300 font-moco">Boys</span>
                                <span className={clsx("font-bold px-2 py-1 rounded text-sm font-moco", 
                                    (stats?.boys.available || 0) > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
                                    {stats?.boys.available} Slots Left
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-300 font-moco">Girls</span>
                                <span className={clsx("font-bold px-2 py-1 rounded text-sm font-moco", 
                                    (stats?.girls.available || 0) > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
                                    {stats?.girls.available} Slots Left
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-xs text-gray-500 font-moco">
                            * Accommodation is provided on a first-come, first-served basis.
                        </div>
                    </LiquidGlassCard>
                </div>

                {/* Booking Forms */}
                <div className="lg:col-span-2">
                     <LiquidGlassCard>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4 font-moco">
                                <User className="w-5 h-5 mr-2 text-purple-500" /> Individual Booking
                            </h2>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                {accommodationsFull ? (
                                    <div className="text-center py-10 text-red-400 font-moco">
                                        Accommodation is currently full. Please check back later.
                                    </div>
                                ) : !user?.pid ? (
                                    <div className="text-center py-10 space-y-3">
                                        <p className="text-red-400 font-moco">You need to register to Incridea first to book accommodation.</p>
                                        <Link to="/register" className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors font-moco">
                                            Register for Incridea
                                        </Link>
                                    </div>
                                ) : (
                                    <IndividualBookingForm onSuccess={() => refetch()} />
                                )}
                            </motion.div>
                        </div>
                     </LiquidGlassCard>
                </div>
            </div>
        )}
      </div>
  )
}
