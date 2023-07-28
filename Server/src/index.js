require("dotenv").config();
const { PORT } = process.env;
const { conn } = require("./DB");

const server = require("./app");

/*
server.listen(PORT, async ()=>{
  await conn.sync({force:true})
  console.log("DB sync")
  console.log("server raised in port: " + PORT)
});

*/

//De esta manera manera primero verificamos que la conexion con la base de datos
//este hecha y despues levantamos el servidor
conn
  // conn.sync({ force: true });
  .sync({ alter: true })
  .then((value) => {
    server.listen(PORT, () => {
      console.log(`Running on http://localhost:${PORT}`);
      console.log(`DB sync`);
    });
  })
  .catch((err) => console.log(err));
