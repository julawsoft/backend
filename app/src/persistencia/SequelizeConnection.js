const { Sequelize } = require('sequelize');
const config = require('./config.js');
const logger = require('../utils/logger/logger.js');

/**
 *
 * @class
 */
class SequelizeConnection {

  static instance

  constructor() {
    if (!this.instance) {
      this.instance = new Sequelize(config.database, config.username, config.password, {
        host: 'db',
        dialect: 'mysql',
        // timestamps: true,
      });
    }
    logger.info(`BD Server connected successfully`)
  }

  async auth() {
    this.instance.authenticate();
  }

  async init() {
    await this.auth()
    await this.instance.sync({ force: true });
  }
  
  static getConnection() {
    return this.instance ?? new SequelizeConnection()
  }
}


module.exports = SequelizeConnection