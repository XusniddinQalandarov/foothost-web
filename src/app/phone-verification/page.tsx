"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function PhoneVerificationInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") ?? "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/home");
    }, 500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eef0f2] to-[#dfe4ea] px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200/80 bg-white p-10 shadow-2xl lg:p-12">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <span className="font-artico text-2xl font-black text-primary">SMS</span>
        </div>
        <h1 className="font-artico text-center text-3xl font-bold uppercase">Подтверждение</h1>
        <p className="mt-3 text-center text-sm text-text-secondary">
          Код отправлен на номер <span className="font-semibold text-text-primary">{phone || "ваш телефон"}</span>
        </p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="• • • •"
            className="w-full rounded-2xl border border-gray-200 px-4 py-4 text-center text-2xl tracking-[0.6em] outline-none ring-primary focus:ring-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary py-4 font-artico text-lg font-bold uppercase text-white shadow-lg disabled:opacity-60"
          >
            {loading ? "Проверка…" : "Подтвердить"}
          </button>
        </form>
        <Link href="/register" className="mt-8 block text-center text-sm font-semibold text-primary hover:underline">
          Изменить номер
        </Link>
      </div>
    </div>
  );
}

export default function PhoneVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6]">Загрузка…</div>
      }
    >
      <PhoneVerificationInner />
    </Suspense>
  );
}
