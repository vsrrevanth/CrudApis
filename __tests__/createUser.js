const app = require("../src/app");
const supertest = require("supertest");

// Create user if all fields are given
describe("POST /user", () => {
  it("Should create a user", async () => {
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
      
// User already exists
describe("POST /user", () => {
  it("Should not create a user. Give error user already exists", async () => {
    const res = await supertest(app).post("/user").send({
        firstname:"Revanth",
        lastname:"Varanasi",
        address:"713 S aberdeen",
        phonenumber: 3122066339
    });
    expect(res.statusCode).toBe(400);
  });
})

//Missing email parameter
describe("POST /user", () => {
  it("Should not create a user. Give error email missing", async () => {
    const res = await supertest(app).post("/user").send({
        firstname:"Steve",
        lastname:"Smith",
        address:"511 jason momoe avenue",
        phonenumber: 9987612344
    });
    expect(res.statusCode).toBe(400);
  });
})

//Missing phonenumber parameter
describe("POST /user", () => {
  it("Should not create a user. Give error Phonenumber missing", async () => {
    const res = await supertest(app).post("/user").send({
        firstname:"Steve",
        lastname:"Smith",
        address:"511 jason momoe avenue",
        email: "svaran4@uic.edu"
    });
    expect(res.statusCode).toBe(400);
  });
})