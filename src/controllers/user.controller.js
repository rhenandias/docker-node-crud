const PasswordValidator = require("../validators/password.validator");
const EmailValidator = require("../validators/email.validator");
const NameValidator = require("../validators/name.validator");
const UserIdValidator = require("../validators/user_id.validator");

const UserBusiness = require("../business/user.business");

const http = require("../modules/http");
const filename = __filename.slice(__dirname.length + 1) + " -";

module.exports = {
  async create(req, res) {
    try {
      // Aquisição dos parâmetros
      const name = req.body["name"];
      const email = req.body["email"];
      const password = req.body["password"];

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
      console.log(filename, `Erro inesperado: ${error.message}`);
      return http.failure(res, {
        message: `Erro inesperado: ${error.message}`,
      });
    }
  },

  async list(req, res) {
    try {
      const response = await UserBusiness.list();
      return http.generic(res, response);
    } catch (error) {
      return http.failure({
        message: `Erro inesperado: ${error.message}`,
      });
    }
  },

  async read(req, res) {
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
      console.log(filename, `Erro inesperado: ${error.message}`);
      return http.failure(res, {
        message: `Erro inesperado: ${error.message}`,
      });
    }
  },

  async update(req, res) {
    try {
      // Extração dos parâmetros
      const userId = req.body.id;
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      // Validação dos parâmetros
      const validateUserId = UserIdValidator.validate(userId, true);
      const validateName = NameValidator.validate(name, false);
      const validateEmail = EmailValidator.validate(email, false);
      const validatePassword = PasswordValidator.validate(password, false);

      if (validateUserId.error) {
        return http.badRequest(res, validateUserId);
      }

      if (validatePassword.error) {
        return http.badRequest(res, validatePassword);
      }

      if (validateEmail.error) {
        return http.badRequest(res, validateEmail);
      }

      if (validateName.error) {
        return http.badRequest(res, validateName);
      }

      const response = await UserBusiness.update(userId, name, email, password);
      return http.generic(res, response);
    } catch (error) {
      console.log(filename, `Erro inesperado: ${error.message}`);
      return http.failure(res, {
        message: `Erro inesperado: ${error.message}`,
      });
    }
  },

  async delete(req, res) {
    try {
      // Aquisição do token de autenticação
      const token = req.headers["x-access-token"];

      // Validação do token informado
      const decoded = await AuthBusiness.verifyToken(token);

      if (decoded["error"]) {
        // Não foi possível validar o token
        return http.unauthorized(res, {
          message: decoded["error"],
        });
      }

      // Aquisição dos parâmetros
      const userId = req.body["id"];
      const email = req.body["email"];
      const password = req.body["password"];

      // Validação dos parâmetros
      const validateUserId = UserIdValidator.validate(userId);
      const validateEmail = EmailValidator.validate(email);
      const validatePassword = PasswordValidator.validate(password);

      if (validateUserId.error) {
        return http.badRequest(res, validateUserId);
      }

      if (validateEmail.error) {
        return http.badRequest(res, validavalidateEmailteEmail);
      }

      if (validatePassword.error) {
        return http.badRequest(res, validatePassword);
      }

      const response = await UserBusiness.delete(
        decoded,
        userId,
        email,
        password
      );

      return http.generic(res, response);
    } catch (error) {
      console.log(filename, `Erro inesperado: ${error.message}`);
      return http.failure(res, {
        message: `Erro inesperado: ${error.message}`,
      });
    }
  },
};
