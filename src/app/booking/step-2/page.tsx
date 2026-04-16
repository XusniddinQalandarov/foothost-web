"use client";

import Image from "next/image";
import Link from "next/link";
import { CreditCard } from "lucide-react";
import { BookingProgress } from "@/components/BookingProgress";

export default function BookingStep2Page() {
  return (
    <div>
      <BookingProgress current={2} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="min-w-0 space-y-5">
          {/* Payment + progress — single dense card */}
          <div className="overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm">
            <div className="grid sm:grid-cols-[140px_1fr]">
              <div className="relative h-48 sm:h-auto sm:min-h-[160px]">
                <Image src="/assets/images/stadium/stadium.png" alt="" fill className="object-cover" sizes="140px" />
              </div>
              <div className="flex flex-col justify-center border-t border-gray-100 p-4 sm:border-l sm:border-t-0 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Сбор</p>
                    <p className="font-artico mt-1 text-lg font-bold text-text-primary">BUNYODKOR</p>
                    <p className="text-xs text-text-secondary">Малая кольцевая дорога</p>
                  </div>
                  <Link
                    href="/payment"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-[#3d9c2b]"
                  >
                    <CreditCard size={16} strokeWidth={2} />
                    Оплатить
                  </Link>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[11px] font-medium text-text-secondary">
                    <span>Сбор команд</span>
                    <span>50%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-1/2 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-gray-100 pt-4">
                  <span className="font-artico text-2xl font-bold">200.000 сум</span>
                  <span className="text-xs text-text-secondary">собрано 100.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Teams — one table-like block */}
          <div className="rounded-xl border border-gray-200/90 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <h3 className="font-artico text-xs font-bold uppercase tracking-wider text-text-primary">
                Команды · 3 × 5
              </h3>
              <span className="text-[10px] font-medium text-text-secondary">Нажмите + чтобы добавить</span>
            </div>
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((team) => (
                <div key={team} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="w-28 shrink-0 text-xs font-bold text-text-primary">Команда {team}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-gray-300 text-sm text-gray-400 hover:border-primary hover:text-primary"
                      >
                        +
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-gray-200/90 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Сводка</p>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between gap-2 border-b border-gray-100 pb-2">
                <dt className="text-text-secondary">Слот</dt>
                <dd className="text-right font-medium">Сегодня 09:00</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-gray-100 pb-2">
                <dt className="text-text-secondary">Сумма</dt>
                <dd className="text-right font-bold text-primary">200 000</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-text-secondary">Команд</dt>
                <dd className="text-right font-medium">3</dd>
              </div>
            </dl>
            <Link
              href="/booking/step-3"
              className="font-artico mt-4 block w-full rounded-lg bg-primary py-3 text-center text-xs font-bold uppercase tracking-wide text-white hover:bg-[#3d9c2b]"
            >
              Далее
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
