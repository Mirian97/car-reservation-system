export enum Role {
  User = 'user',
  Admin = 'admin',
}

export type User = {
  _id: string;
  name: string;
  email: string;
  roles: Role[];
  password?: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginForm = Required<Pick<User, 'email' | 'password'>>;

export type SignUpForm = LoginForm & Pick<User, 'name'>;

export type AuthResponse = {
  token: string;
  user: User;
};
