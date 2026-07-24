const express = require("express");
const cors = require('cors');
const userRoutes = require('./src/routes/usuariosRoutes')
/*const globalErrorHandlder = require('./src/middlewares/errosMiddleware');*/
const morgan = require('morgan');

require('dotenv').config();
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('body', (req) => {
  if(req.body){
    return JSON.stringify(req.body)
  }
    return  "";
})

const app = express();

app.use(cors({origin: ['http://localhost:5173', 'http://192.168.80.73:5173', 'http://localhost:3001', 'https://api-agenda-lha.onrender.com','https://agenda-frontend-lha.vercel.app'], methods: ['GET', 'POST', 'PATCH', 'DELETE']}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3001;

app.use('/api/persons', userRoutes)

app.use(unknownEndpoint);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`);
});
