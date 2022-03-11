const PasswordValidator = require("../validators/password.validator");
const EmailValidator = require("../validators/email.validator");
const NameValidator = require("../validators/name.validator");
const UserIdValidator = require("../validators/user_id.validator");

const UserBusiness = require("../business/user.business");

const http = require("../modules/http");

module.exports = {
  async create(req, res, next) {
    try {
      // Aquisição dos parâmetros
      const { name, email, password } = req.body;

      // Validação dos parâmetros
      const validateName = NameValidator.validate(name);
      const validateEmail = EmailValidator.validate(email);
      const validatePassword = PasswordValidator.validate(password);

      if (validatePassword.error) {
        return http.badRequest(res, validatePassword);
      }

      if (validateEmail.error) {
        return http.badRequest(res, validateEmail);
      }

      if (validateName.error) {
        return http.badRequest(res, validateName);
      }

      // Validação dos parâmetros finalizada
      const response = await UserBusiness.create(email, name, password);

      // Retorna o resultado da operação
      return http.generic(res, response);
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    try {
      const response = await UserBusiness.list();
      return http.generic(res, response);
    } catch (error) {
      next(error);
    }
  },

  async read(req, res, next) {
    try {
      // Validação dos parâmetros
      const userId = req.params.id;

      const validateUserId = UserIdValidator.validate(userId);

      if (validateUserId.error) {
        return http.badRequest(res, validateUserId);
      }

      const response = await UserBusiness.read(userId);
      return http.generic(res, response);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      // Extração dos parâmetros
      const { id, name, email, password } = req.body;

      // Validação dos parâmetros
      const validateUserId = UserIdValidator.validate(id.toString());
      const validateName = NameValidator.validate(name);
      const validateEmail = EmailValidator.validate(email);
      const validatePassword = PasswordValidator.validate(password);

      // Para operação de update, ID é obrigatório e os demais parâmetros são opcionais
      // Se os parâmetros opcionais existirem, então devem ser validados
      if (validateUserId.error) {
        return http.badRequest(res, validateUserId);
      }

      if (password) {
        if (validatePassword.error) {
          return http.badRequest(res, validatePassword);
        }
      }

      if (email) {
        if (validateEmail.error) {
          return http.badRequest(res, validateEmail);
        }
      }

      if (name) {
        if (validateName.error) {
          return http.badRequest(res, validateName);
        }
      }

      const response = await UserBusiness.update(id, name, email, password);
      return http.generic(res, response);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      // Aquisição dos parâmetros
      const { id, email, password } = req.body;

      // Validação dos parâmetros
      const validateUserId = UserIdValidator.validate(id.toString());
      const validateEmail = EmailValidator.validate(email);
      const validatePassword = PasswordValidator.validate(password);

      if (validateUserId.error) {
        return http.badRequest(res, validateUserId);
      }

      if (validateEmail.error) {
        return http.badRequest(res, validateEmail);
      }

      if (validatePassword.error) {
        return http.badRequest(res, validatePassword);
      }

      const response = await UserBusiness.delete(id, email, password);

      return http.generic(res, response);
    } catch (error) {
      next(error);
    }
  },
};
