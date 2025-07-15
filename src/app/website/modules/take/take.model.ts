export interface Listing {
  address: string;
  category: string;
  city_id: number | null;
  contact: string;
  created_at: string;
  deposit: string;
  description: string;
  district_id: number;
  district_name: string | null;
  floor: number;
  id: number;
  link_url: string;
  photos: string[];
  price: number;
  recommendations: any[];
  rooms: string;
  square: number;
  user_id: number | null;
}

export interface ListingsResponse {
  listings: Listing[];
}


export interface Preference {
  category: 'monthly' | 'daily';
  id?: number;
  mailing?: boolean;
  user_city: number;
  user_district: number | null;
  user_id?: number;
  user_max_floor: number;
  user_max_square: number;
  user_min_floor: number;
  user_min_price: number;
  user_min_square: number;
  user_price: number;
  user_room_count: number | null;
}

export interface GetPreferenceResponse {
  preference: Preference;
}

export interface UpdatePreferenceResponse {
  message: string;
  preference: Preference;
}