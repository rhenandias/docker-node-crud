const validator = require("validator");

module.exports = {
  validate(password) {
    if (!password) {
      return {
        error: "Parâmetro incorreto",
        message: "É necesário inserir uma senha válida",
      };
    }

    if (!validator.isLength(password, { min: 8, max: 32 })) {
      return {
        error: "Parâmetro incorreto",
        message: "A senha precisa ter entre 8 e 32 caracteres",
      };
    }

    if (validator.contains(password, " ")) {
      return {
        error: "Parâmetro incorreto",
        message: "A senha informada não deve possuir espaços",
      };
    }

    if (
      !validator.isAlphanumeric(password, "pt-BR", {
        ignore: "~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/",
      })
    ) {
      return {
        error: "Parâmetro incorreto",
        message: `Apenas os seguintes caracteres especiais são permitidos: ~\`!@#$%^&*()_-+={[}]|:;\"'<,>.?/`,
      };
    }
    return {};
  },
};
