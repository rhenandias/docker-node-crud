const validator = require("validator");

module.exports = {
  validate(name) {
    if (!name) {
      return {
        error: "Parâmetro incorreto",
        message: "É necesário inserir um nome válido",
      };
    }

    if (
      !validator.isAlphanumeric(name, "pt-BR", {
        ignore: "' ",
      })
    ) {
      return {
        error: "Parâmetro incorreto",
        message: "O nome informado não deve possuir caracteres especiais",
      };
    }

    if (
      !validator.isLength(name, {
        min: 3,
        max: 64,
      })
    ) {
      return {
        error: "Parâmetro incorreto",
        message: "O nome informado precisa ter entre 3 e 64 caracteres",
      };
    }
    return {};
  },
};
