export type UserRole = 'player' | 'field_owner' | 'both';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  isPhoneVerified: boolean;
  avatarUrl: string | null;
  rating: number;
  tournamentCount: number;
  wins: number;
  streakWeeks: number;
  position: string | null;
  createdAt: string;
}

export interface Field {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  pricePerHour: number;
  rating: number;
  amenities: Record<string, boolean>;
  photos: string[];
  description: string | null;
  pitchType: string | null;
  dimensions: string | null;
  workTime: string | null;
  createdAt: string;
}

export interface CreateFieldDto {
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  pricePerHour: number;
  slotDuration: number;
  amenities?: Record<string, boolean>;
  description?: string;
  pitchType?: string;
  dimensions?: string;
  workTime?: string;
}

export type LobbyStatus =
  | 'draft'
  | 'active'
  | 'full'
  | 'paid'
  | 'booked'
  | 'completed'
  | 'cancelled';

export interface Lobby {
  id: string;
  creatorId: string;
  fieldId: string;
  status: LobbyStatus;
  maxPlayers: number;
  teamCount: number;
  durationHours: number;
  totalAmount: number;
  expiresAt: string | null;
  createdAt: string;
}

export interface News {
  id: string;
  title: string;
  body: string;
  imageUrl: string | null;
  published: boolean;
  authorId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewsDto {
  title: string;
  body: string;
  published?: boolean;
}
