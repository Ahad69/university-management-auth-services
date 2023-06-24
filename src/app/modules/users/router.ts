import express from 'express';
import { createFaculy, createStudent } from './controllers';
import { createFacultyZodSchema, createUserZodSchema } from './validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  createStudent
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  createFaculy
);

export const UserRouters = router;
