const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");
const potluckRouter = require("./potluck/potluck-router.js");
const foodRouter = require("./foods/foods-router.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/potluck", potluckRouter);
server.use("/api/foods", foodRouter);

server.get("/", (req, res) => {
  res.json("connected");
});

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
