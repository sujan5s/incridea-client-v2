import { useState } from "react";
import {
  useMutation,
  useQuery,
  type QueryFunction,
  type MutationFunction,
} from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import {
  changePassword,
  fetchMe,
  logoutUser,
  type ChangePasswordPayload,
  type ChangePasswordResponse,
  type MeResponse,
} from "../api/auth";
import { useForm } from "react-hook-form";
import { showToast } from "../utils/toast";
import { Pencil, QrCode, X } from "lucide-react";
import LiquidGlassCard from "../components/liquidglass/LiquidGlassCard";
import InfiniteScroll from "../components/InfiniteScroll";
import Footer from "../components/Footer";

function ProfilePage() {
  // const navigate = useNavigate();
  // Derived token check removed, rely on MeResponse or AuthContext if accessible
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editFullName, setEditFullName] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // Removed unused toErrorMessage helper

  // Removed password reset mutation setup



  const profileQueryFn: QueryFunction<MeResponse> = () => {
    // if (!token) {
    //   throw new Error("Unauthorized");
    // }
    return fetchMe();
  };

  const profileQuery = useQuery<MeResponse>({
    queryKey: ["me"], 
    queryFn: profileQueryFn,
    retry: false, 
  });

  if (profileQuery.isError) {
      window.location.href = `${import.meta.env.VITE_AUTH_URL}/?redirect=${encodeURIComponent(window.location.href)}`;
      return null;
  }
  
  if (profileQuery.isLoading) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-50">
           <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-purple-500 mx-auto mb-4"></div>
           </div>
        </div>
      );
  }

  const form = useForm<ChangePasswordPayload>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const changePasswordMutationFn: MutationFunction<
    ChangePasswordResponse,
    ChangePasswordPayload
  > = (payload) => {
    return changePassword(payload);
  };

  const changePasswordMutation = useMutation<
    ChangePasswordResponse,
    Error,
    ChangePasswordPayload
  >({
    mutationFn: changePasswordMutationFn,
    onSuccess: () => {
      form.reset();
      showToast("Password updated successfully", "success");
      setShowChangePassword(false);
    },
  });

  // Removed unused password reset mutation

  const onSubmit = form.handleSubmit((values) =>
    changePasswordMutation.mutate(values),
  );

  const user = profileQuery.data?.user;
  const userName = user?.name ?? user?.email ?? "User";
  // Removed unused userEmail

  // Removed unused handleResetRequest to avoid noUnusedLocals errors

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore logout API errors and proceed to client-side cleanup
    } finally {
      // localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const handleCloseModal = () => {
    setShowChangePassword(false);
    setShowEditProfile(false);
    setEditFullName("");
    form.reset();
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <section className="relative h-screen overflow-y-auto pt-32 lg:pt-28 lg:pl-12 pb-2 flex flex-col items-center justify-start">
        {/* Profile Card */}
        <div className="w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] mt-4 px-3 sm:px-4">
          <div className="relative flex w-full gap-4 items-start flex-col xl:flex-row">
            <LiquidGlassCard className="p-4 lg:p-6 rounded-3xl w-full xl:flex-[0_0_33%]">
              <div className="mt-4"></div>
              {/* Edit Profile Button */}
              <button
                onClick={() => {
                  setEditFullName(userName);
                  setShowEditProfile(true);
                }}
                className="cursor-target absolute top-4 right-4 z-20 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110 group"
                title="Edit profile"
              >
                <Pencil className="w-4 h-4 lg:w-5 lg:h-5 text-slate-200 group-hover:text-white" />
                <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-slate-900/80 text-slate-100 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Edit profile
                </span>
              </button>
              <div className="flex flex-col items-center gap-5">
                {/* Avatar with badge QR */}
                <div className="relative flex items-center justify-center mt-3">
                  <div
                    className={`w-32 h-32 lg:w-44 lg:h-44 rounded-full bg-linear-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-xl transition-transform duration-500 ${
                      isRotating ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <span className="text-4xl lg:text-6xl text-slate-800 font-moco font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsRotating(true);
                      setTimeout(() => {
                        setShowQRCode(true);
                        setIsRotating(false);
                      }, 500);
                    }}
                    className="cursor-target absolute -bottom-2 -right-2 w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110 shadow-lg"
                    title="Show QR Code"
                  >
                    <QrCode className="w-5 h-5 lg:w-6 lg:h-6 text-slate-200" />
                  </button>
                </div>

                {/* Text */}
                <div className="text-center space-y-2">
                  <p className="text-2xl lg:text-3xl text-slate-50 font-moco font-bold">
                    {userName}
                  </p>
                  <p className="text-sm text-slate-300 font-moco">{"No College Info"}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 justify-center items-center w-full">
                  <button
                    className="cursor-target px-6 py-2 card card--dark text-white font-medium rounded-3xl transition-all duration-200 w-full max-w-xs hover:opacity-80 active:opacity-60"
                    type="button"
                    onClick={() => {
                      setShowChangePassword(true);
                    }}
                  >
                    Change password
                  </button>
                  <button
                    className="cursor-target px-6 py-2 card card--dark text-white font-medium rounded-3xl transition-all duration-200 w-full max-w-xs hover:opacity-80 active:opacity-60"
                    type="button"
                    onClick={() => {
                      void handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="mt-2"></div>
            </LiquidGlassCard>

            {/* Missions Card on the right */}
            <LiquidGlassCard className="p-4 lg:p-5 rounded-3xl w-full xl:flex-1 overflow-hidden">
              <div className="grid gap-4 xl:grid-rows-[auto_auto] overflow-hidden">
                {/* Top Section: Enrolled Missions */}
                <div className="flex flex-col overflow-hidden">
                  <div className="flex justify-center mb-4 mt-2 w-full">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white text-center w-full font-moco font-bold">
                      My Missions
                    </h2>
                  </div>
                  <InfiniteScroll
                    items={[
                      {
                        title: "Design Bootcamp",
                        code: "DB1N9R4",
                        image: "/tempprofile/1.png",
                      },
                      {
                        title: "Hackathon 2026",
                        code: "HX7K2P9",
                        image: "/tempprofile/2.png",
                      },
                      {
                        title: "Code Sprint Championship",
                        code: "CS9M4L1",
                        image: "/tempprofile/3.png",
                      },
                      {
                        title: "Web Dev Masters",
                        code: "WD2X8B5",
                        image: "/tempprofile/4.png",
                      },
                      {
                        title: "AI Innovation Summit",
                        code: "AI6P3K7",
                        image: null,
                      },
                    ].map((mission) => (
                      <LiquidGlassCard
                        key={mission.code}
                        className="w-49! max-w-49! p-4.5! flex flex-col gap-2 rounded-3xl!"
                      >
                        <div className="relative aspect-4/5 w-full bg-linear-to-b from-white/20 to-black/40 rounded-3xl overflow-hidden">
                          {mission.image ? (
                            <img
                              src={mission.image}
                              alt={mission.title}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-linear-to-b from-white/60 via-white/25 to-black/70 flex items-center justify-center text-black/40">
                              <div className="text-center text-sm">
                                <div className="font-semibold">Portrait</div>
                                <div>1080 × 1350 px (4:5)</div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col space-y-1.5 overflow-hidden">
                          <div>
                            <h3 className="text-xs text-slate-50 line-clamp-1 font-moco font-bold">
                              {mission.title}
                            </h3>
                          </div>
                          <div className="flex items-center justify-between bg-slate-900/40 rounded px-1.5 py-1">
                            <span className="text-xs text-teal-400 font-moco">
                              VENUE:
                            </span>
                            <span className="text-xs text-amber-300 font-moco font-bold">
                              TBA
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-slate-900/40 rounded px-1.5 py-1">
                            <span className="text-xs text-pink-400 font-moco">TIME:</span>
                            <span className="text-xs text-amber-300 font-moco font-bold">
                              TBA
                            </span>
                          </div>
                        </div>
                      </LiquidGlassCard>
                    ))}
                    speed="normal"
                    gap="gap-4"
                    itemWidth="w-49"
                    pauseOnHover={true}
                    autoScroll={false}
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-3"></div>

                {/* Bottom Section: Recommended Missions */}
                <div className="flex flex-col overflow-hidden">
                  <div className="flex justify-center mb-4 mt-2 w-full">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white text-center w-full font-moco font-bold">
                      Recommended Missions
                    </h2>
                  </div>
                  <InfiniteScroll
                    items={[
                      {
                        title: "UI/UX Challenge",
                        code: "UX7L2M1",
                        image: "/tempprofile/2.png",
                      },
                      {
                        title: "Robotics Arena",
                        code: "RB5Q8Z2",
                        image: "/tempprofile/3.png",
                      },
                      {
                        title: "Data Viz Jam",
                        code: "DV4C7N9",
                        image: "/tempprofile/1.png",
                      },
                      { title: "Cloud Builders", code: "CB3J6T1", image: null },
                    ].map((mission) => (
                      <LiquidGlassCard
                        key={mission.code}
                        className="w-49! max-w-49! p-4.5! flex flex-col gap-2 rounded-3xl!"
                      >
                        <div className="relative aspect-4/5 w-full bg-linear-to-b from-white/20 to-black/40 rounded-3xl overflow-hidden">
                          {mission.image ? (
                            <img
                              src={mission.image}
                              alt={mission.title}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-linear-to-b from-white/60 via-white/25 to-black/70 flex items-center justify-center text-black/40">
                              <div className="text-center text-sm">
                                <div className="font-semibold">Portrait</div>
                                <div>1080 × 1350 px (4:5)</div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col space-y-1.5 overflow-hidden">
                          <div>
                            <h3 className="text-xs text-slate-50 line-clamp-1 font-moco font-bold">
                              {mission.title}
                            </h3>
                          </div>
                          <div className="flex items-center justify-between bg-slate-900/40 rounded px-1.5 py-1">
                            <span className="text-xs text-teal-400 font-moco">
                              VENUE:
                            </span>
                            <span className="text-xs text-amber-300 font-moco font-bold">
                              TBA
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-slate-900/40 rounded px-1.5 py-1">
                            <span className="text-xs text-pink-400 font-moco">TIME:</span>
                            <span className="text-xs text-amber-300 font-moco font-bold">
                              TBA
                            </span>
                          </div>
                        </div>
                      </LiquidGlassCard>
                    ))}
                    speed="normal"
                    gap="gap-4"
                    itemWidth="w-49"
                    pauseOnHover={true}
                    autoScroll={false}
                  />
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>

        {showQRCode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-1 md:p-1.5 backdrop-blur">
            <LiquidGlassCard
              className="
                w-[92%]! sm:w-[70%]! md:w-[45%]! lg:w-[25%]!
                max-w-[92%]! sm:max-w-[70%]! md:max-w-[45%]! lg:max-w-[25%]!
                flex-none space-y-7 md:space-y-8 px-9 md:px-10 py-8 md:py-9 rounded-3xl
              "
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="pt-1">
                  <h3 className="text-lg text-slate-50 pl-0.5 font-moco font-bold">
                    QR Code
                  </h3>
                </div>
                <button
                  type="button"
                  className="cursor-target text-slate-300 hover:text-sky-300 p-1 hover:bg-white/10 rounded transition-colors"
                  onClick={() => setShowQRCode(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center space-y-6 md:space-y-7 pb-1">
                {/* QR Code Placeholder */}
                <div className="w-64 h-64 bg-white rounded-2xl p-5 flex items-center justify-center shadow-inner">
                  <div className="w-full h-full bg-slate-200 rounded-xl flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-slate-400" />
                  </div>
                </div>
                <p className="text-sm text-slate-400 text-center pb-1 font-moco">
                  Scan this QR code
                </p>
              </div>
            </LiquidGlassCard>
          </div>
        )}

        {showEditProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-1 md:p-1.5 backdrop-blur">
            <LiquidGlassCard
              className="
                w-[92%]! sm:w-[70%]! md:w-[45%]! lg:w-[25%]!
                max-w-[92%]! sm:max-w-[70%]! md:max-w-[45%]! lg:max-w-[25%]!
                flex-none space-y-6 px-9 md:px-10 py-7 md:py-8 rounded-3xl
              "
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="pt-1">
                  <h3 className="text-lg text-slate-50 pl-1 font-moco font-bold">
                    Edit profile
                  </h3>
                </div>
                <button
                  type="button"
                  className="cursor-target text-slate-300 hover:text-sky-300 p-1 hover:bg-white/10 rounded transition-colors"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="space-y-3 pt-3">
                  <input
                    id="fullName"
                    type="text"
                    className="w-full px-4! py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-moco"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="flex justify-center items-center gap-4 pb-3">
                  <button
                    className="cursor-target px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-3xl transition-colors duration-200 min-w-34"
                    type="button"
                    onClick={() => {
                      if (editFullName.trim()) {
                        showToast("Profile updated successfully", "success");
                        handleCloseModal();
                      } else {
                        showToast("Full name cannot be empty", "error");
                      }
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="cursor-target px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-3xl transition-colors duration-200 min-w-34"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        )}

        {showChangePassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-1 md:p-1.5 backdrop-blur">
            <LiquidGlassCard
              className="
                w-[92%]! sm:w-[70%]! md:w-[45%]! lg:w-[25%]!
                max-w-[92%]! sm:max-w-[70%]! md:max-w-[45%]! lg:max-w-[25%]!
                flex-none space-y-8 px-8 md:px-9 py-8 md:py-9 rounded-3xl
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="pt-0.5 pl-0.5">
                  <h3 className="text-lg text-slate-50 font-moco font-bold">
                    Change password
                  </h3>
                </div>
                <button
                  type="button"
                  className="cursor-target text-slate-300 hover:text-sky-300 p-1 hover:bg-white/10 rounded transition-colors"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                className="space-y-7 pt-2"
                onSubmit={(event) => void onSubmit(event)}
              >
                <div className="space-y-1.5">
                  <label
                    className="label text-sm text-slate-200 block px-5 md:px-6 font-moco font-bold"
                    htmlFor="currentPassword"
                  >
                    Current password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    className="w-full px-5 md:px-6 py-2.5 md:py-3 leading-tight bg-linear-to-b from-slate-600/30 to-slate-700/30 shadow-inner rounded-full text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:from-slate-600/50 focus:to-slate-700/50 transition-all duration-200 font-moco"
                    {...form.register("currentPassword", { required: true })}
                    placeholder="Enter your current password"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    className="label text-sm text-slate-200 block px-5 md:px-6 font-moco font-bold"
                    htmlFor="newPassword"
                  >
                    New password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="w-full px-5 md:px-6 py-2.5 md:py-3 leading-tight bg-linear-to-b from-slate-600/30 to-slate-700/30 shadow-inner rounded-full text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:from-slate-600/50 focus:to-slate-700/50 transition-all duration-200 font-moco"
                    {...form.register("newPassword", { required: true })}
                    placeholder="Create a new password"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    className="label text-sm text-slate-200 block px-5 md:px-6 font-moco font-bold"
                    htmlFor="confirmNewPassword"
                  >
                    Confirm new password
                  </label>
                  <input
                    id="confirmNewPassword"
                    type="password"
                    className="w-full px-5 md:px-6 py-2.5 md:py-3 leading-tight bg-linear-to-b from-slate-600/30 to-slate-700/30 shadow-inner rounded-full text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:from-slate-600/50 focus:to-slate-700/50 transition-all duration-200 font-moco"
                    {...form.register("confirmNewPassword", {
                      required: true,
                    })}
                    placeholder="Confirm your new password"
                  />
                </div>
                <div className="flex items-center justify-center gap-4 pt-3">
                  <button
                    className="cursor-target px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:brightness-95 text-white font-semibold rounded-3xl transition-all duration-200 min-w-36 shadow-lg hover:shadow-amber-500/20"
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                  >
                    {changePasswordMutation.isPending
                      ? "Updating…"
                      : "Update password"}
                  </button>
                  <button
                    className="cursor-target px-6 py-2.5 bg-slate-600/40 hover:bg-slate-600/60 text-slate-100 font-semibold rounded-3xl transition-all duration-200 min-w-36"
                    type="button"
                    onClick={handleCloseModal}
                    disabled={changePasswordMutation.isPending}
                  >
                    Cancel
                  </button>
                </div>
                {changePasswordMutation.isError && (
                  <p className="text-sm text-rose-300 pt-1 font-moco">
                    {changePasswordMutation.error instanceof Error
                      ? changePasswordMutation.error.message
                      : "Failed to update password."}
                  </p>
                )}
              </form>
            </LiquidGlassCard>
          </div>
        )}
        <div className="w-full mt-20">
          <Footer />
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
