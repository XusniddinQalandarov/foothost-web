"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Trophy } from "lucide-react";
import { FaceitRatingBadge } from "@/components/FaceitRatingBadge";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";

const ROLE_LABELS: Record<string, string> = {
  player: "Игрок",
  field_owner: "Владелец поля",
  both: "Игрок и владелец",
  admin: "Администратор",
};

export default function ProfilePage() {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    api
      .me()
      .then((user) => {
        if (!mounted) return;
        setMe(user);
      })
      .catch(() => {
        if (!mounted) return;
        setMe(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const fullName = useMemo(() => {
    if (!me) return "Профиль";
    return [me.firstName, me.lastName].filter(Boolean).join(" ");
  }, [me]);

  const roleLabel = me ? ROLE_LABELS[me.role] ?? "Пользователь" : "Пользователь";
  const locationLabel = me?.position?.trim() || "Локация не указана";
  const avatarSrc = me?.avatarUrl?.trim() || "/assets/images/profile/stadium.svg";

  const stats = [
    { v: me ? String(me.rating) : "-", l: "Рейтинг" },
    { v: me ? String(me.wins) : "-", l: "Победы" },
    { v: me ? String(me.tournamentCount) : "-", l: "Турниры" },
  ];

  return (
    <div>
      {/* Hero band — single accent color, no rainbow */}
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-[#0a0c0b]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_20%_0%,rgba(69,175,49,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
            <div className="relative shrink-0">
              <div className="relative h-36 w-36 overflow-hidden rounded-3xl border border-white/10 shadow-2xl ring-1 ring-white/10 sm:h-40 sm:w-40">
                <Image
                  src={avatarSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="160px"
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-3 -right-3 z-10">
                <FaceitRatingBadge level={10} size={64} />
              </div>
            </div>
            <div className="pb-1 text-white">
              <p className="font-artico text-[10px] font-bold uppercase tracking-[0.35em] text-white/45">
                {roleLabel}
              </p>
              <h1 className="font-artico mt-2 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                {fullName}
              </h1>
              <p className="mt-2 text-sm font-medium text-white/55">{locationLabel}</p>
            </div>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3 border-t border-white/10 pt-8 lg:mt-0 lg:border-t-0 lg:pt-0">
            {stats.map((x) => (
              <div
                key={x.l}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-4 text-center backdrop-blur-sm"
              >
                <p className="font-artico text-xl font-bold text-white sm:text-2xl">{x.v}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  {x.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {loading && (
        <div className="mx-auto mt-6 max-w-[1400px] px-4 text-sm text-text-secondary sm:px-6 lg:px-8">
          Загружаем профиль...
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <div className="overflow-hidden rounded-3xl border border-gray-200/90 bg-white shadow-[0_2px_40px_-24px_rgba(0,0,0,0.2)]">
                <div className="border-b border-gray-100 px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Прогресс сезона</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[85%] rounded-full bg-primary" />
                  </div>
                  <p className="mt-2 text-xs font-medium text-text-secondary">1000 / 2000 XP</p>
                </div>
                <div className="px-2 py-2">
                  <Link
                    href="/personal-data"
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-text-primary transition hover:bg-gray-50"
                  >
                    Личные данные
                    <ChevronRight size={18} className="text-gray-300" />
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-text-primary transition hover:bg-gray-50"
                  >
                    О проекте
                    <ChevronRight size={18} className="text-gray-300" />
                  </Link>
                </div>
              </div>
              <p className="px-1 text-xs leading-relaxed text-text-secondary">
                Уровень на кольце рассчитывается как в соревновательных лигах: чем выше дуга, тем ближе к
                десятке.
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-gray-200">
              <span className="mb-[-1px] border-b-2 border-primary px-1 pb-3 text-sm font-bold text-text-primary">
                Предстоящие матчи
              </span>
              <span className="mb-[-1px] px-4 pb-3 text-sm font-medium text-text-secondary">Команды</span>
            </div>

            <ul className="space-y-5">
              {[1, 2].map((i) => (
                <li key={i}>
                  <div className="group overflow-hidden rounded-3xl border border-gray-200/90 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-md">
                    <div className="grid md:grid-cols-[minmax(0,280px)_1fr]">
                      <div className="relative min-h-[200px] md:min-h-[220px]">
                        <Image
                          src="/assets/images/stadium/stadium.png"
                          alt=""
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.02]"
                          sizes="280px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                      </div>
                      <div className="flex flex-col justify-center p-7 md:p-8">
                        <div className="flex items-center gap-2 text-primary">
                          <Trophy size={18} strokeWidth={2} />
                          <span className="font-artico text-lg font-bold tracking-wide">Weekend Battle</span>
                        </div>
                        <p className="mt-2 text-sm text-text-secondary">Chilonzor Stadium</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                          24.12.2025 · 18:00
                        </p>
                        <p className="mt-6 text-sm font-medium text-text-primary">
                          Взнос: 200 000 с команды · слоты 12/10
                        </p>
                        <Link
                          href="/match-rating"
                          className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-primary/30 bg-primary/[0.06] px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/10"
                        >
                          Оценить матч
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
