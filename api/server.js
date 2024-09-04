import  app  from './src/infrastructure/webserver/app.js'
import { PORT } from './src/infrastructure/webserver/util.js'
import terminate from './src/infrastructure/webserver/terminate.js';

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const exitHandler = terminate(app, {
    coredump: false,
    timeout: 500,
  });
  
  process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
  process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
  process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
  process.on('SIGINT', exitHandler(0, 'SIGINT'));
  