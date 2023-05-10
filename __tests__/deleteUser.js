const app = require("../src/app");
const supertest = require("supertest");
const testObj = require("./testObj.json");

describe("DELETE /user", () => {
  it("Delete a user", async () => {
    const res = await supertest(app).delete("/user?email="+testObj.email)
    expect(res.statusCode).toBe(200);
  });
})

// User doesn't exist
describe("DELETE /user", () => {
    it("User missing", async () => {
      const res = await supertest(app).delete("/user?email="+"kasdjflasdfl@gmail.com")
      expect(res.statusCode).toBe(404);
    });
})

// Email is missing
describe("DELETE /user", () => {
  it("email missing", async () => {
    const res = await supertest(app).delete("/user")
    expect(res.statusCode).toBe(400);
    });
    
});

