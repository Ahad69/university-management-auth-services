import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createFaculty, getAllFaculties } from './controller';
import { createFacultyZodSchema } from './validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  createFaculty
);

// router.get('/:id', AcademicFacultyController.getSingleFaculty);

// router.patch(
//   '/:id',
//   validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
//   AcademicFacultyController.updateFaculty
// );

// router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', getAllFaculties);

export const Faculty = router;
