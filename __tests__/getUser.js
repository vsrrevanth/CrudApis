const app = require("../src/app");
const supertest = require("supertest");

describe("GET /users", () => {
  it("get all users", async () => {
    const res = await supertest(app).get("/users")
    expect(res.statusCode).toBe(200);
  });
})

describe("GET /user", () => {
    it("get a user", async () => {
      const res = await supertest(app).get("/user?email="+"rk@gmail.com")
      expect(res.statusCode).toBe(200);
    });
})

describe("GET /user", () => {
    it("get a non existing user", async () => {
      const res = await supertest(app).get("/user?email="+"kjalsjdfhsdf@gmail.com")
      expect(res.statusCode).toBe(404);
    });
})

describe("GET /user", () => {
    it("missing email id", async () => {
      const res = await supertest(app).get("/user")
      expect(res.statusCode).toBe(400);
    });
})

