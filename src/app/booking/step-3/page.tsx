"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookingProgress } from "@/components/BookingProgress";

export default function BookingStep3Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div>
      <BookingProgress current={3} />

      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-artico text-lg font-bold uppercase tracking-wide text-text-primary">
            Контакты
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            Имя в списке на поле и телефон для SMS с подтверждением.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Имя</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-text-primary outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Телефон</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-text-primary outline-none ring-primary focus:ring-2"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="font-artico mt-8 w-full rounded-lg bg-primary py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#3d9c2b]"
          >
            Отправить заявку
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="mt-3 w-full py-2 text-center text-xs font-semibold text-text-secondary hover:text-primary"
          >
            Назад
          </button>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-gray-200/90 bg-gray-50/80 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Заявка</p>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between gap-2 border-b border-gray-200/80 pb-2">
                <dt className="text-text-secondary">Поле</dt>
                <dd className="text-right font-semibold">BUNYODKOR</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-gray-200/80 pb-2">
                <dt className="text-text-secondary">Слот</dt>
                <dd className="text-right font-medium">11.06 · 23:30–00:00</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-gray-200/80 pb-2">
                <dt className="text-text-secondary">Сбор</dt>
                <dd className="text-right font-medium">50%</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-text-secondary">Команд</dt>
                <dd className="text-right font-medium">3</dd>
              </div>
            </dl>
            <div className="mt-4 border-t border-gray-200/80 pt-4">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">К оплате</span>
                <span className="font-artico font-bold text-text-primary">200.000 сум</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-gray-100 bg-white p-8 text-center shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/success.svg" alt="" className="mx-auto mb-4 h-16 w-16" />
            <p className="font-artico text-lg font-bold uppercase">Заявка принята</p>
            <p className="mt-2 text-xs text-text-secondary">Проверьте SMS — слот закреплён.</p>
            <Link href="/home" className="mt-8 block w-full rounded-lg bg-primary py-3 text-sm font-bold text-white">
              На главную
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
