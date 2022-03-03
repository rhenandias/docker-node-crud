const validator = require("validator");
const crypto = require("crypto");
const { Op } = require("sequelize");

const User = require("../models/user.model");

const http = require("../modules/http");
const { unwatchFile } = require("fs");

const filename = __filename.slice(__dirname.length + 1) + " -";

module.exports = {
  async create(email, name, password) {
    try {
      // Verificação de duplicidade
      const user = await User.findOne({
        where: {
          email: email,
        },
        raw: true,
      });

      if (user) {
        return http.ok(null, {
          message: "Este endereço de email já foi cadastrado por outro usuário",
        });
      } else {
        // Aplicar hash MD5 na senha
        password = crypto.createHash("md5").update(password).digest("hex");

        // Registra o usuário na base de dados
        const user = await User.create({
          email,
          name,
          password,
        });

        if (user) {
          return http.created(null, user);
        } else {
          return http.failure(null, {
            message: "Não foi possível registrar o novo usuário",
          });
        }
      }
    } catch (error) {
      console.log(
        filename,
        `Erro durante a criação de novo usuário: ${error.message}`
      );
      return http.failure(null, {
        message: `Erro durante a criação de novo usuário: ${error.message}`,
      });
    }
  },

  async list() {
    try {
      const users = await User.findAll({
        raw: true,
      });

      if (users) {
        return http.ok(null, users);
      } else {
        return http.failure(null, {
          message: "Erro durante a aquisição de usuários",
        });
      }
    } catch (error) {
      console.log(
        filename,
        `Erro durante aquisição de usuários: ${error.message}`
      );
      return http.failure(null, {
        message: `Erro durante aquisição de usuários: ${error.message}`,
      });
    }
  },

  async read(userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (user) {
        return http.ok(null, user);
      } else {
        return http.ok(null, {
          message: "Nenhum usuário encontrado com o ID especificado",
        });
      }
    } catch (error) {
      console.log(
        filename,
        `Erro durante leitura de usuário: ${error.message}`
      );
      return http.failure(null, {
        message: `Erro durante leitura de usuário: ${error.message}`,
      });
    }
  },

  async update(userId, name, email, password) {
    try {
      // Tenta adquirir dados atuais do ID de usuário que se deseja realizar o update
      const user = await User.findOne({
        where: {
          id: userId,
        },
        raw: true,
      });

      if (user) {
        // Construir um novo objeto de usuário conforme os parâmetros passados
        if (name) user["name"] = userId;

        // Caso seja desejado uma alteração de email, verificar disponibilidade
        if (email) {
          const isEmailUsed = await User.findOne({
            where: {
              id: {
                [Op.ne]: userId,
              },
              email: email,
            },
            raw: true,
          });

          if (isEmailUsed) {
            return http.ok(null, {
              message:
                "Não foi possível atualizar, o novo email já foi cadastrado por outro usuário",
            });
          }

          user["email"] = userId;
        }

        // Para atualização da senha, executar hash MD5 na nova senha
        if (password) {
          password = crypto.createHash("md5").update(password).digest("hex");
          user["password"] = password;
        }

        // Realizar atualização
        const rowsAffected = await User.update(
          {
            name,
            email,
            password,
          },
          {
            where: {
              id: userId,
            },
            raw: true,
          }
        );

        if (rowsAffected) {
          // Retornar o objeto que foi atualizaod
          const updated = await User.findOne({
            where: {
              id: userId,
            },
            raw: true,
          });
          return http.ok(null, updated);
        } else {
          return http.failure(null, {
            message: "Não foi possível atualizar os dados de usuário",
          });
        }
      } else {
        return http.ok(null, {
          message: "Nenhum usuário encontrado para o ID especificado",
        });
      }
    } catch (error) {
      console.log(
        filename,
        `Erro durante atualização de usuári: ${error.message}`
      );
      return http.failure(null, {
        message: `Erro durante atualização de usuári: ${error.message}`,
      });
    }
  },

  async delete(userId, email, password) {
    try {
      // Aplicar hash MD5 na senha
      password = crypto.createHash("md5").update(password).digest("hex");

      // Adquirir dados do usuário informado do banco de dados
      const user = await User.findOne({
        where: {
          id: userId,
          email: email,
          password: password,
        },
        raw: true,
      });

      if (user) {
        // Remover todos os dados de usuário
        const deleted = await User.destroy({
          where: {
            id: userId,
            email: email,
          },
        });

        // Verifica sucesso da exclusão
        if (deleted) {
          return http.ok(null, {
            message: "Conta de usuário removida com sucesso",
          });
        } else {
          return http.failure({
            message: "Não foi possível apagar a conta de usuário",
          });
        }
      } else {
        return http.ok(null, {
          message: "Nenhum usuário encontrado para os dados fornecidos",
        });
      }
    } catch (error) {
      console.log(
        filename,
        `Erro durante rotina de apagar usuário: ${error.message}`
      );
      throw error;
    }
  },
};
