export interface VerificationRequest {
  passport_photo: string;
  egrn_photo: string;
  telegram_id: string;
  it_first: boolean; // Новое поле
}

export interface VerificationResponse {
  id: number;
  message: string;
}

export interface VerificationStatusResponse {
  id?: number;
  passport_photo?: string;
  egrn_photo?: string;
  status: 'not_submitted' | 'consideration' | 'approved' | 'rejected';
}