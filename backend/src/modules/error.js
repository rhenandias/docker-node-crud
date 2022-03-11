// Express.js Custom Error Handler
module.exports = (err, req, res, next) => {
  const file = err.stack.split("\n")[1].split("\\").pop().replace(")", "");

  console.log(file, "-", err.name, "-", err.message);

  return res.status(500).json({
    error: err.name,
    message: err.message,
    file: file,
  });
};
