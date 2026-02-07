import { useState } from "react";
import { X, User, Zap, Building2, Package, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LiquidGlassCard from "../liquidglass/LiquidGlassCard";
import { merchPurchaseSchema, type MerchPurchaseFormData } from "../../schemas/merchSchema";

interface MerchBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
  productSize?: string;
}

const MerchBuyModal = ({
  isOpen,
  onClose,
  productName,
  productPrice,
  productSize,
}: MerchBuyModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New state for success view

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MerchPurchaseFormData>({
    resolver: zodResolver(merchPurchaseSchema),
    defaultValues: {
      size: productSize as MerchPurchaseFormData['size'],
    },
  });

  const onSubmit = async (data: MerchPurchaseFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsSubmitting(false);
      setIsSuccess(true); // Trigger success view

      // Close modal automatically after showing success for 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 2500);
    }, 1500);
  };

  // Reset state when modal closes manually
  const handleClose = () => {
    setIsSuccess(false);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4 md:px-6 bg-black/50 backdrop-blur-sm overflow-y-auto py-4 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="w-full max-w-sm sm:max-w-md flex-shrink-0 my-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <LiquidGlassCard style={glassCardStyle} className="merch-glass relative p-4 sm:p-6 max-h-[95vh] overflow-y-auto w-full">
              {/* Close Button (only show if not success state) */}
              {!isSuccess && (
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-lg transition-colors z-10 cursor-pointer cursor-target"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              )}

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* SUCCESS ANIMATION VIEW */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                      className="w-20 h-20 bg-[#5924ae] rounded-full flex items-center justify-center mb-4 shadow-[0_0_50px_rgba(89,36,174,0.5)]"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold text-white mb-2"
                    >
                      Payment Successful!
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-300 text-sm"
                    >
                      Your order for {productName} has been placed.
                    </motion.p>
                  </motion.div>
                ) : (
                  /* FORM VIEW */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-full"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        {productName}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Complete your details to proceed
                      </p>
                    </div>

                    {/* Price Display */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-[#5924ae]/10 to-[#4a1d91]/10 border border-[#5924ae]/30 rounded-lg flex justify-between items-center">
                      <span className="text-lg font-bold text-white">Order Total</span>
                      <span className="text-xl font-bold text-[#bca4ff]">
                        ₹{productPrice}
                      </span>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex-1 overflow-y-auto px-1 pb-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Name */}
                        <div>
                          <label className="flex items-center text-xs font-bold text-white tracking-tight mb-1.5">
                            <User className="w-3.5 h-3.5 mr-2 text-[#bca4ff]" />
                            Name
                          </label>
                          <input
                            {...register("name")}
                            type="text"
                            placeholder="Enter your name"
                            className={`w-full px-4 py-2.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs placeholder-gray-500/70 transition-all focus:outline-none group ${errors.name
                              ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500"
                              : "border-white/20 focus:bg-white/15 focus:border-[#bca4ff]/50"
                              }`}
                          />
                          {errors.name && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        {/* USN */}
                        <div>
                          <label className="flex items-center text-xs font-bold text-white tracking-tight mb-1.5">
                            <Zap className="w-3.5 h-3.5 mr-2 text-[#bca4ff]" />
                            USN
                          </label>
                          <input
                            {...register("usn")}
                            type="text"
                            placeholder="e.g., NNMXXYYZZZ"
                            className={`w-full px-4 py-2.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs placeholder-gray-500/70 transition-all focus:outline-none ${errors.usn
                              ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500"
                              : "border-white/20 focus:bg-white/15 focus:border-[#bca4ff]/50"
                              }`}
                          />
                          {errors.usn && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.usn.message}</p>
                          )}
                        </div>
                      </div>

                      {/* College Name & Branch - Combined Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* College Name */}
                        <div>
                          <label className="flex items-center text-xs font-bold text-white tracking-tight mb-1.5">
                            <Building2 className="w-3.5 h-3.5 mr-2 text-[#bca4ff]" />
                            College
                          </label>
                          <input
                            {...register("collegeName")}
                            type="text"
                            placeholder="College Name"
                            className={`w-full px-4 py-2.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs placeholder-gray-500/70 transition-all focus:outline-none ${errors.collegeName
                              ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500"
                              : "border-white/20 focus:bg-white/15 focus:border-[#bca4ff]/50"
                              }`}
                          />
                          {errors.collegeName && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.collegeName.message}</p>
                          )}
                        </div>

                        {/* Branch */}
                        <div>
                          <label className="flex items-center text-xs font-bold text-white tracking-tight mb-1.5">
                            <Building2 className="w-3.5 h-3.5 mr-2 text-[#bca4ff]" />
                            Branch
                          </label>
                          <input
                            {...register("branch")}
                            type="text"
                            placeholder="e.g., CSE"
                            className={`w-full px-4 py-2.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs placeholder-gray-500/70 transition-all focus:outline-none ${errors.branch
                              ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500"
                              : "border-white/20 focus:bg-white/15 focus:border-[#bca4ff]/50"
                              }`}
                          />
                          {errors.branch && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.branch.message}</p>
                          )}
                        </div>
                      </div>

                      {/* T-Shirt Size & Semester */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Size */}
                        <div>
                          <label className="flex items-center text-xs font-bold text-white tracking-tight mb-1.5">
                            <Package className="w-3.5 h-3.5 mr-2 text-[#bca4ff]" />
                            Size
                          </label>
                          <select
                            {...register("size")}
                            className={`w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#bca4ff]/50 transition-all appearance-none cursor-pointer ${errors.size ? "border-red-500/50" : ""
                              }`}
                          >
                            <option value="">Select Size</option>
                            <option value="XS">XS</option>
                            <option value="S">Small (S)</option>
                            <option value="M">Medium (M)</option>
                            <option value="L">Large (L)</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                          </select>
                          {errors.size && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.size.message}</p>
                          )}
                        </div>

                        {/* Semester */}
                        <div>
                          <label className="flex items-center text-xs font-bold text-white tracking-tight mb-1.5">
                            <Zap className="w-3.5 h-3.5 mr-2 text-[#bca4ff]" />
                            Sem
                          </label>
                          <select
                            {...register("semester")}
                            className={`w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#bca4ff]/50 transition-all appearance-none cursor-pointer ${errors.semester ? "border-red-500/50" : ""
                              }`}
                          >
                            <option value="">Select Sem</option>
                            <option value="1">1st</option>
                            <option value="2">2nd</option>
                            <option value="3">3rd</option>
                            <option value="4">4th</option>
                            <option value="5">5th</option>
                            <option value="6">6th</option>
                            <option value="7">7th</option>
                            <option value="8">8th</option>
                          </select>
                          {errors.semester && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.semester.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-4">
                        <motion.button
                          type="button"
                          onClick={handleClose}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-gray-200 font-bold text-xs hover:bg-white/10 transition-all cursor-pointer cursor-target"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#4a1d91] to-[#5924ae] text-white font-bold text-xs transition-all shadow-lg hover:shadow-[0_0_30px_rgba(89,36,174,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer cursor-target"
                        >
                          {isSubmitting ? "Processing..." : "Pay Now"}
                        </motion.button>
                      </div>
                    </form>

                    <p className="text-[10px] text-gray-500 text-center mt-3">
                      ✓ Secure payment
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </LiquidGlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MerchBuyModal;
