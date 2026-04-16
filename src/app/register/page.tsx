"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.phoneNumber || !form.password) {
      alert("Заполните все поля");
      return;
    }
    if (!agree) {
      alert("Согласитесь с условиями");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/phone-verification?phone=${encodeURIComponent(form.phoneNumber)}`);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <div className="relative hidden min-h-screen lg:block">
        <Image
          src="/assets/images/homepage/homepage.png"
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <p className="font-artico text-4xl font-black uppercase">Присоединяйтесь</p>
          <p className="mt-4 max-w-sm text-lg text-white/90">
            Турниры, лобби и бронь полей — всё в одном приложении.
          </p>
        </div>
      </div>

      <div className="flex min-h-screen flex-col justify-center px-4 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-lg">
          <Link href="/home" className="mb-8 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/logo.svg" alt="FootHost" width={112} height={44} />
          </Link>
          <h1 className="font-artico text-3xl font-bold uppercase">Регистрация</h1>
          <p className="mt-2 text-text-secondary">Создайте аккаунт за минуту</p>

          <form onSubmit={handleSubmit} className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1 block text-sm font-semibold">Имя</label>
              <input
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-sm font-semibold">Фамилия</label>
              <input
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-semibold">Телефон</label>
              <input
                value={form.phoneNumber}
                onChange={(e) => setForm((f) => ({ ...f, phoneNumber: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-semibold">Пароль</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>
            <label className="flex items-center gap-2 sm:col-span-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm">Согласен с условиями использования</span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="sm:col-span-2 w-full rounded-xl bg-primary py-4 font-bold text-white disabled:opacity-60"
            >
              {loading ? "Отправка…" : "Продолжить"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="font-bold text-primary">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
