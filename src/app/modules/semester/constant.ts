import { ISemesterCodes, ISemesterMonths, ISemesterTitles } from './interface';

export const semesterMonths: ISemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const semesterTitle: ISemesterTitles[] = ['Autumn', 'Summer', 'Fall'];

export const semesterCodes: ISemesterCodes[] = ['01', '02', '03'];

export const semesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const semesterFilterField = ['searchTerms', 'title', 'code', 'year'];
