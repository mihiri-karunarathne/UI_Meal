"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Doctor');
  const router = useRouter();
  const roles = ['Doctor', 'Nurse', 'Clerk', 'Kitchen'];


 const handleLogin = async () => {
  setError("");
  setLoading(true);

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        password,
        role: selectedRole,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Redirect based on role from backend
    router.push(`/${data.role.toLowerCase()}`);

  } catch (err: any) {
    setError(err.message);
  }

  setLoading(false);
};

  return (
    <div className="w-[400px] bg-white pt-[9px] px-[8px] pb-[8px] rounded-2xl shadow-sm">
      
      {/* Title */}
      <h1 className="text-[28px] font-bold text-[#2D3748] text-center leading-[42px] pt-[9px] px-[8px] pb-[8px] ">
         Welcome Back
       </h1>

      {/* Subtitle */}
      <p className="text-center text-[#3E4948] mt-2 text-[16px] leading-[24px] pt-[9px] px-[8px] pb-[8px]">
        Access your clinical dashboard to manage patient dietary needs.
      </p>
 
      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="mt-8 space-y-6 pt-[2px] px-[8px] pb-[8px]"
      >
        
        <div className="flex flex-col w-[400px] space-y-[24px]">
         {/* User ID */}
          <div className="flex flex-col">
            <label className="pt-[9px] text-[14px] font-semibold text-[#3E4948] uppercase tracking-[0.7px]">
              User ID
            </label>

            <div className="relative pt-[9px]" >
              <Input
                placeholder="DC-8842-JON"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="h-[56px]  px-4 pr-28 bg-[#DEE8FF] text-[#001B3C] text-[16px] font-bold font-['Inter'] rounded-[12px] border-none focus:ring-2 focus:ring-teal-500"
              />
              
              {/* Role Dropdown Button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[98.55px] h-[45px] bg-[#FFFFFF] hover:from-[#F0FDF4] hover:to-[#ECFDF5] active:from-[#D1FAE5] active:to-[#C7F3D9] rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E5E7EB]/30 hover:border-[#5EEAD4]/50 active:border-[#22D3EE]/70 flex items-center justify-center gap-1 hover:shadow-lg active:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 z-10 group"
              >
                <span className="text-xs text-teal-700 font-bold font-['Inter'] uppercase leading-4 truncate px-1 group-hover:text-teal-600 group-active:text-teal-800">
                  {selectedRole}
                </span>
                {isDropdownOpen ? (
                  <ChevronUp size={16} className="text-teal-700 font-bold" />
                ) : (
                  <ChevronDown size={16} className="text-teal-700 font-bold" />
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-[12px] top-full mt-2 w-[98.55px] h-auto bg-[#FFFFFF] rounded-[10px] shadow-lg border border-[#E5E7EB]/50 hover:border-[#5EEAD4]/70 backdrop-blur-sm z-20 animate-in fade-in slide-in-from-top-2 duration-200 p-2 hover:shadow-xl transition-all duration-200">
                  <div className="flex flex-col space-y-[4px]">
                    {roles.map((role) => (
                      <div
                        key={role}
                        className="w-full text-center text-[13px] text-teal-700 font-bold font-['Inter'] uppercase leading-4 hover:text-teal-600 px-2 py-1 bg-transparent hover:bg-white/50 rounded-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                        onClick={() => {
                          setSelectedRole(role);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
         </div>
          {/* Password */}
           <div className="flex flex-col pt-[9px] space-y-[8px]">
             <label className="text-[14px] font-semibold text-[#3E4948] uppercase tracking-[0.7px]">
             Password
             </label>
         <div className="flex flex-col space-y-[24px]">
         <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[56px] px-4 bg-[#DEE8FF] text-[#001B3C] text-[16px] font-medium font-['Inter'] rounded-[12px] border-none focus:ring-2 focus:ring-teal-500"
           />
   
    {/* Forgot Password */}
            <button
              type="button"
              className="w-20 justify-start text-teal-700 text-sm font-bold font-['Inter'] leading-5 bg-transparent border-none cursor-pointer hover:underline"
             >
              Forgot Password?
            </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-[24px]">
                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
          </div>
        {/* Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-[400px] h-[56px] relative bg-[#067675] rounded-[12px] shadow-[0px_4px_6px_-4px_rgba(0,103,102,0.10)] shadow-[0px_10px_15px_-3px_rgba(0,103,102,0.10)] hover:bg-[#006766] hover:text-white transition-colors duration-300 font-bold text-[16px] leading-5"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        
      </form>

      {/* Footer */}
      <p className="text-center text-[14px] text-[#3E4948] mt-6">
        Need help?{" "}
        <span className="text-[#006766] font-bold">
          Contact IT Support
        </span>
      </p>
    </div>
  );
}