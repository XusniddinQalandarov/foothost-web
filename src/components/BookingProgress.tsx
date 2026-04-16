import Link from "next/link";

const STEPS = [
  { id: 1 as const, label: "Слот", href: "/booking/step-1" },
  { id: 2 as const, label: "Состав", href: "/booking/step-2" },
  { id: 3 as const, label: "Итог", href: "/booking/step-3" },
];

/**
 * Compact checkout-style progress: thin bar + step labels (no large step cards).
 */
export function BookingProgress({ current }: { current: 1 | 2 | 3 }) {
  const fillPct = (current / 3) * 100;

  return (
    <nav className="mb-6 sm:mb-8" aria-label="Прогресс бронирования">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          Шаг <span className="tabular-nums text-text-primary">{current}</span>
          <span className="text-gray-400"> / 3</span>
        </p>
        <p className="text-xs font-medium text-text-secondary">BUNYODKOR · Малая кольцевая</p>
      </div>

      <div
        className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={current}
        aria-label={`Шаг ${current} из 3`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${fillPct}%` }}
        />
      </div>

      <ol className="mt-3 flex list-none justify-between gap-1 p-0">
        {STEPS.map((s) => {
          const done = s.id < current;
          const active = s.id === current;
          return (
            <li key={s.id} className="min-w-0 flex-1 text-center">
              <Link
                href={s.href}
                className={`block truncate text-[10px] font-bold uppercase tracking-[0.14em] transition sm:text-[11px] ${
                  active
                    ? "text-primary"
                    : done
                      ? "text-primary/80 hover:text-primary"
                      : "text-gray-400 hover:text-gray-500"
                }`}
              >
                {active ? <span className="border-b border-primary pb-px">{s.label}</span> : s.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
