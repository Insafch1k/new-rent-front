export interface Listing {
  id: number;
  address: string;
  category: string;
  city_id: number | null;
  contact: string;
  created_at: string;
  deposit: string;
  description: string;
  district_id: number | null;
  floor: number | null;
  link_url: string;
  photos: string[];
  price: number;
  rooms: string | null;
  square: number;
  user_id: number;
}

export interface PlashkaData {
  id: number;
  address: string; // Полный адрес: "Г. Казань, Московский район, ул. Премиум, д. 1"
  price: string;
  description: string;
  imgSrc: string;
  imgPackSrc1: string;
  imgPackSrc2: string;
  created_at: string; // Отформатированная дата: "3д. назад"
}