export interface RequestRegisterUser {
  username: string;
  email: string;
  password: string;
  fullName: string;
  profileImageUrl: string;
}

export interface RequestLoginUser {
  email: string;
  password: string;
}