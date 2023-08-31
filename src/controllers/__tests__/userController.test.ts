import { registerUser, loginUser } from './../user.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from './../../models/user.model';

jest.mock('./../../models/user.model');
jest.mock('bcryptjs');

describe('registerUser', () => {
  it('should return a user and message', async () => {
    const req = {} as Request;
    const res = {} as Response;

    req.body = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      fullName: 'Test User',
      profileImageUrl: 'http://example.com/test.jpg',
    };

    const mockUser = {
      username: 'testuser',
      email: 'test@example.com',
      hashed_password: 'hashedpassword',
      full_name: 'Test User',
      profile_image_url: 'http://example.com/test.jpg',
    };

    (bcrypt.genSalt as jest.Mock).mockResolvedValue('somesalt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
    (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario creado',
      user: mockUser,
    });
  });
});
