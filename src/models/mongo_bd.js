const mongoose = require("mongoose");
require('dotenv').config();

const dns = require("node:dns");

// Mantenemos la resolución DNS limpia para tu red
dns.setServers(["8.8.8.8", "8.8.4.4"]);

let password = encodeURIComponent(process.env.PASSBD)

const URL_MONGO = `mongodb+srv://alejaleojulian_db_user:${password}@agendabdlha.xpzrz01.mongodb.net/agendaBDLHA?retryWrites=true&w=majority`;

//mongoose.set("strictQuery", false);

mongoose.connect(URL_MONGO, {
  serverSelectionTimeoutMS: 10000
})
.then(() => console.log('✅ Conectado exitosamente a MongoDB'))
.catch((err) => console.log('❌ Error de conexión a MongoDB:', err));


//Definicion del esquema a guardar
const userSchema = new mongoose.Schema({
  name: String,
  number: String,
}, { collection: 'users'});

//Defeinir el modelo
const PersonModel = mongoose.model("User", userSchema);

module.exports = { PersonModel };

