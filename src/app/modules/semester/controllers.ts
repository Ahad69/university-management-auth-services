import { Request, Response } from 'express';
import {
  createSemesterService,
  deleteSemesterServices,
  getAllSemestarService,
  getSingleSemesterServices,
  updateSemesterServices,
} from './services';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { ISemester } from './interface';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { semesterFilterField } from './constant';

export const createSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...semesterData } = req.body;

    const semester = await createSemesterService(semesterData);

    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully!',
      data: semester,
    });
  }
);

export const getAllSemestar = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterFilterField);
    const paginationOptions = pick(req.query, paginationFields);
    const semesters = await getAllSemestarService(filters, paginationOptions);

    sendResponse<ISemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrived successfully!',
      data: semesters.data,
      meta: semesters.meta,
    });
  }
);

export const getSingleSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const semesters = await getSingleSemesterServices(id);

    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrived successfully!',
      data: semesters,
    });
  }
);

export const updateSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const semesters = await updateSemesterServices(id, data);

    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Update successfully!',
      data: semesters,
    });
  }
);

export const deleteSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const semesters = await deleteSemesterServices(id);
    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Delete successfully!',
      data: semesters,
    });
  }
);
