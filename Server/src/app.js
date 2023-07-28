const morgan = require("morgan");
const cors = require("cors");
// Routers
const characterRouter = require("./routes/character");
const userRouter = require("./routes/user");
const favoriteRouter = require("./routes/favorites");
// Express
const express = require("express");
const server = express();

//middlewars
server.use(express.json());
server.use(morgan("dev"));

//Permisos => cors
server.use(cors()); //habilito las cors para que cualquier origen pueda enviar solicitud a mi server

//Routers => que rutas voy a usar
server.use("/character", characterRouter);
server.use("/user", userRouter);
server.use("/favorites", favoriteRouter);

server.get("/health-check", (req, res) => {
  res.send("Working");
});

module.exports = server;
