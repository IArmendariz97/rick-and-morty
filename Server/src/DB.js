require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const defineModelUser = require("./models/User");
const defineModelCharacter = require("./models/Character");

console.log(DB_USER, DB_PASSWORD, DB_HOST);
// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(
  "rickandmorty",
  DB_USER,
  DB_PASSWORD,
  // URL
  { logging: false, native: false, host: DB_HOST, dialect: "mysql" }
);

// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("todo bien");
//   } catch (error) {
//     console.log("todo mal");
//   }
// }
// testConnection();
// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.
defineModelUser(sequelize);
defineModelCharacter(sequelize);
//

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Character } = sequelize.models;
User.belongsToMany(Character, { through: "user_favorites" });
Character.belongsToMany(User, { through: "user_favorites" });

module.exports = {
  User,
  Character,
  // Favorite,
  conn: sequelize,
};
