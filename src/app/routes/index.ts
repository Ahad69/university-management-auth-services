import express from 'express';
import { UserRouters } from '../modules/users/router';
import { SemesterRoutes } from '../modules/semester/routes';
import { Faculty } from '../modules/academicFaculty/router';
import { AcademicDepartmentRoutes } from '../modules/department/routes';
import { FacultyRoutes } from '../modules/user-faculty/routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/semester',
    route: SemesterRoutes,
  },
  {
    path: '/aculties',
    route: Faculty,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
