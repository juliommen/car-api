import { randomUUID } from "crypto";

export class Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor(name: string, description: string) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
  }
}
