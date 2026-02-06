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

const BASE_URL: string =
  (import.meta.env.VITE_BASE_URL as string | undefined) ??
  (typeof window !== "undefined" ? window.location.origin : "");

const REG_AMOUNT_IN_INR = {
  INTERNAL: 250,
  EXTERNAL: 350,
};

const championshipData = [
  {
    category: "Gold",
    color: "text-yellow-200",
    winner: 500,
    runnerUp: 450,
    secondRunnerUp: 400,
  },
  {
    category: "Silver",
    color: "text-gray-300",
    winner: 350,
    runnerUp: 300,
    secondRunnerUp: 250,
  },
  {
    category: "Bronze",
    color: "text-orange-400",
    winner: 200,
    runnerUp: 150,
    secondRunnerUp: 100,
  },
];

function GuidelinesPage() {
  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 sm:bg-fixed"
        style={{
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Main Container: Removed pb-safe/pt-safe to let page scroll naturally */}
      <div className="min-h-screen w-full px-3 sm:px-4 lg:px-8 py-8 text-slate-100 font-sans antialiased">
        <div
          /* Removed fixed height 'h-[calc...]' to allow card to grow with content */
          className="mx-auto w-full max-w-6xl flex flex-col relative"
          style={glassCardStyle}
        >
          {/* Removed internal 'overflow-y-auto' so it uses the page scroll */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            <header className="space-y-2 sm:space-y-4">
              <h1 className="text-center text-xl sm:text-2xl lg:text-3xl font-normal text-sky-200 leading-tight px-2">
                Guidelines and Regulations for Participating in Incridea 2026
              </h1>

              <p className="text-center text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-4xl mx-auto px-2">
                The fest is open to all students from engineering as well as
                Nitte sister institutions.
              </p>
            </header>

            <div className="text-slate-200 space-y-6 sm:space-y-8">
              <section>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-sky-100 mb-3">
                  Participant Registration, Entry, Identification and Access
                </h2>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-slate-300 leading-relaxed text-xs sm:text-sm lg:text-base">
                  <li>
                    Registration only through{" "}
                    <a
                      className="underline hover:text-sky-400 text-sky-300 transition-colors font-bold break-all"
                      href={BASE_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {BASE_URL}
                    </a>
                  </li>
                  <li>NMAMIT Students - ₹{REG_AMOUNT_IN_INR.INTERNAL}</li>
                  <li>External Colleges - ₹{REG_AMOUNT_IN_INR.EXTERNAL}</li>
                  <li>Valid PID + College ID + Government ID required</li>
                  <li>On-spot registration available for select events</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-sky-100 mb-3">
                  Event Rules
                </h2>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-slate-300 leading-relaxed text-xs sm:text-sm lg:text-base">
                  <li>Organisers can modify rules without prior notice</li>
                  <li>Institution not responsible for personal belongings</li>
                  <li>Event-specific rules on respective pages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-sky-100 mb-3">
                  Championship Points
                </h2>

                <div className="sm:hidden space-y-3 mb-4">
                  {championshipData.map((item) => (
                    <div
                      key={item.category}
                      className="rounded-lg border border-white/10 bg-white/5 p-3"
                    >
                      <div className={`font-bold mb-2 ${item.color} text-base`}>
                        {item.category}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                        <div>
                          <div className="text-emerald-300 font-bold mb-1">
                            Winner
                          </div>
                          <div className="text-white text-xs">
                            {item.winner}
                          </div>
                        </div>
                        <div>
                          <div className="text-sky-300 font-bold mb-1">
                            Runner-Up
                          </div>
                          <div className="text-white text-xs">
                            {item.runnerUp}
                          </div>
                        </div>
                        <div>
                          <div className="text-amber-300 font-bold mb-1">
                            2nd RU
                          </div>
                          <div className="text-white text-xs">
                            {item.secondRunnerUp}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden sm:block my-4 w-full overflow-hidden rounded-lg border border-white/10 bg-black/20">
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-xs lg:text-sm">
                      <thead className="border-b border-white/10 bg-white/5 uppercase text-slate-300 font-bold">
                        <tr>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3 text-emerald-300">Winner</th>
                          <th className="px-4 py-3 text-sky-300">Runner-Up</th>
                          <th className="px-4 py-3 text-amber-300">
                            2nd Runner-Up
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {championshipData.map((item) => (
                          <tr
                            key={item.category}
                            className="hover:bg-white/5 transition-colors"
                          >
                            <td className={`px-4 py-3 font-bold ${item.color}`}>
                              {item.category}
                            </td>
                            <td className="px-4 py-3">{item.winner}</td>
                            <td className="px-4 py-3">{item.runnerUp}</td>
                            <td className="px-4 py-3">{item.secondRunnerUp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-slate-300 leading-relaxed text-xs sm:text-sm lg:text-base mt-3">
                  <li>
                    Min. 3 technical + 2 non-technical finals required for
                    championship
                  </li>
                  <li>Points don't apply to special events</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-sky-100 mb-3">
                  Prohibited Conduct
                </h2>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-slate-300 leading-relaxed text-xs sm:text-sm lg:text-base">
                  <li>Alcohol, tobacco, drugs strictly prohibited</li>
                  <li>Entry denied if under influence</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-sky-100 mb-3">
                  Accommodation
                </h2>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-slate-300 leading-relaxed text-xs sm:text-sm lg:text-base">
                  <li>Book via website/form. First-come-first-serve.</li>
                  <li>
                    On-campus: Separate wings, gates close 30min after events,
                    reopen 6AM
                  </li>
                  <li>Off-campus: Details provided, transport available</li>
                </ul>
              </section>

              <section>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-sky-100 mb-3">
                  Campus Rules
                </h2>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-slate-300 leading-relaxed text-xs sm:text-sm lg:text-base">
                  <li>Follow all campus regulations</li>
                  <li>Contact organisers/security for assistance</li>
                </ul>
              </section>

              <section className="pt-4 border-t border-white/10">
                <p className="text-slate-300 leading-relaxed text-[10px] sm:text-xs lg:text-sm mb-3">
                  By participating, you agree to these guidelines. Violations
                  may result in expulsion, event cancellation, and penalties.
                  NMAMIT reserves legal rights.
                </p>
                <p className="text-slate-300 leading-relaxed text-[10px] sm:text-xs lg:text-sm">
                  For updates, visit our website and Instagram.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <svg className="absolute w-0 h-0" aria-hidden="true">
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
    </>
  );
}

export default GuidelinesPage;
