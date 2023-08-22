import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/login';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a la base de datos login');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

export default connectToDatabase;
