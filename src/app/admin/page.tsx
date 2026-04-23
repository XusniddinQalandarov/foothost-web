"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { Field, Lobby, News, User } from "@/lib/types";

interface AdminOverviewData {
  users: User[];
  news: News[];
  fields: Field[];
  lobbies: Lobby[];
}

export default function AdminRoot() {
  const [data, setData] = useState<AdminOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [users, news, fields, lobbies] = await Promise.all([
          api.users.all(),
          api.news.all(),
          api.fields.all(),
          api.lobbies.all(),
        ]);
        setData({ users, news, fields, lobbies });
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Не удалось загрузить мониторинг");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = useMemo(() => {
    if (!data) return null;
    const publishedNews = data.news.filter((item) => item.published).length;
    const activeLobbies = data.lobbies.filter((lobby) =>
      ["active", "full", "paid", "booked"].includes(lobby.status),
    ).length;
    return {
      users: data.users.length,
      news: data.news.length,
      publishedNews,
      fields: data.fields.length,
      lobbies: data.lobbies.length,
      activeLobbies,
    };
  }, [data]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black uppercase tracking-wide">Мониторинг</h1>
        <p className="mt-1 text-sm text-gray-500">
          Быстрый обзор по пользователям, новостям, стадионам и лобби.
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : stats && data ? (
        <>
          <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Пользователи" value={stats.users} />
            <StatCard label="Новости" value={stats.news} subtitle={`Опубликовано: ${stats.publishedNews}`} />
            <StatCard label="Стадионы" value={stats.fields} />
            <StatCard label="Лобби всего" value={stats.lobbies} />
            <StatCard label="Лобби активные" value={stats.activeLobbies} />
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-base font-semibold">Последние новости</h2>
            {data.news.length === 0 ? (
              <p className="text-sm text-gray-500">Новостей пока нет. Добавьте первую в разделе "Новости".</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {data.news.slice(0, 5).map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2">
                    <span className="truncate font-medium">{item.title}</span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        item.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.published ? "Опубликовано" : "Черновик"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

function StatCard({ label, value, subtitle }: { label: string; value: number; subtitle?: string }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-[#0c0f0d]">{value}</p>
      {subtitle ? <p className="mt-1 text-xs text-gray-500">{subtitle}</p> : null}
    </div>
  );
}
