const { Sequelize } = require('sequelize')

class SequelizeConnection {

  static instance
  constructor() {
    if (!this.instance) {
        this.instance = new Sequelize('julaw', 'root', 'c9qMGlXD3Mmlvf1Dx0', {
        host: 'db',
        dialect: 'mysql',
        timestamps: true,
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