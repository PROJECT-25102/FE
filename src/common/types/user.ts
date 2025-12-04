export interface IUser {
  _id: string;
  userName: string;
  avatar: string;
  email: string;
  phone: string;
  isVerifed: boolean;
  role: string;
}

export interface IPayloadUpdateUser {
  avatar: string;
  email: string;
  phone: string;
  userName: string;
}
