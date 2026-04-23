"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { News, CreateNewsDto } from "@/lib/types";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

const EMPTY: CreateNewsDto = { title: "", body: "", published: true };

export default function AdminNewsPage() {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<News | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<CreateNewsDto>(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      setItems(await api.news.all());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setForm(EMPTY);
    setImageFile(null);
    setEditing(null);
    setCreating(true);
  }

  function startEdit(item: News) {
    setForm({ title: item.title, body: item.body, published: item.published });
    setImageFile(null);
    setEditing(item);
    setCreating(false);
  }

  function cancel() {
    setCreating(false);
    setEditing(null);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      if (creating) {
        const created = await api.news.create(form);
        if (imageFile) await api.news.uploadImage(created.id, imageFile);
      } else if (editing) {
        await api.news.update(editing.id, form);
        if (imageFile) await api.news.uploadImage(editing.id, imageFile);
      }
      cancel();
      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Удалить новость?")) return;
    await api.news.remove(id).catch(() => {});
    await load();
  }

  const showForm = creating || editing !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black uppercase tracking-wide">Новости</h1>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#3d9c2b]"
        >
          <Plus size={16} /> Создать
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {showForm && (
        <div className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">
            {creating ? "Новая новость" : "Редактировать"}
          </h2>
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Заголовок"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <textarea
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Текст"
              rows={4}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published ?? true}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="accent-primary"
              />
              Опубликовано
            </label>
            <div>
              <p className="mb-1 text-xs text-gray-500">Изображение (необязательно)</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="text-sm"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-[#3d9c2b] disabled:opacity-60"
            >
              <Check size={16} /> {saving ? "Сохранение..." : "Сохранить"}
            </button>
            <button
              onClick={cancel}
              className="flex items-center gap-2 rounded-xl border px-5 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              <X size={16} /> Отмена
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Заголовок</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        item.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.published ? "Опубликовано" : "Черновик"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => startEdit(item)}
                      className="mr-3 text-gray-400 hover:text-primary"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    Нет новостей
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
