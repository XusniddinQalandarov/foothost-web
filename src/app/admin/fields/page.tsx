"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Field } from "@/lib/types";
import { Star } from "lucide-react";

export default function AdminFieldsPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.fields
      .all()
      .then(setFields)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Ошибка"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black uppercase tracking-wide">Поля</h1>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Название</th>
                <th className="px-4 py-3">Адрес</th>
                <th className="px-4 py-3">Цена/час</th>
                <th className="px-4 py-3">Рейтинг</th>
                <th className="px-4 py-3">Добавлено</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f) => (
                <tr key={f.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{f.name}</td>
                  <td className="px-4 py-3 text-gray-500">{f.address}</td>
                  <td className="px-4 py-3">{f.pricePerHour.toLocaleString("ru-RU")} сум</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-yellow-400" />
                      {f.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(f.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                </tr>
              ))}
              {fields.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    Нет полей
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
