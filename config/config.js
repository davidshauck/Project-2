require("dotenv").config();

module.exports = {
    "development": {
      "username": "root",
      "password": "Hazel123",
      "database": "bananaKnifeFight",
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql"
    },
    // "production": {
    //   "username": "root",
    //   "password": null,
    //   // "database": "database_production",
    //   "database": process.env.HEROKU_PW,
    //   "host": "127.0.0.1",
    //   "port": 3306,
    //   "dialect": "mysql"
    // },
    "production": {
      "use_env_variable": process.env.JAWSDB_URL,
      "dialect": "mysql"
    }
  }
  