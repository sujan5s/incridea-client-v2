import { useState, Suspense } from "react";
import { motion } from "framer-motion"; // Removed unused useScroll, useTransform
import MerchBuyModal from "../components/merch/MerchBuyModal";
import TShirt3DModel from "../components/merch/TShirt3DModel";
import { Rotate3d } from "lucide-react";
import LightRays from "@/components/LightRays";

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

// Inline CSS for custom animations
const styles = `
  @keyframes shimmer {
    0% { transform: translateX(-150%); }
    100% { transform: translateX(200%); }
  }
  @keyframes scan {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }
  .animate-shimmer {
    animation: shimmer 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-scan {
    animation: scan 4s linear infinite;
  }
`;

const Merch = () => {
  const [showModal, setShowModal] = useState(false);
  const defaultSize = "M";

  const tshirtItem = {
    id: "tshirt",
    name: "Incridea T-Shirt",
    edition: "MK-IV EDITION",
    price: 499,
    description:
      "Premium quality Incridea event t-shirt. Made with comfortable cotton blend fabric. Perfect memorabilia from your event experience.",
    details: [
      { text: "100% Premium Cotton Blend" },
      { text: "Comfortable fit and durable" },
      { text: "Available in 6 sizes (XS - XXL)" },
      { text: "Vibrant Incridea branding" },
    ],
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleBuyClick = () => {
    setShowModal(true);
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-purple-500/30 overflow-x-hidden">
      <style>{styles}</style>

      {/* Background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat transform scale-105"
      >
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50" />
      </div>

      {/* Container with responsive padding - Centered Vertically & Horizontally */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-[1350px] mx-auto min-h-screen flex flex-col justify-center items-center">

        {/* UNIFIED CARD */}
        <motion.div
          className="relative z-10 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div style={glassCardStyle} className="p-0 overflow-hidden relative w-full">

            {/* Responsive Grid - With Creative Separator */}
            <div className="grid grid-cols-1 xl:grid-cols-2 relative z-10 w-full">
              {/* Central Divider */}
              <div className="hidden xl:block absolute left-1/2 top-0 bottom-0 w-px -ml-px bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent z-20" />
              <div className="xl:hidden absolute left-0 right-0 top-[50%] h-px -mt-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent z-20" />

              <div className="px-5 pb-5 pt-0 sm:px-8 sm:pb-8 sm:pt-2 xl:p-10 flex flex-col h-full justify-center relative order-first">

                {/* Light Rays & Line Effect - Positioned Top */}
                <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none z-10 overflow-hidden">
                  {/* The Glowing Line - Thin Scanner Beam with Divider Style */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] h-px bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_40px_rgba(255,255,255,1)] z-30" />

                  {/* The Rays Component */}
                  <div className="absolute top-4 left-0 right-0 bottom-0 mix-blend-screen brightness-[2.5] md:brightness-150 contrast-125">
                    <LightRays
                      raysOrigin="top-center"
                      raysSpeed={0.8}
                      lightSpread={0.5}
                      rayLength={1.5}
                      raysColor="#ffffff"
                      followMouse={false}
                    />
                  </div>
                </div>

                {/* 3D Model - Directly on Glass */}
                <div className="relative w-full h-full min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center z-20 cursor-default pointer-events-none">
                    <Suspense
                      fallback={
                        <div className="flex flex-col items-center justify-center gap-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
                          <span className="text-emerald-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase animate-pulse">Loading Model_</span>
                        </div>
                      }
                    >
                      <TShirt3DModel modelPath="/models/shirt.glb" />
                    </Suspense>
                  </div>

                  <div className="absolute bottom-6 sm:bottom-8 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md rounded-full border border-white/5 z-20 opacity-60 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <Rotate3d className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 animate-spin-slow" />
                    <span className="text-[8px] sm:text-[10px] text-gray-300 font-mono tracking-wider uppercase">Drag to Rotate</span>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL (Info, Specs, Action) */}
              <div className="p-5 sm:p-8 lg:p-10 flex flex-col h-full gap-6 order-last">

                {/* Header Section with Redesigned Tags */}
                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-4 font-mono text-xs tracking-wider">
                    {/* Creative Data Tags - REPLACED TEXT */}
                    <div className="flex items-center gap-2 text-emerald-500/80">
                      <span className="opacity-50">///</span>
                      <span className="font-bold border-b border-emerald-500/30 pb-0.5">MK-IV</span>
                    </div>

                    <div className="w-px h-3 bg-white/20" />

                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span className="font-bold">EXCLUSIVE</span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-3xl lg:text-3xl font-black text-white uppercase tracking-tighter leading-none break-words mb-4">
                    {tshirtItem.name}
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-sm font-light border-l-2 border-emerald-500/30 pl-4">
                    {tshirtItem.description}
                  </p>
                </div>

                {/* Specs Section - Transparent Container */}
                <div className="flex flex-col">
                  <div className="flex flex-col py-2">
                    {tshirtItem.details.map((detail, idx) => (
                      <div key={idx} className="relative group/item flex flex-col justify-center">
                        <div className="px-4 sm:px-5 py-2 flex items-center gap-4 transition-colors duration-300">
                          <span className="text-emerald-500/50 font-mono text-xs">0{idx + 1}</span>
                          <p className="text-gray-300 font-medium text-sm leading-snug">
                            {detail.text}
                          </p>
                        </div>
                        {/* Creative Separator */}
                        {idx !== tshirtItem.details.length - 1 && (
                          <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizes Section */}
                <div>
                  <h3 className="text-[10px] sm:text-xs font-bold text-emerald-400 mb-3 sm:mb-5 uppercase tracking-[0.2em] font-mono flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rotate-45" />
                    Sizes
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl bg-black/40 text-gray-400 font-bold text-xs border border-white/5 cursor-default"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Block */}
                <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-gray-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest">Total Price</span>
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">₹{tshirtItem.price}</span>
                  </div>

                  {/* BUTTON - UPDATED TO PURPLE (#5924ae) */}
                  <button
                    onClick={handleBuyClick}
                    style={{ cursor: 'pointer' }}
                    className="relative w-full py-3 sm:py-4 -skew-x-[20deg] bg-[#5924ae] hover:bg-[#4a1d91] text-white font-black uppercase tracking-[0.15em] text-xs sm:text-sm rounded-lg border border-white/20 shadow-[0_0_30px_rgba(89,36,174,0.4)] hover:shadow-[0_0_50px_rgba(89,36,174,0.6)] backdrop-blur-md transition-all duration-300 overflow-hidden group cursor-pointer z-50 pointer-events-auto cursor-target"
                  >
                    {/* Content un-skewed */}
                    <span className="relative z-10 flex items-center justify-center gap-2 skew-x-[20deg] pointer-events-none">
                      Buy Now
                    </span>
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full -translate-x-full animate-shimmer skew-x-[20deg] pointer-events-none" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        <MerchBuyModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          productName={tshirtItem.name}
          productPrice={tshirtItem.price}
          productSize={defaultSize}
        />
      </div>
    </div>
  );
};

export default Merch;
