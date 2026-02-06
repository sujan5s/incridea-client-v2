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

const RulesPage = () => {
  return (
    <>
      {/* Container matches Guidelines/Privacy width scaling */}
      <div className="min-h-screen text-white relative max-w-6xl mx-auto px-4 pb-16 pt-10 md:px-6">
        <div
          className="fixed inset-0 w-full h-full -z-10"
          style={{

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="fixed inset-0 -z-10" />

        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-3xl"></div>
          <div className="absolute top-40 right-20 w-72 h-72 md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-15 blur-3xl"></div>
          <div className="absolute bottom-32 right-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 opacity-20 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            <div style={glassCardStyle} className="p-6 md:p-10">
              <div className="mb-8">
                <h1 className="text-xl sm:text-2xl lg:text-3xl tracking-wider font-life-craft text-white drop-shadow-[0_0_15px_rgba(216,180,254,0.3)] font-bold">
                  Terms and Conditions
                </h1>
                <p className="mt-1 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-purple-300/60">
                  Guidelines & Regulations
                </p>
              </div>

              <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-purple-200/20 to-transparent" />

              {/* Main content container with standardized typography */}
              <div className="flex flex-col gap-8 text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Overview
                  </h2>
                  <p>
                    This website is operated by NMAM Institute of Technology.
                    Throughout the site, the terms "we", "us" and "our" refer to
                    NMAM Institute of Technology. NMAM Institute of Technology
                    offers this website, including all information, tools, and
                    services available from this site to you, the user,
                    conditioned upon your acceptance of all terms, conditions,
                    policies, and notices stated here.
                  </p>
                  <p>
                    By visiting our site and/or participating in our college
                    fest Incridea 2026, you engage in our "Service" and agree to
                    be bound by the following terms and conditions ("Terms of
                    Service", "Terms"), including those additional terms and
                    conditions and policies referenced herein and/or available
                    by hyperlink. These Terms of Service apply to all users of
                    the site, including, without limitation, students, college
                    staff, and all other participants who browse the page.
                  </p>
                  <p>
                    Please read these Terms of Service carefully before
                    accessing or participating in Incridea 2026. By accessing or
                    participating in any part of the event, you agree to be
                    bound by these Terms of Service. If you do not agree to all
                    the terms and conditions of this agreement, then you may not
                    participate in the event. If these Terms of Service are
                    considered an offer, acceptance is expressly limited to
                    these Terms of Service.
                  </p>
                  <p>
                    Any new features or tools which are added to the event shall
                    also be subject to the Terms of Service. You can review the
                    most current version of the Terms of Service at any time on
                    this page. We reserve the right to update, change or replace
                    any part of these Terms of Service by posting updates and/or
                    changes to our website or by notifying you via email. It is
                    your responsibility to check your email and our website
                    periodically for changes. Your continued participation in
                    the event following the posting of any changes or after
                    being notified of such changes via email constitutes
                    acceptance of those changes.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 1 - Incridea 2026 Participation Terms
                  </h2>
                  <p>
                    You may not use our event platform for any illegal or
                    authorized purpose nor may you, in the use of the Service,
                    graduate any laws in your jurisdiction (including but not
                    limited to copyright laws).
                  </p>
                  <p>
                    You must not engage in any behaviour that is harmful or
                    disruptive to the event or its participants, including but
                    not limited to transmitting any worms or viruses or any code
                    of a destructive nature.
                  </p>
                  <p>
                    A breach or violation of any of the Terms will result in
                    immediate disqualification from the event and may lead to
                    further consequences as deemed necessary by NMAM Institute
                    of Technology.
                  </p>
                  <p>
                    Participation is strictly limited to students from
                    engineering colleges and Nitte Sister Institutes. Any
                    registration found to be fraudulent or from a
                    non-engineering institution will be deemed invalid, and NMAM
                    Institute of Technology reserves the right to deny refunds
                    in such cases.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 2 - General Conditions for Incridea 2026 Participation
                  </h2>
                  <p>
                    We reserve the right to refuse participation to anyone for
                    any reason at any time, including but not limited to those
                    who violate the terms and conditions stated in Section 1.
                  </p>
                  <p>
                    You understand that any content you provide on our event
                    platform, including but not limited to text, images, and
                    videos, may be publicly visible to other participants and
                    may be used by NMAM Institute of Technology for promotional
                    purposes.
                  </p>
                  <p>
                    You agree not to reproduce, duplicate, copy, sell, resell,
                    or exploit any portion of the event or its contents, use of
                    the event, or access to the event or any contact information
                    of other participants without express written permission by
                    us or the respective participant.
                  </p>
                  <p>
                    The headings used in this agreement are included for
                    convenience only and will not limit or otherwise affect
                    these Terms.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 3 - Accuracy, Completeness and Timeliness of Information
                  </h2>
                  <p>
                    We strive to ensure that all information provided on the
                    Incridea 2026 event platform is accurate, complete, and
                    timely. However, we cannot guarantee the accuracy,
                    completeness, or timeliness of all information provided.
                  </p>
                  <p>
                    The content and material provided on the event platform are
                    for general information purposes only and should not be
                    relied upon or used as the sole basis for making decisions
                    without consulting primary, more accurate, more complete, or
                    more timely sources of information. Any reliance on the
                    material on this platform is at your own risk.
                  </p>
                  <p>
                    This platform may contain certain historical information.
                    Historical information, necessarily, is not current and is
                    provided for your reference only. We reserve the right to
                    modify the contents of this platform at any time, but we
                    have no obligation to update any information on the
                    platform. You agree that it is your responsibility to
                    monitor changes to the platform.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 4 - Modifications to Incridea 2026 and Registration Prices
                  </h2>
                  <p>
                    Prices for registration and events at Incridea 2026 are
                    subject to change without notice.
                  </p>
                  <p>
                    We reserve the right at any time to modify or discontinue
                    any aspect of Incridea 2026 (or any part or content thereof)
                    without notice at any time.
                  </p>
                  <p>
                    NMAM Institute of Technology student organisers and college
                    staff shall not be liable to you or to any third-party for
                    any modification, price change, suspension, or
                    discontinuance of Incridea 2026.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 5 - Events and Services at Incridea 2026
                  </h2>
                  <p>
                    Certain events and services may be available exclusively
                    through the Incridea 2026 website. These events and services
                    may have limited capacities and are subject to availability.
                  </p>
                  <p>
                    We have made every effort to display as accurately as
                    possible the details and images of our events and services
                    that appear on the website. We cannot guarantee that your
                    computer or mobile device display of any details or images
                    will be accurate.
                  </p>
                  <p>
                    NMAM Institute of Technology student organisers, college
                    staff, and the principal reserve the right, but are not
                    obligated, to limit the attendance or participation of any
                    person, from any geographic region or jurisdiction. We may
                    exercise this right on a case-by-case basis. We reserve the
                    right to limit the quantities of any events or services that
                    we offer. All descriptions of events or services or their
                    pricing are subject to change at any time without notice. We
                    reserve the right to discontinue any event or service at any
                    time.
                  </p>
                  <p>
                    We do not warrant that the quality of any events, services,
                    information, or other material obtained by you at Incridea
                    2026 will meet your expectations, or that any errors in the
                    Service will be corrected.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 6 - Accuracy of Registration and Account Information
                  </h2>
                  <p>
                    We reserve the right to refuse attendance or participation
                    in any event or service organized by Incridea 2026 to any
                    person who has provided inaccurate, incomplete, or outdated
                    registration or account information.
                  </p>
                  <p>
                    We reserve the right, in our sole discretion, to limit or
                    cancel the attendance or participation of any person, from
                    any geographic region or jurisdiction, and to limit or
                    prohibit attendance or participation that, in our judgment,
                    appear to be made by individuals who violate our policies or
                    abuse the registration or account process.
                  </p>
                  <p>
                    You agree to provide current, complete, and accurate
                    registration and account information for all events and
                    services organized by Incridea 2026. You agree to promptly
                    update your account and other information, including your
                    email address and payment information, so that we can
                    complete your transactions and contact you as needed.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 7 - Optional Tools
                  </h2>
                  <p>
                    Incridea 2026 may provide you with access to third-party
                    tools over which we have no control or input.
                  </p>
                  <p>
                    You acknowledge and agree that Incridea 2026 provides access
                    to such tools "as is" and "as available" without any
                    warranties, representations, or conditions of any kind and
                    without any endorsement. We shall have no liability
                    whatsoever arising from or relating to your use of optional
                    third-party tools.
                  </p>
                  <p>
                    Any use by you of optional tools offered through Incridea
                    2026 is entirely at your own risk and discretion, and you
                    should ensure that you are familiar with and approve of the
                    terms on which tools are provided by the relevant
                    third-party provider(s).
                  </p>
                  <p>
                    Incridea 2026 may also offer new services and/or features
                    through the event (including the release of new tools and
                    resources). Such new features and/or services shall also be
                    subject to these Terms and Conditions.
                  </p>
                  <p>For more detail, please review our Privacy Policy.</p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 8 - Third-party Links
                  </h2>
                  <p>
                    Certain content, products, and services available via
                    Incridea 2026 may include materials from third parties.
                  </p>
                  <p>
                    Third-party links on the Incridea 2026 website may direct
                    you to third-party websites that are not affiliated with the
                    college staff. We are not responsible for examining or
                    evaluating the content or accuracy, and we do not warrant
                    and will not have any liability or responsibility for any
                    third-party materials or websites, or for any other
                    materials, products, or services of third parties.
                  </p>
                  <p>
                    We are not liable for any harm or damages related to the
                    purchase or use of goods, services, resources, content, or
                    any other transactions made in connection with any
                    third-party websites. Please review carefully the
                    third-party's policies and practices and make sure you
                    understand them before you engage in any transaction.
                    Complaints, claims, concerns, or questions regarding
                    third-party products should be directed to the third-party.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 9 - User Comments, Feedback, and Other Submissions
                  </h2>
                  <p>
                    If, at our request, you send certain specific submissions
                    related to Incridea 2026 (for example, contest entries), or
                    without a request from us, you send creative ideas,
                    suggestions, proposals, plans, or other materials, whether
                    online, by email, by postal mail, or otherwise
                    (collectively, "comments"), you agree that we may, at any
                    time, without restriction, edit, copy, publish, distribute,
                    translate and otherwise use in any medium any comments that
                    you forward to us. We are and shall be under no obligation
                    (1) to maintain any comments in confidence; (2) to pay
                    compensation for any comments; or (3) to respond to any
                    comments.
                  </p>
                  <p>
                    We may, but have no obligation to, monitor, edit, or remove
                    content related to Incridea 2026 that we determine in our
                    sole discretion are unlawful, offensive, threatening,
                    libellous, defamatory, pornographic, obscene, or otherwise
                    objectionable or violates any party's intellectual property
                    or these Terms of Service.
                  </p>
                  <p>
                    You agree that your comments related to Incridea 2026 will
                    not violate any right of any third-party, including
                    copyright, trademark, privacy, personality, or other
                    personal or proprietary right. You further agree that your
                    comments will not contain libellous or otherwise unlawful,
                    abusive, or obscene material or contain any computer virus
                    or other malware that could in any way affect the operation
                    of the Service or any related website. You may not use a
                    false e-mail address, pretend to be someone other than
                    yourself, or otherwise mislead us or third parties as to the
                    origin of any comments. You are solely responsible for any
                    comments you make and their accuracy. We take no
                    responsibility and assume no liability for any comments
                    posted by you or any third-party.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 10 - Personal Information
                  </h2>
                  <p>
                    Your submission of personal information through the Incridea
                    2026 website is governed by our Privacy Policy. Please
                    carefully review our Privacy Policy before submitting any
                    personal information.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 11 - Errors, Inaccuracies and Omissions
                  </h2>
                  <p>
                    Occasionally there may be information on the Incridea 2026
                    website or in the Service that contains typographical
                    errors, inaccuracies or omissions that may relate to event
                    details, schedules, locations, pricing, promotions, offers,
                    or any other related information. We reserve the right to
                    correct any errors, inaccuracies, or omissions, and to
                    change or update information without prior notice.
                  </p>
                  <p>
                    We undertake no obligation to update, amend or clarify
                    information in the Service or on any related website, except
                    as required by law. No specified update or refresh date
                    applied in the Service or on any related website should be
                    taken to indicate that all information in the Service or on
                    any related website has been modified or updated.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 12 - Prohibited Uses
                  </h2>
                  <p>
                    In addition to other prohibitions as set forth in these
                    terms and conditions, all participants of Incridea 2026 are
                    prohibited from using the event or its content: (a) for any
                    unlawful purpose; (b) to solicit others to perform or
                    participate in any unlawful acts; (c) to violate any
                    international, federal, provincial or state regulations,
                    rules, laws, or local ordinances; (d) to infringe upon or
                    violate the intellectual property rights of the student
                    organisers, college staff, or any other participants; (e) to
                    harass, abuse, insult, harm, defame, slander, disparage,
                    intimidate, or discriminate based on gender, sexual
                    orientation, religion, ethnicity, race, age, national
                    origin, or disability; (f) to submit false or misleading
                    information; (g) to upload or transmit viruses or any other
                    type of malicious code that will or may be used in any way
                    that will affect the functionality or operation of the event
                    or of any related website, other websites, or the Internet;
                    (h) to collect or track the personal information of others;
                    (i) to spam, phish, pharm, pretext, spider, crawl, or
                    scrape; (j) for any obscene or immoral purpose; or (k) to
                    interfere with or circumvent the security features of the
                    event or any related website, other websites, or the
                    Internet. We reserve the right to take appropriate action,
                    including removal from the event, legal action, or
                    termination of access to any related website, for violating
                    any of the prohibited uses.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 13 - Disclaimer of Warranties; Limitation of Liability
                  </h2>
                  <p>
                    We do not guarantee, represent, or warrant that your use of
                    our service will be uninterrupted, timely, secure, or
                    error-free.
                  </p>
                  <p>
                    We do not warrant that the results that may be obtained from
                    the use of the event will be accurate or reliable.
                  </p>
                  <p>
                    You agree that from time to time we may need to remove the
                    event for indefinite periods of time or cancel the event at
                    any time, without notice to you.
                  </p>
                  <p>
                    You expressly agree that your use of, or inability to use,
                    the event is at your sole risk. The event and all products
                    and services delivered to you through the event are (except
                    as expressly stated by us) provided "as is" and "as
                    available" for your use, without any representation,
                    warranties or conditions of any kind, either express or
                    implied, including all implied warranties or conditions of
                    merchantability, merchantable quality, fitness for a
                    particular purpose, durability, title, and non-infringement.
                  </p>
                  <p>
                    In no case shall NMAM Institute of Technology, its
                    directors, officers, employees, affiliates, agents,
                    contractors, interns, suppliers, service providers, or
                    licensors be liable for any injury, loss, claim, or any
                    direct, indirect, incidental, punitive, special, or
                    consequential damages of any kind, including, without
                    limitation, lost profits, lost revenue, lost savings, loss
                    of data, replacement costs, or any similar damages, whether
                    based in contract, tort (including negligence), strict
                    liability or otherwise, arising from your use of any of the
                    event or any products or services procured using the event,
                    or for any other claim related in any way to your use of the
                    event or any product or service, including, but not limited
                    to, any errors or omissions in any content or any loss or
                    damage of any kind incurred as a result of the use of the
                    event or any content posted, transmitted, or otherwise made
                    available via the event, even if advised of their
                    possibility. Because some jurisdictions do not allow the
                    exclusion or limitation of liability for consequential or
                    incidental damages, in such jurisdictions, our liability
                    shall be limited to the maximum extent permitted by law.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 14 - Indemnification
                  </h2>
                  <p>
                    You agree to indemnify, defend and hold harmless NMAM
                    Institute of Technology and its organisers, staff, partners,
                    officers, directors, agents, contractors, licensors, service
                    providers, subcontractors, suppliers, interns, and
                    employees, harmless from any claim or demand, including
                    reasonable attorneys' fees, made by any third-party due to
                    or arising out of your breach of these Terms of Service or
                    the documents they incorporate by reference, or your
                    violation of any law or the rights of a third-party.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 15 - Severability
                  </h2>
                  <p>
                    In the event that any provision of these Terms of Service is
                    determined to be unlawful, void or unenforceable, such
                    provision shall nonetheless be enforceable to the fullest
                    extent permitted by applicable law, and the unenforceable
                    portion shall be deemed to be severed from these Terms of
                    Service. Such determination shall not affect the validity
                    and enforceability of any other remaining provisions.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 16 - Termination
                  </h2>
                  <p>
                    The obligations and liabilities of the parties incurred
                    prior to the termination date shall survive the termination
                    of this agreement for all purposes.
                  </p>
                  <p>
                    These Terms of Service are effective unless and until
                    terminated by either party. We may terminate these Terms of
                    Service at any time by notifying you that we no longer wish
                    to provide the event. If we suspect that you have failed to
                    compliance with any term or provision of these Terms of Service,
                    we may terminate this agreement at any time without notice,
                    and you will remain liable for all amounts due up to and
                    including the date of termination.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 17 - Entire Agreement
                  </h2>
                  <p>
                    The failure of us to exercise or enforce any right or
                    provision of these Terms of Service shall not constitute a
                    waiver of such right or provision.
                  </p>
                  <p>
                    These Terms of Service and any policies or operating rules
                    posted by us constitute the entire agreement and
                    understanding between you and us and govern your use of the
                    event, superseding any prior agreements, communications, and
                    proposals, whether oral or written, between you and us
                    (including, but not limited to, any prior versions of the
                    Terms of Service).
                  </p>
                  <p>
                    Any ambiguities in the interpretation of these Terms of
                    Service shall not be construed against the drafting party.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 18 - Governing Law
                  </h2>
                  <p>
                    These Terms of Service and any separate agreements whereby
                    we provide the event shall be governed by and construed in
                    accordance with the laws of India and the jurisdiction of
                    Karkala, Karnataka.
                  </p>
                </section>

                <section className="flex flex-col gap-3">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 19 - Changes to Terms of Service
                  </h2>
                  <p>
                    We may modify, update, or replace any part of these Terms of
                    Service at our sole discretion by posting updates and
                    changes on the website. The most current version of the
                    Terms of Service can be reviewed at any time on the website.
                  </p>
                  <p>
                    It is your responsibility to check the website periodically
                    for any changes to the Terms of Service. The continued use
                    of or access to the website or the services provided
                    following the posting of any changes to these Terms of
                    Service constitutes acceptance of those changes.
                  </p>
                </section>

                <section className="flex flex-col gap-3 border-t border-purple-200/20 pt-10">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-purple-300">
                    Section 20 - Contact Information
                  </h2>
                  <p>
                    Any questions about the Terms of Service should be directed
                    to the student organisers and college staff at:
                  </p>
                  <p className="font-moco">
                    Email:
                    <a
                      href="mailto:incridea@nmamit.in"
                      className="text-sky-300 underline underline-offset-2 hover:text-sky-200"
                    >
                      {" "}
                      incridea@nmamit.in
                    </a>
                  </p>
                  <p className="font-moco">Phone: +91 88613 37830</p>
                </section>
              </div>
            </div>
          </div>
        </div>

        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="displacementFilter">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.01"
                numOctaves="2"
                result="turbulence"
              />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default RulesPage;