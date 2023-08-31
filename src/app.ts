import express from 'express';
import cors from 'cors';
import connectToDatabase from './utils/database';
import tweetRoutes from './routes/tweet.routes';
import userRoutes from './routes/user.routes';
import { authMiddleware } from 'middleware/auth.middleware';

export const app = express();
app.use(cors());
// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

connectToDatabase()
  .then(() => {
    console.log('Conectado a la base de datos login');

    app.use('/', userRoutes);
    app.use('/tweets', authMiddleware, tweetRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
