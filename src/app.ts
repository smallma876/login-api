import express from 'express';
import connectToDatabase from './utils/database';
import tweetRoutes from './routes/tweet.routes';
import userRoutes from './routes/user.routes';

const app = express();
// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

connectToDatabase()
  .then(() => {
    console.log('Conectado a la base de datos login');

    app.use('/', userRoutes);
    app.use('/tweets', tweetRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
