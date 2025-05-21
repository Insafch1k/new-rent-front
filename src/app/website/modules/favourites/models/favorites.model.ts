export interface Listing {
  id: number;
  address: string;
  category: 'monthly' | 'daily' | null;
  city_id: number | null;
  contact: string | null;
  created_at: string | null;
  deposit: string | null;
  description: string;
  district_id: number;
  district_name?: string;
  floor: number;
  link_url: string;
  photos: string[];
  price: number;
  recommendations: Array<{
    [key: string]: {
      Положительные: string[];
      Отрицательные: string[];
    };
  }>;
  rooms: string;
  square: number;
  user_id: number | null;
}

export interface FavoritesResponse {
  listings: Listing[];
  message: string;
}

export interface FavoriteActionResponse {
  message: string;
}