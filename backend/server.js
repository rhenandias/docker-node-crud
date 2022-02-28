const app = require("./app");

let port = process.env.PORT;

if (port == "" || port == null) {
  port = 4005;
}

app.listen(port);
