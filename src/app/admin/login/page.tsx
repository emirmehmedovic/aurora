"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Pogrešan email ili lozinka");
      } else {
        router.push("/admin");
      }
    } catch (error) {
      setError("Greška pri prijavi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image 
              src="/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Ice Cool PRO Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Prijavite se za pristup admin panelu
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-[#563435] focus:outline-none transition-colors"
                placeholder="admin@icecoolpro.ba"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                Lozinka
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-[#563435] focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-8 bg-[#563435] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Prijava..." : "Prijavi se"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
