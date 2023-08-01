const { Character } = require("../DB");
const { User } = require("../DB");
const { conn } = require("../DB");

// Ruta para agregar un favorito a un usuario específico
async function postFav(req, res) {
  try {
    const { userId, characterId } = req.body; // Supongamos que envías el userId y characterId desde el cliente

    // Buscar el usuario y el personaje en la base de datos
    const user = await User.findByPk(userId);
    const character = await Character.findByPk(characterId);

    if (!user || !character) {
      return res
        .status(404)
        .json({ message: "Usuario o personaje no encontrado." });
    }

    // Acceder a la instancia de Sequelize para realizar la inserción en la tabla intermedia
    const sequelize = conn;
    await sequelize.models.user_favorites.create({
      UserId: userId,
      CharacterId: characterId,
    });

    // Obtener los favoritos actualizados del usuario
    const favorites = await user.getCharacters();

    return res.status(201).json(favorites);
  } catch (error) {
    console.error("Error al agregar el favorito:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Ruta para eliminar un favorito de un usuario específico
async function deleteFav(req, res) {
  try {
    const { userId, characterId } = req.params; // Supongamos que envías el userId y characterId desde el cliente
    console.log(userId, characterId);
    // Buscar el favorito en la tabla intermedia
    const sequelize = conn;
    const favorite = await sequelize.models.user_favorites.findOne({
      where: { UserId: userId, CharacterId: characterId },
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorito no encontrado." });
    }

    // Eliminar el favorito de la tabla intermedia
    await favorite.destroy();

    // Obtener los favoritos actualizados del usuario
    const user = await User.findByPk(userId);
    const favorites = await user.getCharacters();

    return res.status(200).json(favorites);
  } catch (error) {
    console.error("Error al eliminar el favorito:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Ruta para obtener los favoritos de un usuario específico
async function getFav(req, res) {
  try {
    const { userId } = req.params; // Supongamos que envías el userId desde el cliente

    // Buscar el usuario en la base de datos
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Obtener los favoritos del usuario
    const favorites = await user.getCharacters();

    return res.status(200).json(favorites);
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}

module.exports = {
  postFav,
  deleteFav,
  getFav,
};
