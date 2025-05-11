"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let position = 0;
    const speed = 2;

    const drawLine = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = '#01FF7A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      ctx.moveTo(position - canvas.width, canvas.height);
      ctx.lineTo(position, 0);
      ctx.stroke();

      position += speed;
      if (position > canvas.width * 2) {
        position = 0;
      }

      requestAnimationFrame(drawLine);
    };

    drawLine();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
 
    console.log({ email, password });
   
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard")
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 opacity-20"
      />
      
      <div className="w-full max-w-md space-y-8 relative z-20">
        <div className="bg-[#131313] font-urbanist rounded-xl p-8 shadow-xl border border-[#01FF7A]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#01FF7A]"></div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl text-start text-white font-bold mb-6">
            LOGIN TO YOUR TINYBOX
            </h1>
            
            <div className="space-y-5">
              <div>
                <label className="text-white text-sm font-medium block mb-2">
                Username (admin)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 bg-[#1E1E1E] rounded-lg transition-all duration-200 text-white py-2 px-3"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white text-sm font-medium block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type= "password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 bg-[#1E1E1E]  rounded-[7px] transition-all duration-200 text-white py-2 px-3"
                    placeholder="Enter your password"
                    required
                  />
                  {/* <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#01FF7A] text-sm"
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button> */}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="w-4 h-4 text-[#01FF7A] border border-[#333] rounded focus:ring-[#01FF7A] cursor-pointer"
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-white text-sm font-medium cursor-pointer"
                  >
                    Remember me
                  </label>
                  </div>
                <button
                  type="button"
                  className="text-[#01FF7A]/70 hover:text-[#01FF7A] p-0 h-auto text-xs"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1C1C1C] text-[#454545] cursor-pointer rounded-lg font-medium py-3 h-auto transition-all duration-200"
              >
                {isLoading ? "Logging In..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
