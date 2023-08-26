import UserModel, { User } from '../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../globals';

const registerUser = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt(10); // genera una sal con 10 rondas (puedes ajustar este número según tus necesidades)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser: User = {
      username: req.body.username,
      email: req.body.email,
      hashed_password: hashedPassword,
      full_name: req.body.fullName,
      profile_image_url: req.body.profileImageUrl,
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

const loginUser = async (req: Request, res: Response) => {
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // para HTTPS
      sameSite: 'strict', // Protección contra CSRF
    });
  } catch (error) {
    console.error('Error al iniciar sesion:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export { registerUser, loginUser };
