import { randomUUID } from "crypto";

export class UserToken {
  id: string;
  refreshToken: string;
  createdAt: Date;
  userId: string;

  constructor(userId: string, refreshToken: string) {
    this.id = randomUUID();
    this.refreshToken = refreshToken;
    this.createdAt = new Date();
    this.userId = userId;
  }
}
