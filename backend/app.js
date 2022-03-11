const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: "../.env" });
const helmet = require("helmet");

const sequelize = require("./src/modules/sequelize");

const requireDir = require("require-dir");
const modelsDir = requireDir("./src/models/");

const customErrorHandler = require("./src/modules/error");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api", require("./src/routes"));

app.use(customErrorHandler);

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

if (process.env.NODE_ENV != "test") {
  (async () => {
    try {
      await sequelize.sync({ force: false });
      console.log("Conexão ao banco de dados realizada com sucesso");
    } catch (error) {
      console.log(
        `Não foi possível sincronizar o Sequelize com o banco de dados: ${error.message}`
      );
    }
  })();
}

module.exports = app;
