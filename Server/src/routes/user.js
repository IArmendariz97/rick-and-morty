const {
  login,
  createUser,
  getUsers,
  updater,
  deleter,
  truncateModel,
  filter,
} = require("../controllers/login");

const userRouter = require("express").Router();

userRouter.get("/login", login);

userRouter.post("/create", async (req, res) => {
  const { user } = req.body;
  const { email, password } = user;
  console.log(email, password);

  if (email) {
    try {
      const creation = await createUser({ email, password }); // creation = newUser
      res.json({ msg: "Created", data: creation });
    } catch (error) {
      res.send(error);
    }
  }
});

userRouter.get("/get", async (req, res) => {
  const { mail } = req.query;

  if (mail) {
    try {
      const busqueda = await filter(mail);
      // hago algo
      return res.json(busqueda);
    } catch (error) {
      return res.json(error);
    }
  } else {
    try {
      const usuarios = await getUsers(); // User.findAll pero la logica en otra funcion
      return res.json(usuarios);
    } catch (error) {
      return res.json(error);
    }
  }
});

userRouter.put("/update", async (req, res) => {
  const { obj } = req.body;

  try {
    const update = await updater(obj);
    return res.json(update);
  } catch (error) {
    return res.json(error);
  }
});

userRouter.delete("/delete", async (req, res) => {
  const { id } = req.query;
  try {
    const userDeleted = await deleter(id);
    return res.json(userDeleted);
  } catch (error) {
    return res.json(error);
  }
});

userRouter.delete("/truncate", async (req, res) => {
  try {
    res.json(await truncateModel());
  } catch (error) {
    return res.json(error);
  }
});
module.exports = userRouter;
