import { createFaculty, createStudentService } from './services';
import catchAsync from '../../../shared/catchAsync';
import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './interface';
import httpStatus from 'http-status';

export const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;

  const user = await createStudentService(student, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: user,
  });
});

export const createFaculy: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await createFaculty(faculty, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);
