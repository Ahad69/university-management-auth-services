import { Model, Types } from 'mongoose';
import { IFaculty } from '../academicFaculty/interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IFaculty;
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
