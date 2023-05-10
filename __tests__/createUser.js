const app = require("../src/app");
const supertest = require("supertest");
const testUser = require("./testObj.json")

// Create user if all fields are given
describe("POST /user", () => {
  it("Should create a user", async () => {
    const res = await supertest(app).post("/user").send(testUser);
    expect(res.statusCode).toBe(200);
  });
})
      
// User already exists
describe("POST /user", () => {
  it("Should not create a user. Give error user already exists", async () => {
    const res = await supertest(app).post("/user").send(testUser);
    expect(res.statusCode).toBe(400);
  });
})

//Missing email parameter
describe("POST /user", () => {
  it("Should not create a user. Give error email missing", async () => {
    const emailMissingUser = {...testUser}
    delete emailMissingUser["email"]
    const res = await supertest(app).post("/user").send(emailMissingUser);
    expect(res.statusCode).toBe(400);
  });
})

//Missing phonenumber parameter
describe("POST /user", () => {
  it("Should not create a user. Give error Phonenumber missing", async () => {
    const pnMissingUser = {...testUser}
    delete pnMissingUser["phonenumber"]
    const res = await supertest(app).post("/user").send(pnMissingUser);
    expect(res.statusCode).toBe(400);
  });
})