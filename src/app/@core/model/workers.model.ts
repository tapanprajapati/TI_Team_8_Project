/**
 * @author Asmita Chaudhari <Asmita.Chaudhari@dal.ca>
 *
 */

export class Workers {
  BannerId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  RoleId: number;
  RoleName: string;

  constructor(BannerId: string, FirstName: string, LastName: string, Email: string, RoleId: number, RoleName: string) {
    this.BannerId = BannerId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.RoleId = RoleId;
    this.RoleName = RoleName;
  }
}

export interface WorkersResponse {
  success: boolean;
  statusCode: number;
  message?: string;
  items?: Workers[];
  error?: any;
}

export class Roles {
  RoleId: number;
  RoleName: string;

  constructor(RoleId: number, RoleName: string) {
    this.RoleId = RoleId;
    this.RoleName = RoleName;
  }
}

export interface RolesResponse {
  success: boolean;
  statusCode: number;
  message?: string;
  items?: Roles[];
  error?: any;
}
