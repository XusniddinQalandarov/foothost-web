import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#141414] text-gray-400">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/logo_white.svg"
              alt="FootHost"
              width={120}
              height={48}
              className="mb-4 h-10 w-auto opacity-90"
            />
            <p className="max-w-xs text-sm leading-relaxed">
              Бронирование футбольных полей и турниры в одном месте. Играйте чаще — мы берём на себя
              организацию.
            </p>
          </div>
          <div>
            <p className="font-artico mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Разделы
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/home" className="hover:text-primary">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/stadiums" className="hover:text-primary">
                  Поля и стадионы
                </Link>
              </li>
              <li>
                <Link href="/tournaments" className="hover:text-primary">
                  Турниры
                </Link>
              </li>
              <li>
                <Link href="/booking/step-1" className="hover:text-primary">
                  Бронирование
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-primary">
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-artico mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Компания
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="hover:text-primary">
                  Для новых пользователей
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-artico mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Контакты
            </p>
            <p className="text-sm">Ташкент, Узбекистан</p>
            <p className="mt-2 text-sm">support@foothost.app</p>
            <p className="mt-4 text-xs text-gray-500">© {new Date().getFullYear()} FootHost</p>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-primary via-[#2d8a22] to-primary" aria-hidden />
    </footer>
  );
}
