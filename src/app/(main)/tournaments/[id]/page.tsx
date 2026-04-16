import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { mockTournament } from "@/lib/mock-data";

type Props = { params: Promise<{ id: string }> };

export default async function TournamentDetailsPage({ params }: Props) {
  const { id } = await params;
  const t = { ...mockTournament, id: Number(id) || mockTournament.id };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/tournaments"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft size={18} /> К списку турниров
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
            <Image
              src="/assets/images/stadium/stadium.png"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 55vw"
              priority
            />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase text-text-secondary">Покрытие</p>
              <p className="mt-2 font-semibold">{t.surface}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase text-text-secondary">Тип площадки</p>
              <p className="mt-2 font-semibold">{t.pitchType}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase text-text-secondary">Размеры</p>
              <p className="mt-2 font-semibold">{t.dimensions}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase text-text-secondary">График</p>
              <p className="mt-2 font-semibold">{t.workTime}</p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-artico text-4xl font-black uppercase leading-tight text-primary">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">{t.format}</p>
          <p className="mt-6 text-base font-semibold">{t.cost}</p>

          <div className="mt-8 space-y-3 rounded-2xl bg-gray-50 p-6">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="text-primary" size={20} />
              <span>
                {t.location} · {t.address}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="text-primary" size={20} />
              <span>
                {t.date} · {t.time} · {t.distance}
              </span>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-8 text-center">
            <p className="text-sm font-medium text-text-secondary">Финал</p>
            <p className="font-artico mt-2 text-lg font-bold text-text-primary">{t.team1}</p>
            <p className="font-artico my-3 text-2xl text-primary">VS</p>
            <p className="font-artico text-lg font-bold text-text-primary">{t.team2}</p>
          </div>

          <button
            type="button"
            className="font-artico mt-10 w-full rounded-2xl bg-primary py-4 text-lg font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#3d9c2b]"
          >
            Подать заявку
          </button>
        </div>
      </div>
    </div>
  );
}
