import UserModel, { User } from '../models/user.model';
import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      username: req.body.username,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      full_name: req.body.full_name,
      profile_image_url: req.body.profile_imageUrl,
    };

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

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    console.log('Usuarios:', users);

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      message: 'Ha ocurrido un error interno del servidor',
    });
  }
};

export { createUser, getUsers };
