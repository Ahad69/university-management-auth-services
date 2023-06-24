import path from 'path';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

import DailyRotateFile from 'winston-daily-rotate-file';

const myFormat = printf(({ level, message, label, timestamp }) => {
  const newDate = new Date(timestamp).toDateString();
  const newTime = new Date(timestamp).toLocaleTimeString();
  return `${newDate + '-' + newTime} [${label}] ${level}: ${message}`;
});

const infologger = createLogger({
  level: 'info',
  format: combine(label({ label: 'right now!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'um-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const errorlogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'right now!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'um-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { infologger, errorlogger };
