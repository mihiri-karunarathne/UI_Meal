"use client";

import { useState } from "react";
import Image from "next/image";

interface IconProps {
  src: string;
  //size: number;
  className?: string;
  alt?: string;
  onClick?: () => void;
}

//Icon component OUTSIDE main component
function Icon({ src, className = '', alt = '', onClick }: IconProps) {
  return (
    <Image
      src={src}
      width={24}
      height={24}
       className={className}
       alt={alt}
      aria-hidden={alt === ''}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick?.();  // ✅ Auto event handling
      }}
      style={{ cursor: onClick ? 'pointer' : 'default' }}  // ✅ Auto cursor
    />
  );
}

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    setError("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "doctor", // replace with session later
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Password updated successfully!");

    } catch (err: unknown) {
       const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {

    setLoading(false);
    }

      
  };

return (
  <div className="w-[1280px] min-h-[1043px] px-4 py-6 bg-slate-50 flex justify-center items-center">
    
    <div className="w-[480px] flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-[#2D3748] text-2xl font-extrabold leading-8">
          VitalEase Health
        </div>
        <div className="text-[#718096] text-sm font-medium uppercase tracking-wide">
          Clinical Portal
        </div>
      </div>

      {/* Card */}
      <div className="px-8 pt-8 pb-[20px] bg-white rounded-2xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#E2E8F0] flex flex-col gap-8">

        {/* TITLE */}
        <div className="w-[414px] h-[166px] flex flex-col items-center gap-[32px] mx-auto">
          <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center">
            <div className="w-6 h-7 bg-[#39A16A]" />
          </div>

          <div className="text-[#2D3748] text-2xl font-bold text-center leading-8">
            Change Your Password
          </div>

          <div className="text-[#718096] text-sm text-center leading-6">
            To ensure the security of patient records, please set a new
            clinical-grade password for your first login.
          </div>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-[20px] w-[414px] mx-auto">

          {/* Current Password */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[#718096] text-xs font-bold uppercase tracking-wide">
              Current Password
            </label>

            <div className="relative w-[414px] h-[50px] bg-[#F8FAFC] rounded-lg outline outline-1 outline-[#E2E8F0] flex items-center">

                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full h-full px-[16px] pr-[48px] bg-transparent outline-none border-none focus:outline-none focus:ring-0 text-[#2D3748] text-base"
                    />

                      <Icon
                        src={showCurrentPassword ? "/images/change-password/Icon (12).svg" : "/images/change-password/Icon (9).svg"}
                        className="absolute right-[16px] top-[50%] translate-y-[-50%] w-5 h-5 opacity-60 cursor-pointer"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      />
                   </div>
          </div>

          {/* New Password */}
                <div className="flex flex-col gap-[8px]">
                  <label className="text-[#718096] text-xs font-bold uppercase tracking-wide">
                    New Password
                  </label>

                  <div className="relative w-[414px] h-[50px] bg-[#F8FAFC] rounded-lg outline outline-1 outline-[#E2E8F0] flex items-center">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-full px-[16px] pr-[48px] bg-transparent outline-none border-none focus:outline-none focus:ring-0 text-[#2D3748] text-base"
                    />
                    <Icon
                      src={showNewPassword ? "/images/change-password/Icon (12).svg" : "/images/change-password/Icon (9).svg"}
                      className="absolute right-[16px] top-[50%] translate-y-[-50%] w-5 h-5 opacity-60 cursor-pointer"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  </div>

                  {/* Strength */}
                  <div className="flex justify-between items-center">
                    <span className="text-[#718096] text-xs font-medium">
                      Strength: <span className="text-[#CA8A04] font-bold">Good</span>
                    </span>
                    <span className="text-[#CA8A04] text-xs font-bold">75%</span>
                  </div>
                  <div className="w-[414px] h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-2 bg-[#FACC15] w-[75%]" />
                  </div>
                </div>

          {/* Confirm Password */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#718096] text-xs font-bold uppercase tracking-wide">
                  Confirm New Password
                </label>

                <div className="relative w-[414px] h-[50px] bg-[#F8FAFC] rounded-lg outline outline-1 outline-[#E2E8F0] flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-full px-[16px] pr-[48px] bg-transparent outline-none border-none focus:outline-none focus:ring-0 text-[#2D3748] text-base"
                  />
                  <Icon
                    src={showConfirmPassword ? "/images/change-password/Icon (12).svg" : "/images/change-password/Icon (9).svg"}
                    className="absolute right-[16px] top-[50%] translate-y-[-50%] w-5 h-5 opacity-60 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
              </div>

          {/* Security Requirements */}
          <div className="w-[414px] h-[139px] p-4 bg-[#F8FAFC] rounded-xl outline outline-1 outline-[#E2E8F0] flex flex-col gap-3">
            <p className="text-[#718096] text-[10px] font-bold uppercase tracking-wide">
              Security Requirements
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <Icon src="/images/change-password/Icon (11).svg" className="w-3.5 h-3.5" />
                <span className="text-[#2D3748] text-xs font-medium">Minimum 8 characters</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Icon src="/images/change-password/Icon (11).svg" className="w-3.5 h-3.5" />
                <span className="text-[#2D3748] text-xs font-medium">At least one uppercase letter</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Icon src="/images/change-password/Icon (11).svg" className="w-3.5 h-3.5" />
                <span className="text-[#2D3748] text-xs font-medium">At least one number</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Icon src="/images/change-password/Icon (11).svg" className="w-3.5 h-3.5" />
                <span className="text-[#718096] text-xs font-medium">At least one special character</span>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="w-[414px] h-[50px] bg-[#39A16A] hover:bg-[#2F855A] active:bg-[#287D4A] rounded-[12px] flex justify-center items-center font-['Inter'] text-[#FFFFFF] font-bold shadow-lg shadow-[#39A16A]/25 transition-all duration-200 border-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
>
            {loading ? "Updating..." : "Update Password"}
          </button>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[#39A16A] text-xs font-semibold">
        Need help? Contact IT Support
      </div>

    </div>
  </div>
);
}