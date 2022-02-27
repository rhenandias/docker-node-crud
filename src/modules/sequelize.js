const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

// dbConfigurações para a conexão do Sequelize ao Banco de Dados
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: false,
};

// Cria Instância de Conexão com o Banco de Dados
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  null,
  dbConfig
);

module.exports = sequelize;
