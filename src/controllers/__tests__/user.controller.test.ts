import { loginUser, registerUser } from '../user.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from 'models/user.model';
import { requestLoginUser, requestRegisterUser } from './__mocks__/user.mock';
import { mapperRequestToUser } from 'mappers/user.mapper';

jest.mock('./../../models/user.model');
jest.mock('bcryptjs');

describe('registerUser', () => {
  it('should return a user and message', async () => {
    const req = {} as Request;
    const res = {} as Response;

    req.body = requestRegisterUser;
    const responseMock = await mapperRequestToUser(requestRegisterUser);

    (bcrypt.genSalt as jest.Mock).mockResolvedValue('somesalt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
    (UserModel.create as jest.Mock).mockResolvedValue(responseMock);

    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario creado',
      user: responseMock,
    });
  });

  it('should return 500 error if there is a server error', async () => {
    const req = {} as Request;
    const res = {} as Response;

    req.body = requestRegisterUser;

    (bcrypt.genSalt as jest.Mock).mockResolvedValue('somesalt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
    (UserModel.create as jest.Mock).mockRejectedValue(
      new Error('Server error')
    );

    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Ha ocurrido un error interno del servidor',
    });
  });
});

describe('loginUser', () => {
  it('should return a token and user when email and password are correct', async () => {
    const req = {} as Request;
    const res = {} as Response;

    req.body = requestLoginUser;

    const mockUser = {
      id: '123',
      email: 'test@example.com',
      hashed_password: 'hashedpassword',
    };
    jwt.sign = jest.fn().mockImplementation(() => 'token');
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    res.cookie = jest.fn().mockReturnThis();
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await loginUser(req, res);

    expect(res.cookie).toHaveBeenCalledWith('access_token', 'Bearer token', {
      secure: false,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: mockUser,
    });
  });

  it('should return 500 error if there is a server error', async () => {
    const req = {} as Request;
    const res = {} as Response;

    req.body = requestLoginUser;

    jwt.sign = jest.fn().mockImplementation(() => 'token');
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (UserModel.findOne as jest.Mock).mockRejectedValue(
      new Error('Server error')
    );

    res.cookie = jest.fn().mockReturnThis();
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error interno del servidor',
    });
  });

  it('should return 404 error if use was not founded', async () => {
    const req = {} as Request;
    const res = {} as Response;

    req.body = requestLoginUser;

    jwt.sign = jest.fn().mockImplementation(() => 'token');
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    res.cookie = jest.fn().mockReturnThis();
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario no encontrado',
    });
  });

  it('should return 400 error if password was incorrect', async () => {
    const req = {} as Request;
    const res = {} as Response;

    req.body = requestLoginUser;

    const mockUser = {
      id: '123',
      email: 'test@example.com',
      hashed_password: 'hashedpassword',
    };

    jwt.sign = jest.fn().mockImplementation(() => 'token');
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    res.cookie = jest.fn().mockReturnThis();
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Contraseña incorrecta',
    });
  });
});
