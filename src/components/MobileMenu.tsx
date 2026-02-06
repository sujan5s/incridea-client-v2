import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, Home, Calendar, Image, Info, Phone, Music, User, Package } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface MobileMenuProps {
    onLogout: () => void;
    isAuthenticated: boolean;
}

const MobileMenu = ({ onLogout, isAuthenticated }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const links = [
        { icon: Home, path: "/", label: "Home" },
        { icon: Calendar, path: "/events", label: "Events" },
        { icon: Music, path: "/pronite", label: "Pronite" },
        { icon: Package, path: "/merch", label: "Merch" },
        { icon: Image, path: "/gallery", label: "Gallery" },
        { icon: User, path: "/profile", label: "Profile" },
        { icon: Info, path: "/about", label: "About" },
        { icon: Phone, path: "/contact", label: "Contact" },
    ].filter(link => isAuthenticated || link.label !== "Profile");

    // Animation Variants
    const drawerVariants: Variants = {
        initial: { x: "100%" },
        animate: {
            x: 0,
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 300
            }
        },
        exit: {
            x: "100%",
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 300,
                when: "afterChildren"
            }
        }
    };

    const contentVariants: Variants = {
        initial: { opacity: 1 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.02
            }
        },
        exit: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
                staggerDirection: -1 // Reverse order (bottom to top)
            }
        }
    };

    const itemVariants: Variants = {
        initial: { opacity: 0, x: 50 },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            x: 50,
            transition: {
                duration: 0.05,
                ease: "easeIn"
            }
        }
    };

    return (
        <div className="lg:hidden mr-3">
            {/* Toggle Button */}
            {/* Toggle Button */}
            {/* Dimensional Rift Button */}
            {/* Shattered Dimension Button */}
            {/* Dimensional Flux Button */}
            <button
                onClick={toggleMenu}
                className="group relative z-50 p-2 md:p-3 rounded-xl text-white hover:opacity-80 transition-all overflow-hidden"
                aria-label="Toggle Menu"
            >
                <div className="relative w-8 h-6 flex flex-col justify-between items-center transform group-hover:scale-110 transition-transform duration-300">
                    {/* Top Bar */}
                    <motion.span
                        animate={isOpen ? { rotate: 45, y: 11, backgroundPosition: ["0% 50%", "100% 50%"] } : { rotate: 0, y: 0, backgroundPosition: ["0% 50%", "100% 50%"] }}
                        transition={{
                            backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                            default: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                        style={{ backgroundSize: "200% auto" }}
                        className="w-full h-0.5 rounded-full bg-gradient-to-r from-cyan-300 via-purple-500 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    />

                    {/* Middle Bar */}
                    <motion.span
                        animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0, backgroundPosition: ["100% 50%", "0% 50%"] }}
                        transition={{
                            backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                            default: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                        style={{ backgroundSize: "200% auto" }}
                        className="w-2/3 h-0.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-[0_0_8px_rgba(192,132,252,0.8)] group-hover:w-full transition-all duration-300"
                    />

                    {/* Bottom Bar */}
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: -11, backgroundPosition: ["0% 50%", "100% 50%"] } : { rotate: 0, y: 0, backgroundPosition: ["0% 50%", "100% 50%"] }}
                        transition={{
                            backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                            default: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                        style={{ backgroundSize: "200% auto" }}
                        className="w-full h-0.5 rounded-full bg-gradient-to-r from-cyan-300 via-purple-500 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    />

                    {/* Chromatic Aberration Ghosts (Hover Effect) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none mix-blend-screen">
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 blur-sm transform -translate-x-1 skew-x-12" />
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 blur-sm transform translate-x-1 -skew-x-12" />
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/10 z-40"
                            onClick={toggleMenu}
                        />

                        {/* Drawer content wrapped in GlassSurface */}
                        <motion.div
                            key="drawer"
                            variants={drawerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="fixed inset-0 z-50 flex h-dvh"
                        >
                            <div className="w-full h-full bg-black/40 backdrop-blur-sm">
                                <motion.div
                                    variants={contentVariants}
                                    className="flex flex-col w-full h-full pt-4 pb-24 px-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
                                >
                                    {/* Header: Back Arrow */}
                                    <motion.div className="flex justify-start mb-4 relative">
                                        <svg width="0" height="0" className="absolute">
                                            <linearGradient id="back-arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#67e8f9" /> {/* cyan-300 */}
                                                <stop offset="50%" stopColor="#a855f7" /> {/* purple-500 */}
                                                <stop offset="100%" stopColor="#67e8f9" /> {/* cyan-300 */}
                                            </linearGradient>
                                        </svg>
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            aria-label="Close Menu"
                                            className="p-2 pl-2 mt-2 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <ChevronLeft size={32} style={{ stroke: "url(#back-arrow-gradient)" }} />
                                        </button>
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-white mb-6 md:mb-10 pb-4 tracking-tight text-center w-full">Menu</motion.h1>

                                    {/* Main Navigation */}
                                    <div className="flex flex-col gap-4 md:gap-10 w-full flex-grow items-center">
                                        {links.map(({ path, label }) => (
                                            <motion.div
                                                key={path}
                                                variants={itemVariants}
                                                className="w-full flex justify-center"
                                            >
                                                <NavLink
                                                    to={path}
                                                    onClick={toggleMenu}
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-4 text-2xl sm:text-3xl md:text-4xl font-medium transition-colors ${isActive ? "text-purple-300" : "text-white/80 hover:text-white"
                                                        }`
                                                    }
                                                >
                                                    {label}
                                                </NavLink>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Auth Buttons (Moved above footer line) */}
                                    <div className="flex flex-col items-center w-full mt-16 mb-4 pt-4">
                                        {isAuthenticated ? (
                                            <motion.button
                                                variants={itemVariants}
                                                onClick={() => {
                                                    onLogout();
                                                    toggleMenu();
                                                }}
                                                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center gap-3 hover:opacity-70 transition-opacity"
                                            >
                                                Logout
                                            </motion.button>
                                        ) : (
                                            <motion.div variants={itemVariants}>
                                                <NavLink
                                                    to="/login"
                                                    onClick={toggleMenu}
                                                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center gap-3 hover:opacity-70 transition-opacity"
                                                >
                                                    Sign In
                                                </NavLink>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Footer Links (Privacy, etc) */}
                                    <div className="flex flex-col gap-3 md:gap-6 pt-4 items-center w-full">
                                        {[
                                            { path: "/privacy", label: "Privacy Policy" },
                                            { path: "/rules", label: "Terms & Conditions" },
                                            { path: "/guidelines", label: "Guidelines" },
                                            { path: "/refund", label: "Refund Policy" },
                                        ].map(({ path, label }) => (
                                            <motion.div key={path} variants={itemVariants}>
                                                <NavLink
                                                    to={path}
                                                    onClick={toggleMenu}
                                                    className="text-base md:text-lg font-medium text-white/60 hover:text-white transition-colors"
                                                >
                                                    {label}
                                                </NavLink>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileMenu;
