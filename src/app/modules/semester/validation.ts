import { z } from 'zod';
import { semesterCodes, semesterMonths, semesterTitle } from './constant';

export const semesterZodSchemaValidation = z.object({
  body: z.object({
    title: z.enum([...semesterTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...semesterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...semesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...semesterMonths] as [string, ...string[]], {
      required_error: 'End Month is required',
    }),
  }),
});

export const updateSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...semesterTitle] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: z.enum([...semesterCodes] as [string, ...string[]]).optional(),
      startMonth: z
        .enum([...semesterMonths] as [string, ...string[]], {
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...semesterMonths] as [string, ...string[]], {
          required_error: 'End month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );
