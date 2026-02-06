
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap');
          
          .jersey-10-regular {
            font-family: "Jersey 10", sans-serif;
            font-weight: 400;
            font-style: normal;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(15px); }
            50% { transform: translateY(-15px); }
            75% { transform: translateY(10px); }
          }

          .floating-image {
            animation: none;
          }

          .floating-text {
            animation: none;
          }

          @media (min-width: 768px) {
            .floating-image {
              animation: float 6s ease-in-out infinite;
            }

            .floating-text {
              animation: float 8s ease-in-out infinite;
            }
          }

          /* Glitch Effect */
          .glitch { position: relative; }
          .glitch::before, .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            opacity: 0.8;
          }
          .glitch::before {
            color: #0ff;
            z-index: -1;
            animation: glitch-effect-1 3s infinite linear alternate-reverse;
          }
          .glitch::after {
            color: #f0f;
            z-index: -2;
            animation: glitch-effect-2 2s infinite linear alternate-reverse;
          }

          @keyframes glitch-effect-1 {
            0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px,0); }
            20% { clip-path: inset(60% 0 10% 0); transform: translate(2px,0); }
            40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px,0); }
            60% { clip-path: inset(80% 0 5% 0); transform: translate(2px,0); }
            80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px,0); }
            100% { clip-path: inset(30% 0 20% 0); transform: translate(2px,0); }
          }

          @keyframes glitch-effect-2 {
            0% { clip-path: inset(10% 0 60% 0); transform: translate(2px,0); }
            20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px,0); }
            40% { clip-path: inset(70% 0 10% 0); transform: translate(2px,0); }
            60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px,0); }
            80% { clip-path: inset(50% 0 30% 0); transform: translate(2px,0); }
            100% { clip-path: inset(0% 0 80% 0); transform: translate(-2px,0); }
          }
        `}
      </style>
      <section
        className="fixed inset-0 flex items-center justify-center w-full h-full overflow-auto"
        style={{
          backgroundImage: "url(/notfound/bg1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-12 px-6">
          <div className="shrink-0 floating-image flex justify-center items-center w-full md:w-auto">
            <img
              /* I have updated this back to your JPEG name. 
                 If this still fails, please rename your file to simply 'img.jpg' 
                 and update this line to '/notfound/img.jpg' */
              src="/notfound/image1.png"
              alt="404 Access Denied"
              className="w-full max-w-[280px] sm:max-w-sm md:max-w-md h-auto object-contain drop-shadow-2xl"
            />
          </div>

          <div className="text-center xl:text-left flex flex-col items-center justify-center xl:items-start floating-text">
            <h1
              className="text-7xl md:text-8xl font-bold mb-4 xl:mb-4 jersey-10-regular glitch"
              data-text="404 Not Found"
              style={{ color: "#ffffff", letterSpacing: "0.05em" }}
            >
              404 Not Found
            </h1>
            <p
              className="text-lg md:text-3xl mb-4 xl:mb-8 leading-relaxed max-w-md jersey-10-regular"
              style={{ color: "#ffffff" }}
            >
              Access denied: Ryouko sealed the rift,
              <br />
              the untold regions are too dangerous.
            </p>
            <Link
              to="/"
              className="cursor-target px-16 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-4xl transition jersey-10-regular text-xl"
            >
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
