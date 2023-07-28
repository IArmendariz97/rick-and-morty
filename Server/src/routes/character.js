// Rutas de characters
const express = require("express");
const { getCharById } = require("../controllers/getCharById");

const characterRouter = express.Router();
// TODAS LAS REQ QUE LLEGUEN A ESTE ARCHIVO TIENEN EL "/characters" IMPLICITO

// para poder llegar a la ruta ---> "3001/characters/12"
characterRouter.get("/:idChar", getCharById);

module.exports = characterRouter;
