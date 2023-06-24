import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorlogger, infologger } from './shared/logger';
import { Server } from 'http';

let server: Server;

process.on('uncaughtException', error => {
  console.log(
    '💡🔦🏮 unhandle error found, so our server is closing now',
    error
  );

  process.exit(1);
});

async function myServer() {
  try {
    await mongoose.connect(config.database as string);

    infologger.info('database connected');

    server = app.listen(config.port, () => {
      infologger.info(`University Is Running at ${config.port}`);
    });
  } catch (error) {
    errorlogger.error(`error.message ${error}`);
  }

  process.on('unhandledRejection', error => {
    console.log('✂ unhandle error found, so our server is closing now', error);
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    }
    process.exit(1);
  });
}
myServer();

process.on('SIGTERM', () => {
  infologger.info('SIGTERM is Received');
  if (server) {
    server.close();
  }
});
