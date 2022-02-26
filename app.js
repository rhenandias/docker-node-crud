const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const sequelize = require("./src/modules/sequelize");

dotenv.config({ path: ".env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./src/routes"));

app.get("/connection", async (req, res) => {
  try {
    await sequelize.authenticate();

    res.status(200).json({
      message: "Teste de conexão com o banco de dados realizado com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      message: `Não foi possível realizar a conexão com o banco de dados: ${error.message}`,
    });
  }
});

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Docker Node.js CRUD",
  });
});

app.get("/api", (req, res) => {
  res.status(200).send({
    message: "Docker Node.js CRUD",
  });
});

module.exports = app;
