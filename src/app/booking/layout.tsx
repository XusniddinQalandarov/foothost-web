import Link from "next/link";

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e8eae6]">
      <header className="border-b border-black/[0.06] bg-[#fafaf9]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <Link href="/home" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/logo.svg" alt="FootHost" width={112} height={40} />
            <span className="hidden h-6 w-px bg-gray-200 sm:block" aria-hidden />
            <span className="hidden font-artico text-xs font-bold uppercase tracking-[0.2em] text-gray-400 sm:inline">
              Бронирование
            </span>
          </Link>
          <div className="flex items-center gap-4 text-sm font-semibold sm:gap-8">
            <Link href="/stadiums" className="text-text-secondary transition hover:text-primary">
              Каталог
            </Link>
            <Link
              href="/home"
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-text-primary shadow-sm transition hover:border-primary/30"
            >
              На главную
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:py-14">{children}</div>
    </div>
  );
}
