import { registerUser } from '../user.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from '../../models/user.model';
import { requestRegisterUser } from './__mocks__/user.controller.mock';
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
});
