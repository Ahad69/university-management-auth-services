import { Model, Types } from 'mongoose';
import { IStudent } from '../students/interface';
import { IFaculty } from '../user-faculty/interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId | IAdmin;

  // faculty: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
