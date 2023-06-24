import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './validation';
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
} from './controller';
// import { AcademicDepartmentController } from './controller';
// import { AcademicDepartmentValidation } from './validations';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  createDepartment
);

router.get('/:id', getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  updateDepartment
);

router.delete('/:id', deleteDepartment);

router.get('/', getAllDepartments);

export const AcademicDepartmentRoutes = router;
