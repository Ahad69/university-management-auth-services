import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import {
  semesterZodSchemaValidation,
  updateSemesterZodSchema,
} from './validation';
import {
  createSemester,
  getAllSemestar,
  getSingleSemester,
  updateSemester,
  deleteSemester,
} from './controllers';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(semesterZodSchemaValidation),
  createSemester
);
router.get('/allSemester', getAllSemestar);
router.get('/:id', getSingleSemester);

router.patch('/:id', validateRequest(updateSemesterZodSchema), updateSemester);

router.delete('/:id', deleteSemester);

export const SemesterRoutes = router;
