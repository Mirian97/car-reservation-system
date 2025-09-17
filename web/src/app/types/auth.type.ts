export type Token = {
  token: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  name: string;
} & LoginForm;
