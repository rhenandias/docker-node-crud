# docker-node-crud (Work In Progress)

<p align="center">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height="90">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="90">
     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain-wordmark.svg" height="90">
</p>

<p align="center">
    <a href="https://github.com/rhenandias/docker-node-crud/actions/workflows/docker-image.yml"  target="_blank">
      <img src="https://github.com/rhenandias/docker-node-crud/actions/workflows/docker-image.yml/badge.svg" />
    </a>
    <!-- 
    <a href="https://www.codacy.com/gh/Biblioteca-de-Bolso/backend/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Biblioteca-de-Bolso/backend&amp;utm_campaign=Badge_Grade" target="_blank">
      <img src="https://app.codacy.com/project/badge/Grade/dd2736e4dd7c40748fa497dd6b63ba4f"/>
    </a>
    -->
    <!-- 
    <a href="https://www.codacy.com/gh/Biblioteca-de-Bolso/backend/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Biblioteca-de-Bolso/backend&amp;utm_campaign=Badge_Coverage" target="_blank">
      <img src="https://app.codacy.com/project/badge/Coverage/dd2736e4dd7c40748fa497dd6b63ba4f"/>
    </a>
    -->
    <!--
    <a href="https://documenter.getpostman.com/view/19545370/UVkmQGwd" target="_blank">
      <img src="https://img.shields.io/badge/Docs-Postman-f39f37" />
    </a>
    -->
</p>

Projeto desenvolvido com o intuito de aprender e colocar em prática a construção de um serviço de API utilizando o sistema de Container Docker. Foi construída uma API simples de CRUD utilizando Node.js e MySQL.

## Tecnologias e Frameworks

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Github Actions](https://github.com/rhenandias/docker-node-crud/actions)

## Executando o Projeto

Para executar o projeto, recomendo utilizar a versão da imagem montada para o Docker, assim, não há necessidade de ter instalado nenhuma ferramenta como Node.js ou MySQL, nem configurar uma instância de banco de dados.

### Pré-requisitos

- [Docker](https://www.docker.com/) (Docker Engine para o Linux, Docker Desktop para o Windows)
- [Docker Compose](https://docs.docker.com/compose/gettingstarted/)

### Instalação

- [Instalando o Docker Engine no Linux](https://docs.docker.com/engine/install/ubuntu/)
- [Instalando o Docker Compose no Linux](https://docs.docker.com/compose/install/)

### Clonando e Executando

Clonar o repositório:

```
$ git clone https://github.com/rhenandias/docker-node-crud.git
```

Navegar para a pasta do projeto:

```
$ cd docker-node-crud
```

Criar o arquivo de variáveis de ambiente:

```
$ touch .env
```

O arquivo de variáveis de ambiente deve conter as seguintes definições (configurar de acordo com o desejado, ou manter os exemplos a seguir):

```
# Configurar a porta desejada para a API
PORT = 4005

# Configurar a porta do banco de dados
DB_PORT = 3306

# Nome para a tabela do banco de dados
DB_DATABASE = db_crud

# Nome para o usuário do banco de dados
DB_USER = root

# Senha para o usuário do banco de dados
DB_PASSWORD = 123456789
```

Executar o Docker Composer:

```
$ sudo docker-compose up --build
```

## Documentação

work in progress

## Testes

work in progess
