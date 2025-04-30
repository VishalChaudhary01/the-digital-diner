import { UserRole } from '@/constants';
import { ApiResponse } from './common.type';

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  role: UserRole;
}

export type GetProfileResponse = ApiResponse<{ user: User }>;
