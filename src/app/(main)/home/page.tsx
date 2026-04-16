import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Star, Users } from "lucide-react";
import { FaceitRatingBadge } from "@/components/FaceitRatingBadge";
import { mockStadiums, mockTournaments } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0c0f0d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(69,175,49,0.35),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0f0d] via-[#0c0f0d]/90 to-transparent lg:w-3/5" />
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24 lg:pl-8">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              Ташкент · бронь онлайн
            </p>
            <h1 className="font-artico max-w-xl text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Поле за пару кликов.
              <span className="mt-2 block text-primary">Матч — по расписанию.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
              Найдите стадион рядом с вами, соберите команду и оплатите аванс через Click, Payme или Rahmat —
              без звонков и ожидания.
            </p>

            <form
              className="mt-10 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-2 backdrop-blur-md sm:flex-row sm:items-stretch"
              action="/stadiums"
            >
              <label className="flex flex-1 items-center gap-3 rounded-xl bg-white/95 px-4 py-3 text-text-primary">
                <MapPin className="shrink-0 text-primary" size={20} />
                <input
                  name="q"
                  type="search"
                  placeholder="Район или название поля"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-text-placeholder"
                />
              </label>
              <label className="flex flex-1 items-center gap-3 rounded-xl bg-white/95 px-4 py-3 text-text-primary sm:max-w-[200px]">
                <Clock className="shrink-0 text-primary" size={20} />
                <select
                  name="when"
                  className="w-full cursor-pointer bg-transparent text-sm outline-none"
                  defaultValue="today"
                >
                  <option value="today">Сегодня</option>
                  <option value="tomorrow">Завтра</option>
                  <option value="week">На неделе</option>
                </select>
              </label>
              <button
                type="submit"
                className="font-artico rounded-xl bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#3d9c2b]"
              >
                Найти
              </button>
            </form>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="font-artico text-3xl font-black text-white">120+</p>
                <p className="text-xs font-medium uppercase tracking-wide text-white/50">полей</p>
              </div>
              <div>
                <p className="font-artico text-3xl font-black text-white">4.9</p>
                <p className="text-xs font-medium uppercase tracking-wide text-white/50">средняя оценка</p>
              </div>
              <div>
                <p className="font-artico text-3xl font-black text-primary">24/7</p>
                <p className="text-xs font-medium uppercase tracking-wide text-white/50">бронь</p>
              </div>
            </div>
          </div>

          <div className="relative lg:min-h-[420px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <Image
                src="/assets/images/stadium/stadium.png"
                alt="Стадион"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="font-artico text-2xl font-bold tracking-wide">BUNYODKOR</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-white/85">
                  <MapPin size={16} /> Малая кольцевая дорога
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1 text-sm font-bold">
                    <Star size={14} fill="currentColor" /> 9.9
                  </span>
                  <span className="text-sm text-white/80">от 200 000 сум / слот</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px] rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-black/[0.06] lg:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative shrink-0">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-gray-200/80 shadow-md ring-1 ring-black/[0.04]">
                  <Image
                    src="https://i.imgflip.com/1ur9b0.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                    unoptimized
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 z-10">
                  <FaceitRatingBadge level={10} size={52} />
                </div>
              </div>
              <div>
                <h2 className="font-artico text-2xl font-bold uppercase tracking-wide text-text-primary">
                  Шукур Гайнутдинов
                </h2>
                <p className="mt-1 text-sm font-medium text-text-secondary">
                  Полупрофи · рейтинг растёт
                </p>
                <div className="mt-4 h-2 max-w-md overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[85%] rounded-full bg-primary" />
                </div>
                <div className="mt-1 flex max-w-md justify-between text-xs font-medium text-text-grays80">
                  <span>1000 XP</span>
                  <span>2000 XP</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Link
                href="/stadiums"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#3d9c2b]"
              >
                Найти матч
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary bg-white px-8 py-3.5 text-sm font-bold text-primary transition hover:bg-primary/5"
              >
                Создать лобби
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-artico text-3xl font-bold uppercase tracking-tight text-text-primary">
              Рекомендуемые поля
            </h2>
            <p className="mt-2 max-w-xl text-text-secondary">
              Подборка площадок с высоким рейтингом и удобным временем слотов.
            </p>
          </div>
          <Link
            href="/stadiums"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            Смотреть все
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {mockStadiums.map((s) => (
            <article
              key={s.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Link href="/booking/step-1" className="relative aspect-[16/10] overflow-hidden">
                <Image src={s.image} alt={s.name} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, 33vw" />
                <div className="absolute right-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-sm font-bold text-primary shadow">
                  {s.rating}
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-artico text-xl font-bold">{s.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-text-secondary">
                  <MapPin size={14} /> {s.location}
                </p>
                <p className="mt-2 text-xs font-medium text-primary">{s.distance}</p>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm font-bold text-text-primary">{(s.price / 1000).toFixed(0)}k сум</span>
                  <Link href="/booking/step-1" className="text-sm font-bold text-primary hover:underline">
                    Забронировать
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white py-16">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-artico text-2xl font-bold uppercase">Турниры</h2>
              <Link href="/tournaments" className="text-sm font-bold text-primary">
                Каталог
              </Link>
            </div>
            <ul className="space-y-4">
              {mockTournaments.slice(0, 3).map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tournaments/${t.id}`}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-5 transition hover:border-primary/30 hover:bg-white"
                  >
                    <div>
                      <p className="font-artico font-bold text-primary">{t.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">{t.location}</p>
                      <p className="mt-2 text-xs font-medium text-text-primary">
                        {t.date} · {t.time}
                      </p>
                    </div>
                    <Users className="shrink-0 text-primary/60" size={28} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-artico mb-8 text-2xl font-bold uppercase">Новости</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="#" className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/homepage/news1.svg" alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold leading-snug text-white">
                  Gamemag.ru — релиз футбольного симулятора
                </p>
              </Link>
              <Link href="#" className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/homepage/news2.svg" alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold leading-snug text-white">
                  La Liga — итоги тура
                </p>
              </Link>
            </div>
            <Link
              href="#"
              className="relative mt-4 flex aspect-[21/9] items-end overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 p-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/homepage/bestfield.svg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
              <div className="relative z-10 max-w-md">
                <p className="font-artico text-xl font-bold text-white drop-shadow">Лучшие поля Ташкента</p>
                <p className="mt-1 text-sm text-white/90">Подборка площадок · июнь 2023</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary py-14">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 lg:flex-row lg:text-left lg:px-8">
          <div>
            <h2 className="font-artico text-3xl font-bold uppercase text-white">Готовы выйти на поле?</h2>
            <p className="mt-2 max-w-xl text-white/90">
              Забронируйте слот за минуту — выберите поле, время и способ оплаты.
            </p>
          </div>
          <Link
            href="/booking/step-1"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-10 py-4 font-artico text-lg font-bold uppercase tracking-wide text-primary shadow-lg transition hover:bg-gray-100"
          >
            Начать бронирование
            <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    </>
  );
}
