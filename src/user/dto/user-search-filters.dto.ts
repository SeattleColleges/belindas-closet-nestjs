import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role as UserRole } from '../schemas/user.schema';

export class UserSearchFilters {
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsEnum(UserRole) role?: UserRole;
  @IsOptional() @IsString() page?: string;   // query-string comes in as text
}

export interface UserSearchData {
  data: any[];
  page: number;
  total: number;
  pages: number;
}
