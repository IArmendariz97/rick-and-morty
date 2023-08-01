const express = require("express");
const {
  postFav,
  deleteFav,
  getFav,
} = require("../controllers/handleFavorites");

const favoriteRouter = express.Router();

favoriteRouter.get("/:userId", getFav);
favoriteRouter.post("/", postFav);
favoriteRouter.delete("/:userId/:characterId", deleteFav);

module.exports = favoriteRouter;
