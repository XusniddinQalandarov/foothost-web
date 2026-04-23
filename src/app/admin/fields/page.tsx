"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { CreateFieldDto, Field } from "@/lib/types";
import { Plus, Star, X } from "lucide-react";

const EMPTY_FIELD: CreateFieldDto = {
  name: "",
  address: "",
  lat: 0,
  lng: 0,
  pricePerHour: 0,
  slotDuration: 60,
  description: "",
  pitchType: "",
  dimensions: "",
  workTime: "",
  amenities: {
    parking: false,
    locker: false,
    shower: false,
    tribune: false,
    lighting: false,
  },
};

export default function AdminFieldsPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<CreateFieldDto>(EMPTY_FIELD);
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      setFields(await api.fields.all());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createField() {
    if (!form.name.trim() || !form.address.trim() || form.pricePerHour <= 0) {
      setError("Заполните название, адрес и цену больше 0");
      return;
    }

    setSaving(true);
    setError("");
    api.fields
      .create({
        ...form,
        name: form.name.trim(),
        address: form.address.trim(),
        lat: form.lat || undefined,
        lng: form.lng || undefined,
        description: form.description?.trim() || undefined,
        pitchType: form.pitchType?.trim() || undefined,
        dimensions: form.dimensions?.trim() || undefined,
        workTime: form.workTime?.trim() || undefined,
      })
      .then(async (created) => {
        for (const file of files) {
          await api.fields.uploadPhoto(created.id, file);
        }
        setCreating(false);
        setForm(EMPTY_FIELD);
        setFiles([]);
        await load();
      })
      .catch((e: unknown) =>
        setError(
          e instanceof Error
            ? e.message
            : "Не удалось добавить стадион. Проверьте права field_owner/admin.",
        ),
      )
      .finally(() => setSaving(false));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black uppercase tracking-wide">Стадионы</h1>
        <button
          onClick={() => {
            setCreating((prev) => !prev);
            setError("");
          }}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#3d9c2b]"
        >
          {creating ? <X size={16} /> : <Plus size={16} />}
          {creating ? "Закрыть" : "Добавить стадион"}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {creating && (
        <div className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Новый стадион</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Название"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
            <input
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Адрес"
              value={form.address}
              onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
            />
            <input
              type="number"
              step="0.000001"
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Широта (lat)"
              value={form.lat ?? 0}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  lat: Number(e.target.value || 0),
                }))
              }
            />
            <input
              type="number"
              step="0.000001"
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Долгота (lng)"
              value={form.lng ?? 0}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  lng: Number(e.target.value || 0),
                }))
              }
            />
            <input
              type="number"
              min={0}
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Цена за час"
              value={form.pricePerHour}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  pricePerHour: Number(e.target.value || 0),
                }))
              }
            />
            <select
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              value={form.slotDuration}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slotDuration: Number(e.target.value) }))
              }
            >
              <option value={60}>Слот 60 минут</option>
              <option value={30}>Слот 30 минут</option>
            </select>
            <input
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Тип площадки (например: Открытая)"
              value={form.pitchType ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, pitchType: e.target.value }))}
            />
            <input
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Размер (например: 20x40)"
              value={form.dimensions ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, dimensions: e.target.value }))}
            />
            <input
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary md:col-span-2"
              placeholder="Время работы (например: 08:00 - 03:00)"
              value={form.workTime ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, workTime: e.target.value }))}
            />
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-gray-700">Удобства</p>
            <div className="grid gap-2 md:grid-cols-3">
              {[
                ["parking", "Парковка"],
                ["locker", "Раздевалки"],
                ["shower", "Душ"],
                ["tribune", "Трибуны"],
                ["lighting", "Освещение"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={Boolean(form.amenities?.[key])}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        amenities: {
                          ...(prev.amenities ?? {}),
                          [key]: e.target.checked,
                        },
                      }))
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <textarea
            rows={3}
            className="mt-3 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
            placeholder="Описание (необязательно)"
            value={form.description ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
          <div className="mt-3">
            <p className="mb-1 text-xs text-gray-500">Фото стадиона (можно выбрать несколько)</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="text-sm"
            />
            {files.length > 0 ? (
              <p className="mt-1 text-xs text-gray-500">Выбрано: {files.length}</p>
            ) : null}
          </div>
          <div className="mt-4">
            <button
              onClick={createField}
              disabled={saving}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-[#3d9c2b] disabled:opacity-60"
            >
              {saving ? "Добавление..." : "Сохранить"}
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
                <th className="px-4 py-3">Название</th>
                <th className="px-4 py-3">Адрес</th>
                <th className="px-4 py-3">Тип</th>
                <th className="px-4 py-3">Цена/час</th>
                <th className="px-4 py-3">Рейтинг</th>
                <th className="px-4 py-3">Фото</th>
                <th className="px-4 py-3">Добавлено</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f) => (
                <tr key={f.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{f.name}</td>
                  <td className="px-4 py-3 text-gray-500">{f.address}</td>
                  <td className="px-4 py-3 text-gray-500">{f.pitchType ?? "—"}</td>
                  <td className="px-4 py-3">{f.pricePerHour.toLocaleString("ru-RU")} сум</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-yellow-400" />
                      {f.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{f.photos?.length ?? 0}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(f.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                </tr>
              ))}
              {fields.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    Нет стадионов. Добавьте первый стадион кнопкой выше.
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
