import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-[#f8f9fa] py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft size={18} /> Профиль
          </Link>
          <h1 className="font-artico mt-6 text-4xl font-black uppercase leading-tight text-text-primary">
            О FootHost
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Мы соединяем любителей футбола с полями и турнирами — прозрачные цены, онлайн-оплата и честный
            рейтинг площадок.
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="max-w-none text-text-primary">
          <h2 className="font-artico text-2xl font-bold">Миссия</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            Сделать любительский футбол таким же удобным, как бронирование отеля: выбрать время, оплатить и
            прийти на готовое поле.
          </p>
          <h2 className="font-artico mt-12 text-2xl font-bold">Для кого</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-text-secondary">
            <li>Команды и лобби, которые ищут слоты без звонков администратору</li>
            <li>Организаторы турниров и мини-лиг</li>
            <li>Владельцы полей, которым нужен стабильный поток броней</li>
          </ul>
          <h2 className="font-artico mt-12 text-2xl font-bold">Контакты</h2>
          <p className="mt-4 text-text-secondary">
            Ташкент ·{" "}
            <a href="mailto:support@foothost.app" className="font-semibold text-primary hover:underline">
              support@foothost.app
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
