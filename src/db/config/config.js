const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./database.sqlite3"
  },
  test: {
    dialect: "sqlite",
    storage: "./database.sqlite3"
  },
  production: {
    dialect: "sqlite",
    storage: "./database.sqlite3"
  }
}