import { User } from './model';
import { IUser } from './interface';
import { generateFacultyId, generateStudentId } from './utilis';
import config from '../../../config';
import { IStudent } from '../students/interface';
import { academicSemester } from '../semester/model';
import mongoose from 'mongoose';
import { Student } from '../students/model';
import APIError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IFaculty } from '../user-faculty/interface';
import { Faculty } from '../user-faculty/model';

export const createStudentService = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default pass
  if (!user.password) {
    user.password = config.default_password as string;
  }
  // set role
  user.role = 'student';

  const findSemester = await academicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(findSemester);

    user.id = id;
    student.id = id;

    const createStudent = await Student.create([student], { session });
    if (!createStudent.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Something Error');
    }

    user.student = createStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const createFacultyService = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default pass
  if (!user.password) {
    user.password = config.default_password as string;
  }
  // set role
  user.role = 'student';

  const findSemester = await academicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(findSemester);

    user.id = id;
    student.id = id;

    const createStudent = await Student.create([student], { session });
    if (!createStudent.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Something Error');
    }

    user.student = createStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_password as string;
  }
  // set role
  user.role = 'faculty';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new APIError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};
