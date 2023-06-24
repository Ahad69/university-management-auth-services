// import { ISemester } from '../semester/interface';
import { ISemester } from '../semester/interface';
import { User } from './model';

export const lastStudentId = async () => {
  const user = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return user?.id ? user?.id.substring(4) : null;
};

export const generateStudentId = async (semester: ISemester | null) => {
  const currentId = (await lastStudentId()) || (0).toString().padStart(5, '0'); //00000

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${semester?.year.substring(2)}${
    semester?.code
  }${incrementedId}`;

  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};
