import { randomUUID } from "crypto";

export class User {
  id: string;
  name: string;
  password: string;
  email: string;
  driverLicense: string;
  admin: boolean;
  createdAt: Date;
  avatar: string;

  constructor(
    name: string,
    email: string,
    password: string,
    driverLicense: string,
    avatar: string
  ) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.driverLicense = driverLicense;
    this.admin = false;
    this.createdAt = new Date();
    this.avatar = avatar;
  }
}
