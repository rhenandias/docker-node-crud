// Express.js Custom Error Handler
module.exports = (err, req, res, next) => {
  const regEx = new RegExp(
    `${process.cwd()}\\/(?!node_modules\\/)([\\/\\w-_\\.]+\\.js):(\\d*):(\\d*)`
  );

  const [, file, line, column] = err.stack.match(regEx);

  let filename = "";

  if (file.includes("/")) {
    // Unix Based
    filename = `${file.split("/").pop()}:${line}:${column}`;
  } else {
    // Windows ?
    filename = `${file.split("\\").pop()}:${line}:${column}`;
  }

  console.log(filename, "-", err.name, "-", err.message);

  return res.status(500).json({
    error: err.name,
    message: err.message,
    file: filename,
  });
};
