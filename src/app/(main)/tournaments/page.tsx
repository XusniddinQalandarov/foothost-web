import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { mockTournaments } from "@/lib/mock-data";

export default function TournamentsPage() {
  return (
    <div>
      <section className="border-b border-gray-200 bg-gradient-to-br from-[#0c0f0d] to-[#1a2e18] py-16 text-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Сезон 2025</p>
          <h1 className="font-artico mt-3 max-w-3xl text-4xl font-black uppercase leading-tight sm:text-5xl">
            Турниры и лиги
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            Формат 7×7, групповой этап и плей-офф. Регистрируйте команду и следите за сеткой прямо здесь.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {mockTournaments.map((t) => (
            <Link
              key={t.id}
              href={`/tournaments/${t.id}`}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-artico text-xl font-bold text-primary">{t.title}</p>
                  <p className="mt-2 text-sm text-text-secondary">{t.format}</p>
                </div>
                <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {t.participants}
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-text-primary">{t.cost}</p>
              <div className="mt-6 flex flex-wrap gap-4 border-t border-gray-100 pt-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-primary" /> {t.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-primary" /> {t.date} {t.time}
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:underline">
                <Users size={18} />
                Карточка турнира
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
