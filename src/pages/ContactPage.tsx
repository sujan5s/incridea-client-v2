import { MdCall, MdLocationOn, MdMail } from 'react-icons/md'
import { FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa'
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

function ContactPage() {
  return (
    <>
      <div className="min-h-screen text-white max-w-6xl relative">
        {/* Full Screen Background Image */}
        <div
          className="fixed inset-0 w-full h-full -z-10"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />

        {/* Dark Overlay to make text readable */}
        <div className="fixed inset-0 -z-10" />

        {/* Gradient Orbs - Reduced opacity */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 rounded-full bg-linear-to-br from-purple-500 to-pink-500 opacity-20 blur-3xl"></div>
          <div className="absolute top-40 right-20 w-72 h-72 md:w-112.5 md:h-112.5 rounded-full bg-linear-to-brrom-blue-500 to-cyan-400 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-56 h-56 md:w-80 md:h-80 rounded-full bg-linear-to-br from-purple-600 to-blue-600 opacity-15 blur-3xl"></div>
          <div className="absolute bottom-32 right-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-linear-to-br from-cyan-400 to-teal-400 opacity-20 blur-3xl"></div>
        </div>

        <div className="px-4 pb-16 pt-10 md:px-6 relative z-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            {/* Header */}
            <header className="space-y-3 text-center">
              {/* FIXED: Scaled down text sizes for Monitor vs Mobile */}
              <h1 className="text-3xl sm:text-5xl font-bold text-white md:text-4xl tracking-tight drop-shadow-lg">
                Contact Us
              </h1>
              <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-slate-100 drop-shadow-md">
                Any question or remarks? Just write us a message!
              </p>
            </header>

            {/* Main Contact Card */}
            <div style={glassCardStyle}>
              <div className="grid gap-6 md:grid-cols-5">
                {/* Left Side - Contact Information */}
                <div className="md:col-span-2 space-y-8 p-4 md:p-6 relative">
                  <div>
                    {/* FIXED: Heading size hierarchy */}
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
                      Contact Information
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm lg:text-base">
                      Any queries should be directed to the student organisers
                      and college staff.
                    </p>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <MdMail className="text-xl text-white mt-1 shrink-0" />
                    <div>
                      <p className="text-slate-300 text-[10px] sm:text-xs mb-1 uppercase font-bold tracking-wider">
                        Email
                      </p>
                      <a
                        href="mailto:incridea@nmamit.in"
                        className="text-white text-xs sm:text-sm lg:text-base hover:text-sky-300 transition-colors break-all"
                      >
                        incridea@nmamit.in
                      </a>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-start gap-3">
                    <MdCall className="text-xl text-white mt-1 shrink-0" />
                    <div className="space-y-2">
                      <p className="text-slate-300 text-[10px] sm:text-xs mb-1 uppercase font-bold tracking-wider">
                        Phone Numbers
                      </p>
                      <div className="space-y-1 text-xs sm:text-sm lg:text-base">
                        <p className="text-white">
                          General:{" "}
                          <a
                            className="hover:text-sky-300 transition-colors font-semibold"
                            href="tel:9449530107"
                          >
                            +91 94495 30107
                          </a>
                        </p>
                        <p className="text-white">
                          <a
                            className="hover:text-sky-300 transition-colors font-semibold"
                            href="tel:9513295282"
                          >
                            +91 95132 95282
                          </a>
                        </p>
                        <p className="text-white mt-2">
                          Technical:{" "}
                          <a
                            className="hover:text-sky-300 transition-colors font-semibold"
                            href="tel:9448846524"
                          >
                            +91 94488 46524
                          </a>
                        </p>
                        <p className="text-white">
                          <a
                            className="hover:text-sky-300 transition-colors font-semibold"
                            href="tel:9686356123"
                          >
                            +91 96863 56123
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MdLocationOn className="text-xl text-white mt-1 shrink-0" />
                    <div>
                      <p className="text-slate-300 text-[10px] sm:text-xs mb-1 uppercase font-bold tracking-wider">
                        Address
                      </p>
                      <div className="text-white text-xs sm:text-sm lg:text-base space-y-1">
                        <p>NMAM Institute of Technology,</p>
                        <p>Nitte, Karkala Taluk, Udupi,</p>
                        <p>Karnataka, India - 574110</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media - Glassy Icons */}
                  <div className="flex gap-4 pt-4">
                    <a
                      href="https://youtube.com/@incrideanmamit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 bg-white/10 hover:bg-red-500/30 transition-all duration-300 hover:scale-110 overflow-hidden group relative"
                    >
                      <FaYoutube className="text-white text-lg relative z-10" />
                      <div className="absolute inset-0 bg-linear-to-br from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 bg-linear-to-br from-white/10 to-white/5 hover:from-pink-400/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-110 overflow-hidden group relative"
                    >
                      <FaInstagram className="text-white text-lg relative z-10" />
                      <div className="absolute inset-0 bg-linear-to-br from-pink-400/20 via-purple-500/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>

                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 bg-white/10 hover:bg-blue-400/30 transition-all duration-300 hover:scale-110 overflow-hidden group relative"
                    >
                      <FaLinkedin className="text-white text-lg relative z-10" />
                      <div className="absolute inset-0 bg-linear-to-br from-blue-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>

                {/* Right Side - Additional Info & Map */}
                <div className="md:col-span-3 space-y-6 p-4 md:p-6">
                  {/* University Info */}
                  <div className="rounded-2xl border border-slate-700/50 bg-slate-900/30 p-4 md:p-6 backdrop-blur-sm">
                    <h3 className="text-sm sm:text-base font-semibold mb-3 text-white uppercase tracking-wider">
                      University Information
                    </h3>
                    <div className="text-slate-300 text-xs sm:text-sm space-y-1">
                      <p>A unit of Nitte (Deemed to be University)</p>
                      <p>Nitte Education Trust</p>
                      <p>6th Floor, University Enclave,</p>
                      <p>Medical Sciences Complex,</p>
                      <p>Deralakatte, Mangaluru - 575018</p>
                      <p>Karnataka, India</p>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                    <div className="aspect-video w-full">
                      <iframe
                        title="NMAMIT Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.6730538655893!2d74.92911808195412!3d13.183002554024787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb56415ad85e5b%3A0x10b77ac6f6afc7fa!2sNitte%20Mahalinga%20Adyantaya%20Memorial%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1738765768735!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale-[0.3] contrast-[1.1]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SVG Filter for Displacement Effect */}
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
}

export default ContactPage;
