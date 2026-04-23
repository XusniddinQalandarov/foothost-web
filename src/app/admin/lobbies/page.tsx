"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Lobby } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  active: "bg-green-100 text-green-700",
  full: "bg-blue-100 text-blue-700",
  paid: "bg-purple-100 text-purple-700",
  booked: "bg-indigo-100 text-indigo-700",
  completed: "bg-slate-100 text-slate-600",
  cancelled: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Черновик",
  active: "Активно",
  full: "Полное",
  paid: "Оплачено",
  booked: "Забронировано",
  completed: "Завершено",
  cancelled: "Отменено",
};

export default function AdminLobbiesPage() {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.lobbies
      .all()
      .then(setLobbies)
      .catch((e: unknown) =>
        setError(
          e instanceof Error
            ? e.message
            : "Ошибка — возможно, нет прав администратора",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black uppercase tracking-wide">Лобби</h1>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Игроков</th>
                <th className="px-4 py-3">Сумма</th>
                <th className="px-4 py-3">Истекает</th>
                <th className="px-4 py-3">Создано</th>
              </tr>
            </thead>
            <tbody>
              {lobbies.map((l) => (
                <tr key={l.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">
                    {l.id.slice(0, 8)}…
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[l.status] ?? ""}`}
                    >
                      {STATUS_LABELS[l.status] ?? l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{l.maxPlayers}</td>
                  <td className="px-4 py-3">{l.totalAmount.toLocaleString("ru-RU")} сум</td>
                  <td className="px-4 py-3 text-gray-500">
                    {l.expiresAt ? new Date(l.expiresAt).toLocaleString("ru-RU") : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(l.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                </tr>
              ))}
              {lobbies.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    Нет лобби
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
