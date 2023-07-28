var myFavorites = [];

function postFav(req, res) {
  // myFavorites.push(req.body);
  myFavorites = [...myFavorites, req.body];
  return res.json(myFavorites);
}

function deleteFav(req, res) {
  const { id } = req.params;
  const noDelete = myFavorites.filter((pjFav) => pjFav.id !== Number(id));
  myFavorites = noDelete;

  return res.json(myFavorites);
}

function getFav(req, res) {
  return res.json(myFavorites);
}

module.exports = {
  postFav,
  deleteFav,
  getFav,
};
