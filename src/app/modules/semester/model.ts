import { Schema, model } from 'mongoose';
import { ISemester, SemesterModel } from './interface';
import { semesterCodes, semesterMonths, semesterTitle } from './constant';
import APIError from '../../../errors/ApiError';
// import httpStatus from 'http-status';

const semesterSchema = new Schema<ISemester>(
  {
    title: { type: String, required: true, enum: semesterTitle },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: semesterCodes },
    startMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

semesterSchema.pre('save', async function (next) {
  const isExit = await academicSemester.findOne({
    code: this.code,
    year: this.year,
  });

  if (isExit) {
    throw new APIError(400, 'Academic Semester is already exist !!!');
  } else {
    next();
  }
});

export const academicSemester = model<ISemester, SemesterModel>(
  'academicSemester',
  semesterSchema
);
