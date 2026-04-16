"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Star } from "lucide-react";
import { useState } from "react";

const methods = [
  { key: "click", label: "CLICK", src: "/assets/images/payments/click.svg" },
  { key: "payme", label: "PAYME", src: "/assets/images/payments/payme.svg" },
  { key: "rahmat", label: "RAHMAT", src: "/assets/images/payments/rahmat.svg" },
];

export default function PaymentPage() {
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0f0d] lg:grid lg:grid-cols-2">
      <div className="relative hidden min-h-screen lg:block">
        <Image
          src="/assets/images/stadium/stadium.png"
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20" />
        <div className="absolute bottom-0 left-0 p-12 text-white">
          <div className="flex items-center gap-3">
            <span className="font-artico text-3xl font-bold tracking-wide">BUNYODKOR</span>
            <span className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1 text-sm font-bold">
              9.9 <Star size={14} fill="white" />
            </span>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-white/85">Малая кольцевая дорога</p>
        </div>
      </div>

      <div className="flex min-h-screen flex-col bg-white lg:rounded-none">
        <div className="border-b border-gray-100 px-6 py-5 lg:px-12">
          <Link
            href="/booking/step-2"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary"
          >
            <ChevronLeft size={20} /> Назад к брони
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-center px-6 py-10 lg:px-16">
          <h1 className="font-artico text-3xl font-bold uppercase">Оплата аванса</h1>
          <p className="mt-2 text-text-secondary">Выберите удобный способ оплаты в Узбекистане</p>

          <div className="mt-10 text-center lg:text-left">
            <p className="text-sm font-medium text-text-secondary">К оплате</p>
            <p className="font-artico mt-2 text-5xl font-bold text-text-primary">200.000</p>
            <p className="text-sm font-semibold uppercase text-text-secondary">sum</p>
          </div>

          <div className="mt-12 space-y-3">
            <p className="text-sm font-semibold text-text-secondary">Способы оплаты</p>
            {methods.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setDone(true)}
                className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-left transition hover:border-primary/40 hover:bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt="" className="h-12 w-12 object-contain" />
                <span className="font-artico text-lg font-bold tracking-wide">{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/success.svg" alt="" className="mx-auto mb-6 h-20 w-20" />
            <p className="font-artico text-2xl font-bold">Оплата принята</p>
            <Link
              href="/booking/step-1"
              className="mt-8 block w-full rounded-xl bg-primary py-4 font-bold text-white"
            >
              Вернуться к слотам
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
