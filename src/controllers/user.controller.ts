import UserModel from '../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../globals';
import { mapperRequestToUser } from 'mappers/user.mapper';

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await mapperRequestToUser(req.body);

    const user = await UserModel.create(newUser);
    console.log('Usuario creado:', user);

    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({
      message: 'Ha ocurrido un error interno del servidor',
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  console.log('req.body:', req.body);
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.cookie('access_token', `Bearer ${token}`, { secure: false }).status(200).json({
      success: true,
      user,
    });
    /* res.json({ message: 'Usuario logueado', token }); */
  } catch (error) {
    console.error('Error al iniciar sesion:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export { registerUser, loginUser };
