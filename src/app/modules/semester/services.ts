import { SortOrder } from 'mongoose';
import APIError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse, ISemesterFilters } from '../../../interfaces/common';
import IPaginationOptionType from '../../../interfaces/pagination';
import { semesterTitleCodeMapper } from './constant';
import { ISemester } from './interface';
import { academicSemester } from './model';
import httpStatus from 'http-status';

export const createSemesterService = async (
  payload: ISemester
): Promise<ISemester> => {
  if (semesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new APIError(httpStatus.BAD_REQUEST, 'Invalid Code');
  }
  const res = await academicSemester.create(payload);

  return res;
};

export const getAllSemestarService = async (
  filters: ISemesterFilters,
  paginationOptions: IPaginationOptionType
): Promise<IGenericResponse<ISemester[]>> => {
  const { searchTerms, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const semesterSearchableFields = ['title', 'code', 'year'];
  const andConditions = [];
  if (searchTerms) {
    andConditions.push({
      $or: semesterSearchableFields.map(field => ({
        [field]: { $regex: searchTerms, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await academicSemester
    .find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await academicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleSemesterServices = async (
  id: string
): Promise<ISemester | null> => {
  const result = await academicSemester.findById(id);
  return result;
};

export const updateSemesterServices = async (
  id: string,
  payload: Partial<ISemester>
): Promise<ISemester | null> => {
  if (
    payload.title &&
    payload.code &&
    semesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new APIError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await academicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const deleteSemesterServices = async (
  id: string
): Promise<ISemester | null> => {
  const result = await academicSemester.findByIdAndDelete(id);
  return result;
};
