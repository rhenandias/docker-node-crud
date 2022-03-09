const request = require("supertest");
const app = require("../app");
const sequelize = require("../src/modules/sequelize");

describe("Verificação de disponibilidade da API", () => {
  jest.setTimeout(10000);

  afterAll(() => {
    sequelize.close();
  });

  test("Verificar disponibilidade da API na rota raiz", async () => {
    const response = await request(app).get("/").send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("Verificar disponibilidade da API na rota /api", async () => {
    const response = await request(app).get("/api").send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
