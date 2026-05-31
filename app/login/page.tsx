"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Import a spinner

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email, name: email.split("@")[0] }));
      router.push("/");
    } else {
      setError("Please fill in all fields");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.15),transparent_70%)]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo with slight pulse */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
        </div>

        {/* Card with Glassmorphism */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-center mb-8">Sign in to your ParkHub account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-3 mb-6 text-sm flex items-center justify-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" className="rounded bg-slate-950 border-slate-700 accent-blue-600" />
                Remember me
              </label>
              <Link href="#" className="text-blue-500 hover:text-blue-400 font-medium">Forgot password?</Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all py-6 rounded-xl font-semibold shadow-lg shadow-blue-600/20"
            >
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:text-blue-400 font-semibold underline underline-offset-4">Sign up</Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-slate-900/30 rounded-xl border border-slate-800 p-4 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Demo Credentials</p>
          <code className="text-xs text-slate-300 bg-slate-950 px-2 py-1 rounded">demo@parkhub.com / demo123</code>
        </div>
      </div>
    </div>
  );
}
