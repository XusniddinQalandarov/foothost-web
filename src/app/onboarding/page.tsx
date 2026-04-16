import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <div className="relative flex min-h-[50vh] flex-col justify-between overflow-hidden bg-[#0c0f0d] px-8 py-12 text-white lg:min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(69,175,49,0.4),transparent_50%)]" />
        <div className="pointer-events-none absolute -right-20 top-20 opacity-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/onboardingPage/bgBall.svg" alt="" className="w-[min(90vw,520px)]" />
        </div>
        <div className="relative z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/logo_white.svg" alt="FootHost" width={120} height={48} />
        </div>
        <div className="relative z-10 max-w-lg">
          <h1 className="font-artico text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-[3rem]">
            Футбол для всех.
            <span className="mt-2 block text-primary">Найди поле — играй.</span>
          </h1>
          <p className="mt-6 text-lg text-white/75">
            Бронирование, команды и турниры в одном сервисе для любителей футбола в Ташкенте.
          </p>
        </div>
        <p className="relative z-10 text-xs text-white/40">© FootHost</p>
      </div>

      <div className="flex flex-col justify-center px-8 py-16 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Старт</p>
          <h2 className="font-artico mt-2 text-3xl font-bold uppercase text-text-primary">
            Выберите действие
          </h2>
          <p className="mt-3 text-text-secondary">
            Войдите в существующий аккаунт или создайте новый — затем подтвердите номер телефона.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 font-artico text-lg font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#3d9c2b]"
            >
              Войти
            </Link>
            <Link
              href="/register"
              className="flex w-full items-center justify-center rounded-2xl border-2 border-primary bg-white py-4 font-artico text-lg font-bold uppercase tracking-wide text-primary transition hover:bg-primary/5"
            >
              Создать аккаунт
            </Link>
            <Link
              href="/home"
              className="text-center text-sm font-medium text-text-secondary hover:text-primary"
            >
              Перейти на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
