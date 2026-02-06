import { NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  isLoading: boolean;
}

const Navbar = ({ isAuthenticated, onLogout, isLoading }: NavbarProps) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-14 pt-6 pb-2 md:pt-8 md:pb-4 flex justify-between items-center lg:grid lg:grid-cols-3 lg:items-start transition-all duration-300">
      {/* Background with Fade Mask */}
      <div
        className="absolute inset-0 z-[-1] bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-[2px] transition-all duration-300"
        style={{
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
        }}
      />
      {/* Logo */}
      <NavLink to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 lg:-mt-1 inline-flex items-center lg:-ml-3">
        <img src="/i.png" alt="Incridea" className="h-16 md:h-20 w-auto" />
      </NavLink>

      {/* Center Links */}
      <div className="hidden lg:flex justify-center items-center -ml-5 md:-ml-10 mt-12 lg:mt-5">
        <div className="hidden lg:flex gap-12">
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `font-moco text-xl md:text-3xl tracking-wide md:tracking-widest font-bold uppercase transition-colors duration-300 cursor-target ${isActive ? "text-purple-400" : "text-white hover:text-purple-300"
              }`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/pronite"
            className={({ isActive }) =>
              `font-moco text-xl md:text-3xl tracking-wide md:tracking-widest font-bold uppercase transition-colors duration-300 cursor-target ${isActive ? "text-purple-400" : "text-white hover:text-purple-300"
              }`
            }
          >
            Pronite
          </NavLink>
          <NavLink
            to="/merch"
            className={({ isActive }) =>
              `font-moco text-xl md:text-3xl tracking-wide md:tracking-widest font-bold uppercase transition-colors duration-300 cursor-target ${isActive ? "text-purple-400" : "text-white hover:text-purple-300"
              }`
            }
          >
            Merch
          </NavLink>
        </div>
      </div>

      {/* Right User Section */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto lg:ml-60 justify-end lg:mt-5">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={onLogout}
              className="
                hidden lg:block
                px-4 py-1.5 md:px-6 md:py-2 rounded-md
                bg-[#5b21b6] hover:bg-[#4c1d95]
                text-white font-moco font-bold tracking-wider text-sm md:text-sm
                uppercase
                transition-all duration-300
                skew-x-[-10deg]
                cursor-target
              "
              title="Logout"
            >
              <span className="block skew-x-10">Logout</span>
            </button>
          </div>
        ) : (
          !isLoading && (
            <NavLink
              to="/login"
              className="
                hidden lg:block
                px-4 py-1.5 md:px-6 md:py-2 rounded-md
                bg-[#5b21b6] hover:bg-[#4c1d95]
                text-white font-moco font-bold tracking-wider text-sm md:text-sm
                uppercase
                transition-all duration-300
                skew-x-[-10deg]
                cursor-target
                -mt-1
              "
            >
              <span className="block skew-x-10 whitespace-nowrap">Sign In</span>
            </NavLink>
          )
        )}
        <MobileMenu onLogout={onLogout} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default Navbar;
