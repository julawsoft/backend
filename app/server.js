const app = require('./src/app.js')
const { PORT }  = require('./src/const.js')
const terminate = require('./src/terminate.js');

const exitHandler = terminate(app, {
  coredump: false,
  timeout: 500,
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));

