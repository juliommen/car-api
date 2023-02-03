import request from "supertest";

import { app } from "../../../app";

describe("Create Category Controller Integration Test", () => {
  it("should be able to create a category", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "Test", description: "Test" });
    expect(response.status).toBe(201);
  });
});
