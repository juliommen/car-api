import request from "supertest";

import { app } from "../../../app";

describe("Create Category Controller Integration Test", () => {
  it("should be able to create a user", async () => {
    const response = await request(app).post("/users").send({
      name: "Camila",
      driverLicense: "987654321",
      email: "camila@gmail.com",
      password: "123",
      avatar: "camilaperfil.com",
    });
    expect(response.status).toBe(201);
  });
});
