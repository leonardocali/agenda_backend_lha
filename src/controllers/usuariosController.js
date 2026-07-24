const path = require("path");
const fs = require("fs");
const jsonPath = path.join(__dirname, "../data/userbd.json");
const { PersonModel } = require("../models/mongo_bd");
const { log } = require("console");

let requesCont = 0;

const getDataBDMongo = async (req, res) => {
  try {
    const persons = await PersonModel.find({});
    res.status(200).json(persons);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

const getUser = async (req, res) => {
  requesCont++;
  const persons = await PersonModel.find({});
  res.json(persons);
};

const getInfo = (req, res) => {
  const dateUp = new Date();
  res.type("text/plain");
  res.send(`Phonebook has info for ${requesCont} people \n${dateUp}`);
};

const getUserByID = async (req, res) => {
  const id = await PersonModel.findById(req.params.id);
  if (id) {
    res.json(id);
  } else {
    res.json("Error user not found");
  }
};

const deletePersonByID = async (req, res) => {
  const id = req.params.id;
  const personDelete = await PersonModel.findByIdAndDelete(id);
  const persons = await PersonModel.find({});
  res.json(persons);
};

const addPerson = async (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (body.number) {
    const existeDocumento = await PersonModel.findOne({ number: body.number });

    if (existeDocumento) {
      return res.status(400).json({
        error: "number duplicate must be unique",
      });
    }
  }

  const person = {
    name: body.name || "Sin registro dato",
    number: body.number || "000000000",
  };

  const newPerson = await PersonModel.create(person);
  const persons = await PersonModel.find({});
  res.json(persons);
};

const updatePerson = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const update = await PersonModel.findByIdAndUpdate(
    id,
    { number: body.number, name: body.name },
    { new: true },
  );
  const personsupdate = await PersonModel.find({});
  res.json(personsupdate);
};

module.exports = {
  getUser,
  getInfo,
  getUserByID,
  deletePersonByID,
  addPerson,
  updatePerson,
  getDataBDMongo,
};
