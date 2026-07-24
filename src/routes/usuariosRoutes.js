const { Router } = require("express");
const router = Router();

const {
  getUser,
  getInfo,
  getUserByID,
  deletePersonByID,
  addPerson,
  updatePerson,
  getDataBDMongo
} = require("../controllers/usuariosController");

router.get("/", getUser);
router.get("/info", getInfo);
router.get("/mongobd", getDataBDMongo);
router.get("/:id", getUserByID);
router.delete("/:id", deletePersonByID);
router.post("/", addPerson);
router.patch("/:id", updatePerson);

module.exports = router;