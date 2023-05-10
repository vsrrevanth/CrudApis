const app = require("../src/app");
const supertest = require("supertest");

describe("PUT /user", () => {
  it("Should Update a user", async () => {
    const res = await supertest(app).put("/user?email="+"rk@gmail.com").send({
        firstname:"Ravi2",
        lastname:"Kairan2",
        address:"1707S Racine Ave",
        phonenumber: 887612309
    });
    expect(res.statusCode).toBe(200);
  });
})

// User doesn't exist
describe("PUT /user", () => {
    it("User missing", async () => {
      const res = await supertest(app).put("/user?email="+"kasdjflasdfl@gmail.com").send({
          firstname:"Ravi",
          lastname:"Kumar",
          address:"sapthagiri townyard",
          phonenumber: 887612309
      });
      expect(res.statusCode).toBe(404);
    });
})

// Email is missing
describe("PUT /user", () => {
  it("email missing", async () => {
    const res = await supertest(app).put("/user").send({
        firstname:"Ravi",
        lastname:"Kumar",
        email:"rk@gmail.com",
        address:"sapthagiri townyard",
        phonenumber: 887612309
    });
    expect(res.statusCode).toBe(400);
  });
})

