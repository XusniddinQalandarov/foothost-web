import type { User, Field, Lobby, News, CreateNewsDto, CreateFieldDto } from './types';

const BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://still-mountain-91803-673a3b81f512.herokuapp.com';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  register: (dto: {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
  }) =>
    request<{
      userId: string;
      message: string;
      requiresOtp: boolean;
      accessToken?: string;
      refreshToken?: string;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(dto),
    }),

  verifyOtp: (phone: string, code: string) =>
    request<{ accessToken: string; refreshToken: string }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    }),

  login: (phone: string, password: string) =>
    request<{ accessToken: string; refreshToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    }),

  me: () => request<User>('/users/me'),

  users: {
    all: () => request<User[]>('/users/all'),
  },

  fields: {
    all: () => request<Field[]>('/fields'),
    create: (dto: CreateFieldDto) =>
      request<Field>('/fields', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    update: (id: string, dto: Partial<CreateFieldDto>) =>
      request<Field>(`/fields/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(dto),
      }),
    remove: (id: string) =>
      request<void>(`/fields/${id}`, { method: 'DELETE' }),
    uploadPhoto: async (id: string, file: File): Promise<Field> => {
      const token = getToken();
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${BASE}/fields/${id}/photos`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  },

  lobbies: {
    all: () => request<Lobby[]>('/lobbies/all'),
  },

  news: {
    all: () => request<News[]>('/news/all'),
    create: (dto: CreateNewsDto) =>
      request<News>('/news', {
        method: 'POST',
        body: JSON.stringify(dto),
      }),
    update: (id: string, dto: Partial<CreateNewsDto>) =>
      request<News>(`/news/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(dto),
      }),
    remove: (id: string) =>
      request<{ deleted: boolean }>(`/news/${id}`, { method: 'DELETE' }),
    uploadImage: async (id: string, file: File): Promise<News> => {
      const token = getToken();
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${BASE}/news/${id}/image`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  },
};
