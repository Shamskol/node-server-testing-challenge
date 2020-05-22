const request = require("supertest");
const server = require("../api/index");
const faker = require("faker");
const db = require('../data/index');

describe("API", () => {
  beforeAll(async done => {
    await db.seed.run();
    done();
  });
  describe("GET /", () => {
    it("Responds with a status code of 200(OK)", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("Returns a JSON response", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });

    it("Returns { message: welcome } as a response", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ message: "welcome" });
    });
  });

  describe("GET /accounts/", () => {
    it("Responds with a status code of 200(OK)", async () => {
      const res = await request(server).get("/accounts/");
      expect(res.status).toBe(200);
    });

    it("returns a JSON response", async () => {
      const res = await request(server).get("/accounts/");
      expect(res.type).toBe("application/json");
    });
  });

  describe("POST /accounts/", () => {
    it("Returns a status of 201(Added)", async () => {
      const entry = {
        name: `${faker.random.uuid()}-${faker.finance.accountName()}`,
        amount: faker.finance.amount()
      };
      const response = await request(server)
        .post("/accounts/")
        .send(entry);
      expect(response.status).toBe(201);
    });

    it("Returns a 400 error if required properties are missing", async () => {
      const response = await request(server)
        .post("/accounts/")
        .send({ amount: faker.finance.amount() });
      expect(response.status).toBe(400);
    });
    it("Returns the newly created account", async () => {
      const entry = {
        name: `${faker.random.uuid()}-${faker.finance.accountName()}`,
        amount: parseFloat(faker.finance.amount())
      };
      const response = await request(server)
        .post("/accounts/")
        .send(entry);
      expect(response.body).toEqual(entry);
    });
  });
  describe("DELETE /api/library/:id", async () => {
    it("Returns 204(No Content) when entry is deleted", async () => {
      const res = await request(server).delete("/accounts/2");
      expect(res.status).toBe(204);
    });
    it("Returns a 404 if the account ID is not found", async () => {
      const res = await request(server).delete("/accounts/100000000000");
      expect(res.status).toBe(404);
    });
  });
});
