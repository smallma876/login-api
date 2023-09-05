import { mapperRequestToUser } from 'mappers/user.mapper';
import { requestRegisterUser } from '../__mocks__/user.mock';

export const registerUserStub = mapperRequestToUser(requestRegisterUser);
