function RefundPage() {
  return (
    <div className="min-h-screen px-3 sm:px-4 pb-28 md:pb-16 pt-8 sm:pt-10 text-slate-100 md:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-2xl bg-slate-950/50 border border-slate-800 p-6 md:p-10 shadow-xl">
        <h1 className="mb-6 text-center text-4xl tracking-wider md:text-6xl font-life-craft text-sky-200">Refund Policy</h1>
        <div className="space-y-6 text-slate-300">
          <div>
            <h2 className="mt-4 text-2xl font-semibold text-sky-100">Introduction</h2>
            <p className="mt-2">
              We offer a seamless registration process using Razorpay, a secure payment gateway. This page
              outlines our refund policy to provide clarity and peace of mind in case of any issues with your payment.
            </p>
          </div>

          <div>
            <h2 className="mt-4 text-2xl font-semibold text-sky-100">Payment Process</h2>
            <p className="mt-2">
              Our payment process is designed to be easy and convenient for you. We offer multiple payment options,
              including credit/debit cards, net banking, and UPI. Once you select your preferred payment method, you
              will be redirected to Razorpay&apos;s secure payment gateway to complete the payment process.
            </p>
          </div>

          <div>
            <h2 className="mt-4 text-2xl font-semibold text-sky-100">Refund Policy</h2>
            <p className="mt-2">
              We understand that sometimes processing errors or technical glitches can occur during the payment process,
              leading to an unsuccessful transaction. In such cases, the amount paid by you will be credited back to your
              account automatically within 5-7 business days. Please note that this refund is only applicable in the case
              of an unsuccessful transaction due to processing errors and not for any other reasons.
            </p>
          </div>

          <div>
            <h2 className="mt-4 text-2xl font-semibold text-sky-100">Non-Refundable Services</h2>
            <p className="mt-2">
              Please note that our registration services are non-refundable and cannot be cancelled once payment has been
              made. This policy is in place to ensure that we can deliver the best possible experience for all our customers.
              Registrations from non-engineering colleges are not permitted. In the event of any false or fraudulent registration,
              the organizing committee reserves the right to cancel the registration without issuing a refund.
            </p>
          </div>

          <div>
            <h2 className="mt-4 text-2xl font-semibold text-sky-100">Payment Security</h2>
            <p className="mt-2">
              We take the safety and security of your payment information very seriously. Our payment gateway partner,
              Razorpay, ensures that all transactions are secure and protected by industry-standard encryption. You can be
              confident that your payment information is safe when you use our website for registration.
            </p>
          </div>

          <div>
            <h2 className="mt-4 text-2xl font-semibold text-sky-100">Contact Information</h2>
            <p className="mt-2 text-slate-300">
              If you have any questions or concerns about our refund policy or payment process, please do not hesitate to contact
              our team. You can reach us at{' '}
              <a href="mailto:incridea@nmamit.in" className="font-semibold underline hover:text-sky-300 transition-colors">
                incridea@nmamit.in
              </a>{' '}
              or{' '}
              <span className="inline-block font-semibold">+91 94488 46524 or +91 96863 56123</span>
              , and we will be happy to assist you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefundPage
