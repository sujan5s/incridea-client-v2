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

const PrivacyPage = () => {
  return (
    <div className="min-h-screen px-3 sm:px-4 pb-28 md:pb-16 pt-8 sm:pt-10  md:px-6 max-w-6xl">
      {/* Updated className to max-w-6xl mx-auto to match GuidelinesPage width */}
      <div style={glassCardStyle} className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-6 md:p-10">
        <div className="flex flex-initial flex-col gap-4 pb-10  border-b border-slate-800/50">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-life-craft tracking-wider text-purple-200">
            Incridea 2026 Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-purple-400">
            At Incridea, we take your privacy seriously and are committed to
            protecting your personal information. This privacy policy explains
            how we collect, use, and safeguard your data. By registering for our
            festival competition, you agree to the terms of this privacy policy.
          </p>
        </div>

        <section className="flex  mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Consent
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            By registering and submitting your personal information, you are
            indicating your consent to the collection, utilization, and sharing
            of your data in accordance with the terms outlined in our privacy
            policy. If any aspect of this policy is not agreeable to you, we
            kindly request that you refrain from submitting your information or
            participating in our festival competition.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Information Collection
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            We collect personally identifiable information from you when you
            voluntarily provide it to us through the festival registration form.
            The information we collect may include your name, email address,
            phone number, date of birth, and financial information such as
            credit card number and expiration date, debit card information, and
            UPI ID.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Use of Information
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            We will use the information collected during the registration
            process to communicate with you about festival events and services,
            including but not limited to sending promotional emails,
            newsletters, and event updates. You will have the option to opt out
            of these communications at any time by contacting us using the email
            address or phone number provided on our website. We will not use
            your contact information for any other purpose without your explicit
            consent.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            We will delete all personally identifiable information collected
            during the registration process after 7 days of login unless we are
            required by law to retain it for a longer period. This includes all
            data provided by the user, such as name, email address, phone
            number, date of birth, and financial information.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Sharing of Information
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            We do not sell or rent your personal information to any third party.
            We may share your personal data with partners, vendors, or service
            providers only as necessary to provide the services you have
            requested or authorized, such as processing payments or providing
            technical support. We will only share the minimum amount of
            information necessary to perform these services, and we will require
            all third parties to maintain the confidentiality and security of
            your data. We may also disclose your information if required by law
            or to protect our rights or the rights of others.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Third-party services
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            We only allow third-party providers to collect, use, and disclose
            your information to the extent necessary for them to provide the
            services they offer. However, some providers may have their own
            privacy policies for purchase-related transactions, such as payment
            gateways and processors. It is recommended that you review their
            policies to understand how they handle your personal information.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            It is important to note that some providers may be located in a
            different jurisdiction than you or us. If you proceed with a
            transaction that involves a third-party service provider, your
            information may be subject to the laws of the jurisdiction(s) in
            which the provider or its facilities are located.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Please be aware that once you leave our website or are redirected to
            a third-party website or application, this Privacy Policy and our
            website's Terms of Service no longer apply.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Your Control Over Information
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            You have the right to access, correct, or delete your personal
            information at any time. You may also opt out of receiving future
            communications from us by contacting us through the email address or
            phone number provided on our website.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Cookies
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            We use cookies to maintain your session and to personalize your
            experience on our website. We do not use cookies to collect
            personally identifiable information or to track your activity on
            other websites.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Security Measures
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Our website is secured with SSL encryption, and we use
            industry-standard security measures to protect your personal
            information from unauthorized access, disclosure, or misuse. We
            encrypt sensitive information, such as your name and date of birth,
            during transmission and storage. We restrict access to your data
            only to employees who need it to perform their job duties.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Registrations
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            When you register for our festival competition, we collect your
            contact and financial information to process your payment and fulfil
            your registration. We use this information only for billing purposes
            and to communicate with you about your registration.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Eligibility Policy
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Registrations are strictly limited to students from engineering
            colleges. Non-engineering college registrations will not be
            permitted. In case of any falsified or inaccurate information
            provided during registration, Incridea'25 reserves the right to
            cancel the registration without issuing a refund.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Payment Processing and Security
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            We offer multiple modes of payment on our website, including debit
            card, UPI ID, and other digital payment options. All payment details
            provided by you are encrypted and processed securely through our
            payment gateway partner, Razorpay. As mentioned earlier, your card
            data is not stored on our or Razorpay's servers, and all purchase
            transaction data is only used to complete your purchase and will not
            be saved.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Our payment gateway follows the PCI-DSS standards set by the PCI
            Security Standards Council, which includes leading credit and debit
            card brands like Visa, Mastercard, American Express, and Discover,
            ensuring the secure handling of payment information by our store and
            its service providers.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            For more information on Razorpay's terms and conditions and their
            secure handling of payment information, please refer to their
            website at{" "}
            <a
              href="https://razorpay.com"
              target="_blank"
              rel="noreferrer"
              className="text-sky-300 underline underline-offset-2 hover:text-sky-200"
            >
              https://razorpay.com
            </a>
            .
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Links to Other Sites
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Our website may contain links to other sites that are not owned or
            operated by us. We are not responsible for the privacy practices or
            content of those sites, and we encourage you to review their privacy
            policies before providing any personal information.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-400 ">
            Changes to privacy policy
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            We reserve the right to modify this privacy policy at any time, and
            we encourage you to review it frequently. Any changes or
            clarifications will take effect immediately upon being posted on our
            website. Should we make significant changes to this policy, we will
            notify you through our website, providing information on the type of
            information we collect, how we use it, and the circumstances under
            which we may use or disclose it.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            We understand the importance of safeguarding your personal
            information, and we are committed to protecting it in accordance
            with applicable data protection laws and regulations. Our privacy
            policy upholds our commitment to protect and responsibly use
            personal information in compliance with data protection laws. We
            value your trust and remain dedicated to ensuring the highest
            standards of data protection and privacy.
          </p>
        </section>

        <section className="flex mt-12 flex-col gap-3 border-t border-slate-800/50 pt-10">
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-purple-400 ">
            For inquiries or clarifications on our privacy policy or personal
            data handling, you may reach us at{" "}
            <a
              href="mailto:incridea@nmamit.in"
              className="text-sky-300 underline underline-offset-2 hover:text-sky-200"
            >
              incridea@nmamit.in
            </a>{" "}
            or{" "}
            <a
              href="tel:8861337830"
              className="text-sky-300 underline underline-offset-2 hover:text-sky-200"
            >
              +91 88613 37830
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPage