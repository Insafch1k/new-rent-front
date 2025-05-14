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