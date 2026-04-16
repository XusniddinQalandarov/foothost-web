import Image from "next/image";
import Link from "next/link";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { mockStadiums } from "@/lib/mock-data";

export default function StadiumsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-artico text-4xl font-bold uppercase tracking-tight text-text-primary">
            Каталог полей
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-text-secondary">
            Фильтруйте по району и покрытию. Все цены и слоты — в карточке стадиона.
          </p>
        </div>
        <p className="text-sm font-medium text-text-secondary">Найдено: 121 стадиона</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-text-primary">
            <SlidersHorizontal size={18} />
            Фильтры
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Дата</p>
            <select className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm">
              <option>Сегодня</option>
              <option>Завтра</option>
              <option>Выходные</option>
            </select>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Район</p>
            <div className="space-y-2 text-sm">
              {["Чилонзор", "Юнусабад", "Мирабад"].map((z) => (
                <label key={z} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-primary" />
                  {z}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Покрытие</p>
            <div className="space-y-2 text-sm">
              {["Искусственное", "Натуральное"].map((z) => (
                <label key={z} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-primary" />
                  {z}
                </label>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white"
          >
            Применить
          </button>
        </aside>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {mockStadiums.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition hover:shadow-md"
            >
              <Link href="/booking/step-1" className="relative aspect-[5/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width:1024px) 50vw, 25vw"
                />
                <span className="absolute right-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-sm font-bold text-primary shadow">
                  {item.rating}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-artico text-lg font-bold">{item.name}</h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-text-secondary">
                  <MapPin size={14} /> {item.location}
                </p>
                <p className="mt-2 text-xs font-medium text-primary">{item.distance}</p>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm font-bold">{(item.price / 1000).toFixed(0)}k сум</span>
                  <Link
                    href="/booking/step-1"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
