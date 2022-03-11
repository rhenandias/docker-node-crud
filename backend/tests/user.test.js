const request = require("supertest");
const app = require("../app");
const sequelize = require("../src/modules/sequelize");

describe("Fluxo de Cadastro, Edição, Consulta, Listagem e Exclusão de usuário", () => {
  jest.setTimeout(10000);

  afterAll(() => {
    sequelize.close();
  });

  // Parâmetros extraídos do fluxo
  let userId = null;
  let email = null;
  let name = null;
  let password = null;

  // Parâmetros para criação do fluxo
  let newEmail = "usuario@email.com";
  let newName = "Nome de Usuário";
  let newPassword = "123456789";

  test("Não deve ser possível criar um usuário sem um nome", async () => {
    const response = await request(app).post("/api/user").send({
      email: newEmail,
      password: newPassword,
    });

    expect(response.statusCode).toBe(400);
  });

  test("Não deve ser possível criar um usuário sem um email", async () => {
    const response = await request(app).post("/api/user").send({
      name: newName,
      password: newPassword,
    });

    expect(response.statusCode).toBe(400);
  });

  test("Não deve ser possível criar um usuário sem uma senha", async () => {
    const response = await request(app).post("/api/user").send({
      name: newName,
      email: newEmail,
    });

    expect(response.statusCode).toBe(400);
  });

  test("Deve ser possível criar um usuário informando todos os dados corretamente", async () => {
    const response = await request(app).post("/api/user").send({
      name: newName,
      email: newEmail,
      password: newPassword,
    });

    // Verificação dos resultados
    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("password");

    // Extração dos dados do usuário criado
    // Adquire o ID do usuário
    if (response.body.id) userId = response.body.id.toString();
    if (response.body.email) email = response.body.email;
    if (response.body.name) name = response.body.name;
    if (response.body.password) password = response.body.password;
  });

  test("Não deve ser possível criar um usuário com email que já esteja cadastrado", async () => {
    const response = await request(app).post("/api/user").send({
      name: newName,
      email: newEmail,
      password: newPassword,
    });

    expect(response.statusCode).toBe(409);
  });

  test("Deve ser possível obter os dados do usuário criado consultando pelo seu ID", async () => {
    const response = await request(app).get(`/api/user/${userId}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("password");

    expect(response.body.id).toBe(userId);
    expect(response.body.email).toBe(email);
    expect(response.body.name).toBe(name);
    expect(response.body.password).toBe(password);
  });
});
