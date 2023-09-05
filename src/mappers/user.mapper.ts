import { User } from 'models/user.model';
import bcrypt from 'bcryptjs';
import { RequestRegisterUser } from 'domain/user';

export const mapperRequestToUser = async (
  reqBody: RequestRegisterUser
): Promise<User> => {
  const salt = await bcrypt.genSalt(10); // genera una sal con 10 rondas (puedes ajustar este número según tus necesidades)
  const hashedPassword = await bcrypt.hash(reqBody.password, salt);

  return {
    username: reqBody.username,
    email: reqBody.email,
    hashed_password: hashedPassword,
    full_name: reqBody.fullName,
    profile_image_url: reqBody.profileImageUrl,
  };
};
