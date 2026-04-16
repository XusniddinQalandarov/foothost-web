"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Calendar, Menu, X } from "lucide-react";

const nav = [
  { href: "/home", label: "Главная" },
  { href: "/stadiums", label: "Поля" },
  { href: "/tournaments", label: "Турниры" },
  { href: "/profile", label: "Профиль" },
] as const;

function activePath(pathname: string, href: string) {
  if (href === "/home") return pathname === "/home";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/home" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/logo.svg" alt="FootHost" width={112} height={44} className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основное меню">
          {nav.map(({ href, label }) => {
            const on = activePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  on ? "bg-primary/10 text-primary" : "text-text-primary hover:bg-gray-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="rounded-full p-2 text-text-secondary hover:bg-gray-100"
            aria-label="Уведомления"
          >
            <Bell size={20} strokeWidth={2} />
          </button>
          <Link
            href="/login"
            className="text-sm font-semibold text-text-primary hover:text-primary"
          >
            Войти
          </Link>
          <Link
            href="/booking/step-1"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#3d9c2b]"
          >
            <Calendar size={18} />
            Забронировать
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Мобильное меню">
            {nav.map(({ href, label }) => {
              const on = activePath(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-semibold ${
                    on ? "bg-primary/10 text-primary" : "text-text-primary"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/login"
              className="mt-2 rounded-xl border border-gray-200 px-4 py-3 text-center font-semibold"
              onClick={() => setOpen(false)}
            >
              Войти
            </Link>
            <Link
              href="/booking/step-1"
              className="rounded-xl bg-primary px-4 py-3 text-center font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Забронировать поле
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
