const app = require("../src/app");
const supertest = require("supertest");

// Updarte
describe("PUT /user", () => {
    it("Should Update a user", async () => {
      const res = await supertest(app).post("/user").send({
          firstname:"Ravi",
          lastname:"Kumar",
          email:"rk@gmail.com",
          address:"sapthagiri townyard",
          phonenumber: 887612309
      });
      expect(res.statusCode).toBe(200);
    });
  })