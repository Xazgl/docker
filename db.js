const { Sequelize } = require("sequelize");

// @ts-check
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// конструктор для подключение  sequelize

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
});


//теперь за экспортируем это 
module.exports = sequelize;