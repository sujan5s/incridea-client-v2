import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-100 md:flex-row md:flex-wrap md:justify-center md:gap-4">
                <Link className="transition-colors duration-200 hover:text-slate-200 cursor-target" to="/privacy">
                    Privacy Policy
                </Link>
                <span className="hidden text-white md:inline">|</span>
                <Link className="transition-colors duration-200 hover:text-slate-200 cursor-target" to="/rules">
                    Terms & Conditions
                </Link>
                <span className="hidden text-white md:inline">|</span>
                <Link className="transition-colors duration-200 hover:text-slate-200 cursor-target" to="/guidelines">
                    Guidelines
                </Link>
                <span className="hidden text-white md:inline">|</span>
                <Link className="transition-colors duration-200 hover:text-slate-200 cursor-target" to="/refund">
                    Refund Policy
                </Link>
                <span className="hidden text-white md:inline">|</span>
                <Link className="transition-colors duration-200 hover:text-slate-200 cursor-target" to="/contact">
                    Contact Us
                </Link>
            </div>
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-4 pb-5 text-[11px] font-semibold tracking-wide text-slate-200">
                <Link className="inline-flex items-center gap-1 transition-all hover:tracking-wider hover:text-slate-100 cursor-target" to="/techteam">
                    Made with <span className="text-rose-400">❤</span> by Technical Team
                </Link>
                <p className='cursor-target'>© Incridea {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};

export default Footer;
