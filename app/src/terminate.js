const logger = require('./utils/logger/logger.js')
const  loggerDIC  = require('./utils/logger/loggerDic.js')

/**
 * @param {*} server
 * @param {object} options
 * @returns {object}
*/
function terminate(server, options = { coredump: false, timeout: 500 }) {
  const exit = (code) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code, reason) => (err, promise) => {
    logger.error({
      label: loggerDIC.error.default, message: `${code}:${reason}:${err}`
    })

    if (err && err instanceof Error) {
      logger.error({
        label: loggerDIC.error.process, message: `${err.message} | ${code}: ${reason}`
      })
    }

    console.log(`${code}:${reason}:${err}`)

    // console.log(server)
    // server.close(exit);
    // setTimeout(exit, options.timeout).unref();
  };
}

module.exports = terminate;
