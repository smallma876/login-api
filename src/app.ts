import express from 'express';
import { createUser, getUsers } from './controllers/user.controller';
import connectToDatabase from './utils/database';

const app = express();
const unusedVariable = "I'm not used";
// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

connectToDatabase()
  .then(() => {
    console.log('Conectado a la base de datos login');

    app.post('/users', createUser);
    app.get('/users', getUsers);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
