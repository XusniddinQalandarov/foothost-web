"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (phone === "user" && password === "user") {
        router.push("/home");
      } else {
        alert('Неверные данные. Используйте логин "user" и пароль "user".');
      }
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] lg:grid lg:grid-cols-2">
      <div className="relative hidden min-h-screen lg:block">
        <Image
          src="/assets/images/stadium/stadium.png"
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <p className="font-artico text-4xl font-black uppercase leading-tight">
            С возвращением
            <br />
            <span className="text-primary">на поле</span>
          </p>
          <p className="mt-4 max-w-md text-lg text-white/85">
            Управляйте бронированиями, турнирами и командой из одного кабинета.
          </p>
        </div>
      </div>

      <div className="flex min-h-screen flex-col justify-center px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link href="/home" className="mb-10 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/logo.svg" alt="FootHost" width={120} height={48} />
          </Link>
          <h1 className="font-artico text-3xl font-bold uppercase tracking-tight text-text-primary">
            Вход
          </h1>
          <p className="mt-2 text-text-secondary">Введите данные аккаунта FootHost</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-text-primary">
                Телефон / логин
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-text-primary shadow-sm outline-none ring-primary focus:ring-2"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-text-primary">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-text-primary shadow-sm outline-none ring-primary focus:ring-2"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-4 text-base font-bold text-white shadow-md transition hover:bg-[#3d9c2b] disabled:opacity-60"
            >
              {loading ? "Вход…" : "Войти"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Нет аккаунта?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Регистрация
            </Link>
          </p>
          <Link
            href="/onboarding"
            className="mt-6 block text-center text-sm font-medium text-gray-500 hover:text-primary"
          >
            Экран приветствия
          </Link>
        </div>
      </div>
    </div>
  );
}
