export class Donations {
  name: string;
  address1: string;
  address2: string;
  zipcode: string;
  phone: string;
  pickupslot: string;

  constructor(name: string, address1: string, address2: string, zipcode: string, phone: string, pickupslot: string) {
    this.name = name;
    this.address1 = address1;
    this.address2 = address2;
    this.zipcode = zipcode;
    this.phone = phone;
    this.pickupslot = pickupslot;
  }
}

export interface DonationsResponse {
  success: boolean;
  statusCode: number;
  message?: string;
  items?: Donations[];
  error?: any;
}

export class Roles {
  RoleId: number;
  Rolename: string;

  constructor(RoleId: number, Rolename: string) {
    this.RoleId = RoleId;
    this.Rolename = Rolename;
  }
}

export interface RolesResponse {
  success: boolean;
  statusCode: number;
  message?: string;
  items?: Roles[];
  error?: any;
}
