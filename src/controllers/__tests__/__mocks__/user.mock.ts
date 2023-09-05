import { RequestLoginUser, RequestRegisterUser } from 'domain/user';

export const requestRegisterUser: RequestRegisterUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'testpassword',
  fullName: 'Test User',
  profileImageUrl: 'http://example.com/test.jpg',
};

export const requestLoginUser: RequestLoginUser = {
  email: 'test@example.com',
  password: 'testpassword',
};
