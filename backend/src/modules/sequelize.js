const Sequelize = require("sequelize");

console.log("Database Port:", process.env.DB_PORT);
console.log("Database Name:", process.env.DB_DATABASE);
console.log("User Name:", process.env.DB_USER);
console.log("User Password:", process.env.DB_PASSWORD);

// dbConfigurações para a conexão do Sequelize ao Banco de Dados
const dbConfig = {
  host: "mysql",
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false,
};

// Cria Instância de Conexão com o Banco de Dados
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  // null,
  dbConfig
);

module.exports = sequelize;
