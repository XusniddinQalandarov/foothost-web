"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { CreateFieldDto, Field } from "@/lib/types";
import { Clock, MapPin, Pencil, Plus, Star, Trash2, X } from "lucide-react";

type FieldFormState = Omit<CreateFieldDto, "pricePerHour"> & { pricePerHour?: number };

const EMPTY_FIELD: FieldFormState = {
  name: "",
  address: "",
  pricePerHour: undefined,
  slotDuration: 60,
  description: "",
  pitchType: "Открытая",
  dimensions: "",
  workTime: "08:00 - 23:00",
  mapUrl: "",
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FieldFormState>(EMPTY_FIELD);
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("23:00");

  const TIME_OPTIONS = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
    "00:00", "01:00", "02:00", "03:00",
  ];

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

  useEffect(() => {
    return () => {
      filePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [filePreviews]);

  async function createField() {
    if (!form.name.trim() || !form.address.trim() || !form.pricePerHour || form.pricePerHour <= 0) {
      setError("Заполните название, адрес и цену больше 0");
      return;
    }
    if (form.mapUrl && !/google\.[^/]+\/maps|maps\.yandex|yandex\.[^/]+\/maps/i.test(form.mapUrl)) {
      setError("Ссылка на карту должна быть из Google Maps или Yandex Maps");
      return;
    }

    setSaving(true);
    setError("");
    const payload: CreateFieldDto = {
      ...form,
      pricePerHour: form.pricePerHour as number,
      name: form.name.trim(),
      address: form.address.trim(),
      description: form.description?.trim() || undefined,
      pitchType: form.pitchType?.trim() || undefined,
      dimensions: form.dimensions?.trim() || undefined,
      workTime: `${openTime} - ${closeTime}`,
      mapUrl: form.mapUrl?.trim() || undefined,
    };
    const request = editingId
      ? api.fields.update(editingId, payload)
      : api.fields.create(payload);

    request
      .then(async (result) => {
        if (files.length > 0) {
          for (const file of files) {
            await api.fields.uploadPhoto(result.id, file);
          }
        }
        setCreating(false);
        setEditingId(null);
        setForm(EMPTY_FIELD);
        setOpenTime("08:00");
        setCloseTime("23:00");
        setFiles([]);
        filePreviews.forEach((url) => URL.revokeObjectURL(url));
        setFilePreviews([]);
        await load();
      })
      .catch((e: unknown) =>
        setError(
          e instanceof Error
            ? e.message
            : "Не удалось сохранить стадион. Проверьте права field_owner/admin.",
        ),
      )
      .finally(() => setSaving(false));
  }

  function startEdit(field: Field) {
    const parsed = (field.workTime ?? "").split("-").map((v) => v.trim());
    setEditingId(field.id);
    setForm({
      name: field.name,
      address: field.address,
      pricePerHour: field.pricePerHour,
      slotDuration: field.slotDuration,
      description: field.description ?? "",
      pitchType: field.pitchType ?? "Открытая",
      dimensions: field.dimensions ?? "",
      workTime: field.workTime ?? "",
      mapUrl: field.mapUrl ?? "",
      amenities: field.amenities ?? {},
    });
    setOpenTime(parsed[0] || "08:00");
    setCloseTime(parsed[1] || "23:00");
    setFiles([]);
    setCreating(true);
    setError("");
  }

  async function removeField(id: string) {
    if (!confirm("Удалить стадион?")) return;
    setError("");
    try {
      await api.fields.remove(id);
      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Не удалось удалить стадион");
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black uppercase tracking-wide">Стадионы</h1>
        <button
          onClick={() => {
            setCreating((prev) => !prev);
            if (creating) setEditingId(null);
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
          <h2 className="mb-4 text-lg font-semibold">
            {editingId ? "Редактировать стадион" : "Новый стадион"}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-gray-600">Название</span>
              <input
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
                placeholder="Например: BUNYODKOR"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 flex items-center gap-1 text-gray-600">
                <MapPin size={14} /> Адрес
              </span>
              <input
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
                placeholder="Например: Малая кольцевая дорога"
                value={form.address}
                onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
              />
            </label>
            <label className="text-sm md:col-span-2">
              <span className="mb-1 flex items-center gap-1 text-gray-600">
                <MapPin size={14} /> Ссылка на карту (Google/Yandex)
              </span>
              <input
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
                placeholder="https://maps.google.com/... или https://yandex.uz/maps/..."
                value={form.mapUrl ?? ""}
                onChange={(e) => setForm((prev) => ({ ...prev, mapUrl: e.target.value }))}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 flex items-center gap-1 text-gray-600">
                <Star size={14} /> Цена за час (сум)
              </span>
              <input
                type="number"
                min={0}
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
                placeholder="Например: 200000"
                value={form.pricePerHour ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    pricePerHour: e.target.value === "" ? undefined : Number(e.target.value),
                  }))
                }
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 flex items-center gap-1 text-gray-600">
                <Clock size={14} /> Длительность слота
              </span>
              <select
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
                value={form.slotDuration}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, slotDuration: Number(e.target.value) }))
                }
              >
                <option value={60}>Слот 60 минут</option>
                <option value={30}>Слот 30 минут</option>
              </select>
            </label>
            <input
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Размер поля (например: 20x40)"
              value={form.dimensions ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, dimensions: e.target.value }))}
            />
            <select
              className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
              value={form.pitchType ?? ""}
              onChange={(e) => setForm((prev) => ({ ...prev, pitchType: e.target.value }))}
            >
              <option value="Открытая">Открытая</option>
              <option value="Закрытая">Закрытая</option>
            </select>
            <label className="text-sm">
              <span className="mb-1 block text-gray-600">Открытие</span>
              <select
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={`open-${time}`} value={time}>{time}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-gray-600">Закрытие</span>
              <select
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-primary"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={`close-${time}`} value={time}>{time}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-gray-700">Удобства</p>
            <div className="grid gap-2 md:grid-cols-3">
              {[
                ["parking", "Парковка", "/assets/images/booking/parking.svg"],
                ["locker", "Раздевалки", "/assets/images/booking/outfitChange.svg"],
                ["shower", "Душ", "/assets/images/booking/shower.svg"],
                ["tribune", "Трибуны", "/assets/images/booking/seats.svg"],
                ["lighting", "Освещение", "/assets/images/booking/lighted.svg"],
              ].map(([key, label, iconPath]) => (
                <label key={key} className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                  <img src={iconPath} alt="" className="h-5 w-5" />
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
              onChange={(e) => {
                const selected = Array.from(e.target.files ?? []);
                setFiles(selected);
                filePreviews.forEach((url) => URL.revokeObjectURL(url));
                setFilePreviews(selected.map((file) => URL.createObjectURL(file)));
              }}
              className="text-sm"
            />
            {files.length > 0 ? (
              <p className="mt-1 text-xs text-gray-500">Выбрано: {files.length}</p>
            ) : null}
            {filePreviews.length > 0 ? (
              <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-5">
                {filePreviews.map((src, idx) => (
                  <img
                    key={`${src}-${idx}`}
                    src={src}
                    alt={`preview-${idx}`}
                    className="h-20 w-full rounded-lg object-cover"
                  />
                ))}
              </div>
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
                <th className="px-4 py-3 text-right">Действия</th>
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
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => startEdit(f)}
                      className="mr-3 text-gray-400 hover:text-primary"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => removeField(f.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {fields.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
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
