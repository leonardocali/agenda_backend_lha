const mongoose = require("mongoose");
const { log } = require("node:console");
const dns = require("node:dns");

// Mantenemos la resolución DNS limpia para tu red
dns.setServers(["8.8.8.8", "8.8.4.4"]);

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

//console.log("Argumentos en proccess: ", process.argv);

// IMPORTANTE: Asegúrate de tener el [2] para capturar solo la clave de la terminal
const password = encodeURIComponent(process.argv[2]);
const name = process.argv[3];
const phone = process.argv[4];

// Eliminamos parámetros adicionales complejos de la URL para que Atlas autodetecte la base de datos
const url = `mongodb+srv://alejaleojulian_db_user:${password}@agendabdlha.xpzrz01.mongodb.net/agendaBDLHA?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

//Definicion del esquema a guardar
const userSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//Defeinir el modelo
const User = mongoose.model("User", userSchema);

// Conectamos de forma limpia sin pasar el objeto de opciones SCRAM manuales
const initApp = async () => {
  try {
    await mongoose.connect(url);
    console.log("¡Conectado exitosamente a MongoDB Atlas!");
    if (name && phone) {
      //Creamos la instancia del modelo en la constante user
      const user = new User({
        name: name,
        number: phone,
      });

      await user.save();
      console.log(`added ${name} number phone: ${phone} to phonebook`);
    } else {
      //console.log("No se dieron los parametros");
      const userBD = await User.find({});
      console.log("\n--- User PhoneBook ---");
      userBD.forEach((u) => {
        console.log(`${u.name} ${u.number}`);
      });
      console.log("---------------------------\n");
    }

    await mongoose.connection.close();
    console.log("Conexion cerrada correctamente");
  } catch (err) {
    console.error("Detalle del error recibido del servidor:");
    console.error(err);
    process.exit(1);
  }
};

initApp();
