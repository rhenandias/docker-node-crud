const validator = require("validator");

module.exports = {
  validate(userId, required) {
    if (required) {
      if (!userId) {
        return {
          error: "Parâmetro incorreto",
        };
      }

      if (!validator.isDecimal(userId)) {
        return {
          error: "O ID informado não é valido",
        };
      }
    }
    return {};
  },
};
