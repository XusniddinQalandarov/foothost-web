"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Building2,
  ListOrdered,
  LogOut,
  Menu,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Мониторинг", icon: LayoutDashboard },
  { href: "/admin/news", label: "Новости", icon: Newspaper },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/fields", label: "Поля", icon: Building2 },
  { href: "/admin/lobbies", label: "Лобби", icon: ListOrdered },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [me, setMe] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    api
      .me()
      .then(setMe)
      .catch(() => router.replace("/login"))
      .finally(() => setCheckingAuth(false));
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-sm text-gray-500">
        Проверка доступа...
      </div>
    );
  }

  function logout() {
    localStorage.removeItem("access_token");
    router.replace("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white shadow-lg transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b px-6">
          <LayoutDashboard size={22} className="text-primary" />
          <span className="font-artico text-lg font-black uppercase tracking-wide text-[#0c0f0d]">
            Admin
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href))
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t px-4 py-4">
          {me && (
            <p className="mb-3 truncate text-xs text-gray-500">
              {me.firstName} {me.lastName}
            </p>
          )}
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b bg-white px-6 lg:hidden">
          <button onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
          <span className="font-artico font-black uppercase tracking-wide">Admin</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
