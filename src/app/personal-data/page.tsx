import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PersonalDataPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft size={18} /> Назад в профиль
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50/80 px-8 py-6">
            <h1 className="font-artico text-3xl font-bold uppercase">Личные данные</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Эти данные используются для бронирований и турниров
            </p>
          </div>
          <div className="grid gap-0 divide-y divide-gray-100 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="p-8">
              <Field label="Имя" value="Шукур" />
              <Field label="Фамилия" value="Гайнутдинов" />
              <Field label="Телефон" value="+998 ** *** ** **" />
            </div>
            <div className="p-8">
              <Field label="Email" value="—" />
              <Field label="Город" value="Ташкент" />
              <button
                type="button"
                className="mt-8 w-full rounded-xl border-2 border-primary py-3 font-bold text-primary transition hover:bg-primary/5"
              >
                Запросить изменение
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="text-xs font-bold uppercase tracking-wide text-text-secondary">{label}</p>
      <p className="mt-2 text-lg font-semibold text-text-primary">{value}</p>
    </div>
  );
}
