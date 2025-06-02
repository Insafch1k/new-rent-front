export interface HistoryResponse {
  listings: Listing[];
}

export interface Listing {
  address: string;
  category: string;
  city_id: number | null;
  contact: string;
  created_at: string;
  deposit: string;
  description: string;
  district_id: number;
  floor: number;
  id: number;
  link_url: string;
  photos: string[];
  price: number;
  recommendations: Recommendation[];
  rooms: string;
  square: number;
  user_id: number | null;
}

export interface Recommendation {
  [key: string]: {
    Негативные: string[];
    Положительные: string[];
  };
}
