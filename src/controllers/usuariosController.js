const path = require('path');
const fs = require('fs');
const jsonPath = path.join(__dirname, '../data/userbd.json');

let requesCont = 0;

const getUserFile = () =>{
    const archivoRaw = fs.readFileSync(jsonPath, 'utf-8');
    let users = JSON.parse(archivoRaw);
    return users;
};

const getUser = (req, res) => {
  requesCont++;
  const persons = getUserFile();
  res.json(persons);
};

const getInfo = (req, res) => {
  const dateUp = new Date();
  res.type("text/plain");
  res.send(`Phonebook has info for ${requesCont} people \n${dateUp}`);
};

const getUserByID = (req, res) => {
  const id = Number(req.params.id);
  const person = getUserFile().find((per) => per.id === id);
  if (person) {
    res.json(person);
  } else {
     res.json('Error user not found')
  }
};

const deletePersonByID = (req, res) => {
  const id = Number(req.params.id);
  persons = getUserFile().filter((person) => person.id !== id);
  fs.writeFileSync(jsonPath, JSON.stringify(persons, null, 2), 'utf-8'); 
  res.json(persons);
};

const addPerson = (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (body.number) {
    const numberExist = getUserFile().filter(
      (person) => person.number === body.number,
    );

    console.log("Existe number: ", numberExist);

    if (numberExist.length > 0) {
      return res.status(400).json({
        error: "number duplicate must be unique",
      });
    }
  }
  const maxID = getUserFile().length >0 
    ? Math.max(...getUserFile().map(u => Number(u.id))) 
    : 0;

  const person = {
    id: maxID + 1,
    name: body.name || "Sin registro dato",
    number: body.number || "000000000",
  };

  usuariosJSON = getUserFile().concat(person);
  fs.writeFileSync(jsonPath, JSON.stringify(usuariosJSON, null, 2), 'utf-8');

  res.json(getUserFile());
};

const updatePerson = (req, res) =>{
    
  const id = Number(req.params.id);
  const body = req.body;
  const personIndex = getUserFile().findIndex(p => p.id === id);
  const persons  =  getUserFile();

  persons[personIndex] = {
    ...persons[personIndex],
    ...body
  }

  fs.writeFileSync(jsonPath, JSON.stringify(persons, null, 2), 'utf-8');
  console.log("User update succesfully");
  
  res.json(getUserFile()) 
};

module.exports = {
  getUser,
  getInfo,
  getUserByID,
  deletePersonByID,
  addPerson,
  updatePerson
};
