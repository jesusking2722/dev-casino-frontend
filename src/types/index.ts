export interface User {
  id?: number;
  email?: string;
  password?: string;
  email_verified?: "yes" | "no";
  username?: string;
  parent_id?: number;
  inviter_id?: number;
  first_name?: string;
  last_name?: string;
  phone?: string;
  phone_verified?: "yes" | "no";
  rating?: number;
  avatar?: string;
  address?: string;
  role_id?: number;
  shop_id?: number;
  balance?: string;
  status?: string;
  document_verified?: "yes" | "no";
  created_at?: Date;
  updated_at?: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  message?: string;
  data: T;
}
