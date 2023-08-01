const axios = require("axios");
const { Character } = require("../DB");
// Crea una constante llamada URL y guarda lo siguiente: "https://rickandmortyapi.com/api/character/".
const URL = "https://rickandmortyapi.com/api/character/";

// Crea una función con el nombre getCharById y expórtala. Recibe por parámetro a los objetos req y res.
async function getCharById(req, res) {
  const { idChar } = req.params; // req.params -> {id: 12}

  try {
    console.log("idChar:", idChar);
    const character = await Character.findByPk(idChar);

    if (character) {
      console.log("Character encontrado en la base de datos:", character);
      return res.status(200).json(character);
    }

    const apiRequest = await axios(`${URL}${idChar}`);
    // const apiRequest = await BASE_DE_DATOS_personas("ordenado", "paginado", "incluir");
    const { data } = apiRequest;

    // Se pudo hacer OK la solicitud de axios pero la API no tiene info entonces me indica un error.
    if (data.error) {
      console.log(data.error);
      return res.status(404).send(data.error);
    }

    const { id, name, status, species, origin, image, gender } = data;
    const newCharacter = {
      id: Number(id),
      name,
      status,
      species,
      origin, // Enviamos el objecto "origin" porque el front lo espera
      image,
      gender,
    };
    await Character.create(newCharacter);
    console.log("Nuevo personaje creado:", newCharacter);
    return res.status(200).json(newCharacter);
  } catch (axiosError) {
    // Error en la solicitud de axios por ejemplo: "estaba mal la URL y no se pudo hacer el get"
    return res.status(500).send(axiosError.message);
  }
}

module.exports = { getCharById };

// Dentro de la función haz una petición a la API a partir del id que recibes por Params.
// axios(`${URL}${idChar}`)
//   .then(({ data }) => {
//     // Destructuramos la "data" axios {data: {api}, masCosas: "..."}
//     if (data.error) {
//       return res.status(404).send(data.error);
//     }

//     const { id, name, status, species, origin, image, gender } = data;
//     const character = {
//       id: Number(id),
//       name,
//       status,
//       species,
//       origin, // Enviamos el objecto "origin" porque el front lo espera
//       image,
//       gender,
//     };

//     // pude hacer la solicitud
//     return res.status(200).json(character);
//   })
//   .catch((axiosError) => {
//     // Si hay un error debes responder con un status 500, y un texto con la propiedad message de error.
//     return res.status(500).send(axiosError.message);
//   });
