export type CreateUserDto = {
  password: string;
  email: string;
  username: string;
  phoneNumber: string;
}

export type loginUserDto = {
  email: string;
  password: string;
}