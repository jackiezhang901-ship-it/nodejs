export class AuthResponseDto {
  id: string;
  email: string;
  username: string;
  phone: string;
  isActive: boolean;
  lastLoginAt: Date;
  createdAt: Date;
}
