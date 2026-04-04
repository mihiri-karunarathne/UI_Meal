"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-[1280px] min-h-[1043px] px-4 py-6 bg-slate-50 inline-flex justify-center items-center">
      <div className="w-[480px] max-w-[480px] inline-flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col gap-1 items-center">
          <div className="text-gray-700 text-2xl font-extrabold leading-8">
            VitalEase Health
          </div>
          <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">
            Clinical Portal
          </div>
        </div>

        {/* Card */}
        <div className="px-8 pt-8 pb-12 bg-white rounded-2xl shadow-sm outline outline-1 outline-slate-200 flex flex-col gap-8">

          {/* Title */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-7 bg-green-500" />
            </div>

            <div className="text-gray-700 text-2xl font-bold">
              Change Your Password
            </div>

            <div className="text-slate-500 text-sm text-center mt-2">
              To ensure the security of patient records, please set a new
              clinical-grade password for your first login.
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">

            {/* Current Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 text-xs font-bold uppercase tracking-wide">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="px-4 py-3 bg-slate-50 rounded-lg outline outline-1 outline-slate-200 text-gray-700"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 text-xs font-bold uppercase tracking-wide">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="px-4 py-3 bg-slate-50 rounded-lg outline outline-1 outline-slate-200 text-gray-700"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 text-xs font-bold uppercase tracking-wide">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-3 bg-slate-50 rounded-lg outline outline-1 outline-slate-200 text-gray-700"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Button */}
            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="py-3.5 bg-green-500 rounded-lg text-white font-bold"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-green-500 text-xs font-semibold">
          Need help? Contact IT Support
        </div>

      </div>
    </div>
  );
}