export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IAuth {
  auth: {
    token: string;
    user: {
      name: string;
      email: string;
      id: number;
    };
  };
}
