import request from "supertest";

import { app } from "../../../app";

let token;

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

  it("should be able to authenticate a user", async () => {
    const response = await request(app).post("/sessions").send({
      email: "camila@gmail.com",
      password: "123",
    });

    token = response.body.token;

    expect(response.body).toHaveProperty("token");
  });

  it("it should not be able to create a category with non admin user", async () => {
    const response = await request(app)
      .post("/categories")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "sedan",
        description: "sedan",
      });

    expect(response.status).toBe(400);
  });
});
