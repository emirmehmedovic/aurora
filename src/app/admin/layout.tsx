"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/components/AdminSidebar";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
      {isLoginPage ? (
        children
      ) : (
        <div className="min-h-screen bg-gray-50">
          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main content wrapper with left margin for desktop sidebar */}
          <div className="lg:ml-64 min-h-screen flex flex-col">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <span className="font-bold text-[#563435]">Ice Cool PRO™</span>
              </div>
            </div>

            {/* Main content with max-width constraint */}
            <main className="flex-1 w-full">
              {children}
            </main>
          </div>
        </div>
      )}
    </SessionProvider>
  );
}
