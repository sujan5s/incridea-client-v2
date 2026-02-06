

// Using the exact glass style from GuidelinesPage
const glassCardStyle = {
  borderRadius: "1.75rem",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  background: `
      linear-gradient(to top, rgba(0, 0, 0, 0.20), transparent 60%),
      rgba(21, 21, 21, 0.30)
    `,
  boxShadow: `
      inset 0 0 0 1px rgba(255, 255, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.22)
    `,
  backdropFilter: "brightness(1.1) blur(1px)",
  WebkitBackdropFilter: "brightness(1.1) blur(1px)",
};

function RefundPolicy() {
  return (
    <>
      {/* Standardized Background to match other pages */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0" />
      </div>

      {/* Main scrollable container */}
      <div className="min-h-screen w-full px-3 sm:px-4 lg:px-8 py-8 text-slate-100 font-sans antialiased">
        <div
          /* Matches the width and growth logic of GuidelinesPage */
          className="mx-auto w-full max-w-6xl flex flex-col relative"
          style={glassCardStyle}
        >
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Header aligned with scaling of other pages */}
            <header className="space-y-2 sm:space-y-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal text-fuchsia-100 drop-shadow-[0_0_15px_rgba(232,121,249,0.3)] text-center leading-tight">
                Refund Policy
              </h1>
              <p className="text-center text-fuchsia-300/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                Guidelines & Regulations
              </p>
            </header>

            <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-fuchsia-200/20 to-transparent" />

            {/* Content using standardized responsive text sizes */}
            <div className="flex flex-col gap-8 text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
              <section className="flex flex-col gap-3">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-fuchsia-300">
                  Introduction
                </h2>
                <p>
                  We offer a seamless registration process using Razorpay, a
                  secure payment gateway. This page outlines our refund policy
                  to provide clarity and peace of mind in case of any issues
                  with your payment.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-fuchsia-300">
                  Payment Process
                </h2>
                <p>
                  Our payment process is designed to be easy and convenient for
                  you. We offer multiple payment options, including credit/debit
                  cards, net banking, and UPI. Once you select your preferred
                  payment method, you will be redirected to Razorpay&apos;s
                  secure payment gateway to complete the payment process.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-fuchsia-300">
                  Refund Policy
                </h2>
                <p>
                  We understand that sometimes processing errors or technical
                  glitches can occur during the payment process, leading to an
                  unsuccessful transaction. In such cases, the amount paid by
                  you will be credited back to your account automatically within
                  5-7 business days. Please note that this refund is only
                  applicable in the case of an unsuccessful transaction due to
                  processing errors and not for any other reasons.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-fuchsia-300">
                  Non-Refundable Services
                </h2>
                <p>
                  Please note that our registration services are non-refundable
                  and cannot be cancelled once payment has been made. This
                  policy is in place to ensure that we can deliver the best
                  possible experience for all our customers. Registrations from
                  non-engineering colleges are not permitted. In the event of
                  any false or fraudulent registration, the organizing committee
                  reserves the right to cancel the registration without issuing
                  a refund.
                </p>
              </section>

              <section className="flex flex-col gap-3">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-fuchsia-300">
                  Payment Security
                </h2>
                <p>
                  We take the safety and security of your payment information
                  very seriously. Our payment gateway partner, Razorpay, ensures
                  that all transactions are secure and protected by
                  industry-standard encryption. You can be confident that your
                  payment information is safe when you use our website for
                  registration.
                </p>
              </section>

              <section className="flex flex-col gap-3 border-t border-fuchsia-200/20 pt-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-fuchsia-300">
                  Contact Information
                </h2>
                <p>
                  If you have any questions or concerns about our refund policy
                  or payment process, please do not hesitate to contact our
                  team. You can reach us at{" "}
                  <a
                    href="mailto:incridea@nmamit.in"
                    className="font-semibold text-sky-300 underline underline-offset-4 hover:text-sky-200 transition-colors"
                  >
                    incridea@nmamit.in
                  </a>{" "}
                  or{" "}
                  <span className="inline-block font-semibold text-slate-100">
                    +91 94488 46524 or +91 96863 56123
                  </span>
                  , and we will be happy to assist you.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RefundPolicy;
