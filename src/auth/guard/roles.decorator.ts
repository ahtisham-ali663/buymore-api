import { RoleEnum } from './../dto';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...role: RoleEnum[]) => SetMetadata(ROLES_KEY, role);
