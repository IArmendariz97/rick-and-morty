const express = require("express");
const {
  postFav,
  deleteFav,
  getFav,
} = require("../controllers/handleFavorites");

const favoriteRouter = express.Router();

favoriteRouter.get("/", getFav);
favoriteRouter.post("/", postFav);
favoriteRouter.delete("/:id", deleteFav);

module.exports = favoriteRouter;
