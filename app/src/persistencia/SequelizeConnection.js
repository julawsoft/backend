const { Sequelize } = require('sequelize');
const config = require('./config.js')

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class SequelizeConnection {

  static instance
  constructor() {
    if (!this.instance) {
        this.instance = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: 'mysql',
        // timestamps: true,
      });
    }
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