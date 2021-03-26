/**
 * @author Samkit Shah [samkit@dal.ca]
 */
import { RoleModel } from './role.model';
export interface UserModel {
  phone: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roleid: number;
}
