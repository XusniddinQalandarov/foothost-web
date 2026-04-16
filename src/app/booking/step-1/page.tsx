"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BookingProgress } from "@/components/BookingProgress";
import { Check, MapPin, Star, X } from "lucide-react";

const mockDates = [
  { label: "Сегодня", value: "today", day: "Ср" },
  { label: "Завтра", value: "tomorrow", day: "Чт" },
  { label: "11.06", value: "11.06", day: "" },
];

const slots = [
  { time: "07:00 — 09:00", available: false },
  { time: "09:00 — 11:00", available: true },
  { time: "11:00 — 13:00", available: false },
  { time: "18:00 — 20:00", available: true },
];

const amenities = [
  { src: "/assets/images/booking/parking.svg", name: "Парковка", ok: false },
  { src: "/assets/images/booking/shower.svg", name: "Душ", ok: true },
  { src: "/assets/images/booking/lighted.svg", name: "Свет", ok: true },
  { src: "/assets/images/booking/seats.svg", name: "Трибуна", ok: true },
];

export default function BookingStep1Page() {
  const [date, setDate] = useState("today");
  const [slot, setSlot] = useState<string | null>("09:00 — 11:00");
  const [modalOpen, setModalOpen] = useState(false);

  const dateLabel = useMemo(
    () => mockDates.find((d) => d.value === date)?.label ?? date,
    [date],
  );

  return (
    <div>
      <BookingProgress current={1} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        {/* Main column */}
        <div className="min-w-0 space-y-5">
          <div className="overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm">
            <div className="relative aspect-[2.2/1] max-h-[220px] w-full sm:aspect-[2.6/1] sm:max-h-[260px]">
              <Image
                src="/assets/images/stadium/stadium.png"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 65vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-3 p-4 text-white">
                <div>
                  <h2 className="font-artico text-xl font-bold tracking-wide sm:text-2xl">BUNYODKOR</h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/85">
                    <MapPin size={14} /> Малая кольцевая · 4.9 км
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-1 ring-1 ring-white/20">
                    <Star size={12} className="fill-white" /> 9.9
                  </span>
                  <span className="rounded-md bg-primary px-2 py-1">200 000 сум</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 px-4 py-4 sm:px-5">
              <h3 className="font-artico text-sm font-bold uppercase tracking-wide text-text-primary">
                Дата и время
              </h3>
              <p className="mt-1 text-xs leading-snug text-text-secondary">
                Слот удерживается после подтверждения на шаге 3. Серые интервалы заняты.
              </p>

              <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Дата</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {mockDates.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDate(d.value)}
                    className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition sm:px-3.5 ${
                      date === d.value
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 bg-gray-50 text-text-primary hover:border-gray-300"
                    }`}
                  >
                    <span className="block">{d.label}</span>
                    <span className={`block text-[10px] ${date === d.value ? "text-white/85" : "text-text-secondary"}`}>
                      {d.day}
                    </span>
                  </button>
                ))}
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-gray-400">Время</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {slots.map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    disabled={!s.available}
                    onClick={() => s.available && setSlot(s.time)}
                    className={`rounded-lg border px-2 py-2.5 text-center text-xs font-semibold ${
                      !s.available
                        ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 line-through"
                        : slot === s.time
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 bg-white text-text-primary hover:border-primary/40"
                    }`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-gray-400">Инфраструктура</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {amenities.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50/80 px-2.5 py-1.5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.src} width={22} height={22} alt="" />
                    <span className="text-xs font-medium text-text-primary">{a.name}</span>
                    {a.ok ? (
                      <Check size={14} className="shrink-0 text-primary" strokeWidth={2.5} />
                    ) : (
                      <X size={14} className="shrink-0 text-gray-300" strokeWidth={2} />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="font-artico flex-1 rounded-lg border border-gray-200 bg-white py-3 text-xs font-bold uppercase tracking-wide text-text-primary hover:border-primary/35"
                >
                  Параметры матча
                </button>
                <Link
                  href="/booking/step-2"
                  className="font-artico flex-1 rounded-lg bg-primary py-3 text-center text-xs font-bold uppercase tracking-wide text-white hover:bg-[#3d9c2b]"
                >
                  Далее
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky summary — dense facts */}
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-gray-200/90 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Заявка</p>
            <dl className="mt-3 space-y-2.5 text-xs">
              <div className="flex justify-between gap-3 border-b border-gray-100 pb-2">
                <dt className="text-text-secondary">Поле</dt>
                <dd className="text-right font-semibold text-text-primary">BUNYODKOR</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-gray-100 pb-2">
                <dt className="text-text-secondary">Покрытие</dt>
                <dd className="text-right font-medium text-text-primary">Искусств.</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-gray-100 pb-2">
                <dt className="text-text-secondary">Формат</dt>
                <dd className="text-right font-medium text-text-primary">7×7</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-gray-100 pb-2">
                <dt className="text-text-secondary">Цена</dt>
                <dd className="text-right font-bold text-primary">200 000 сум</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-gray-100 pb-2">
                <dt className="text-text-secondary">Дата</dt>
                <dd className="text-right font-medium text-text-primary">{dateLabel}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-text-secondary">Слот</dt>
                <dd className="text-right font-semibold text-text-primary">{slot ?? "—"}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]">
          <div className="w-full max-w-sm rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-artico text-sm font-bold uppercase tracking-wide">Параметры матча</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-xl leading-none text-gray-400 hover:text-text-primary"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-secondary">
              В приложении здесь задаётся тип матча и состав. На сайте перейдите к шагу «Состав».
            </p>
            <Link
              href="/booking/step-2"
              className="mt-8 block w-full rounded-lg bg-primary py-3 text-center text-xs font-bold text-white"
              onClick={() => setModalOpen(false)}
            >
              К командам
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
