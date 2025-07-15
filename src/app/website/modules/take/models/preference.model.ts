export interface Preference {
  category: 'monthly' | 'daily';
  user_city: number;
  user_district: number | null;
  user_min_floor: number;
  user_max_floor: number;
  user_min_square: number;
  user_max_square: number;
  user_min_price: number;
  user_price: number;
  user_room_count: number | null;
}

export interface PreferenceRequest {
  tg_id: number;
  preference: Preference;
}

export interface PreferenceResponse {
  message: string;
}