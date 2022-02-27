const validator = require("validator");

module.exports = {
  validate(userId) {
    if (!userId) {
      return {
        error: "Parâmetro incorreto",
        message: "É necessário informar um ID de usuário",
      };
    }

    if (!validator.isDecimal(userId)) {
      return {
        error: "O ID informado não é valido",
        message: "O ID informado não é válido",
      };
    }
    return {};
  },
};
