import { Schema, model } from 'mongoose';
import { FacultyModel, IAcademicFaculty } from './interface';

const FacultySchema = new Schema<IAcademicFaculty, FacultyModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicFaculty = model<IAcademicFaculty, FacultyModel>(
  'AcademicFaculty',
  FacultySchema
);
