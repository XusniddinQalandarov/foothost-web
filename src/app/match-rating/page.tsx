"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useState } from "react";

export default function MatchRatingPage() {
  const [matchRating, setMatchRating] = useState(3);
  const [fieldRating, setFieldRating] = useState(3);
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f6] py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="border-b border-gray-100 bg-gradient-to-r from-primary to-[#2d8a22] px-8 py-10 text-center text-white">
            <h1 className="font-artico text-3xl font-bold uppercase">Оценка матча</h1>
            <p className="mt-2 text-sm text-white/90">Weekend Battle · Chilonzor Stadium</p>
          </div>

          <div className="px-8 py-10 lg:px-12">
            <div className="mb-10 flex items-center justify-center gap-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/profile/chelsea.svg" alt="" className="h-24 w-24" />
              <span className="font-artico text-3xl font-bold text-text-primary">VS</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/profile/MYU.svg" alt="" className="h-24 w-24" />
            </div>

            <RatingBlock title="Качество матча" value={matchRating} onChange={setMatchRating} />
            <RatingBlock title="Состояние поля" value={fieldRating} onChange={setFieldRating} />

            <button
              type="button"
              onClick={() => setDone(true)}
              className="font-artico mt-4 w-full rounded-2xl bg-primary py-4 text-lg font-bold uppercase text-white shadow-lg"
            >
              Отправить отзыв
            </button>
            <Link
              href="/profile"
              className="mt-6 block text-center text-sm font-semibold text-text-secondary hover:text-primary"
            >
              Пропустить
            </Link>
          </div>
        </div>
      </div>

      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/success.svg" alt="" className="mx-auto mb-6 h-20 w-20" />
            <p className="font-artico text-2xl font-bold">Спасибо!</p>
            <p className="mt-2 text-sm text-text-secondary">Ваш отзыв помогает другим игрокам</p>
            <Link href="/home" className="mt-8 block w-full rounded-xl bg-primary py-4 font-bold text-white">
              На главную
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function RatingBlock({
  title,
  value,
  onChange,
}: {
  title: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-artico mb-4 text-xl font-bold text-text-primary">{title}</h2>
      <div className="rounded-2xl bg-gray-50 px-4 py-6">
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => onChange(n)} className="p-1.5 transition hover:scale-110">
              <Star
                size={44}
                className={n <= value ? "fill-primary text-primary" : "text-primary/25"}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
