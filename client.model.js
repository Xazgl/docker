const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class –°lientModel extends Model { }

–°lientModel.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false 
    },
},  {
    sequelize: sequelize,
    tableName: "client_db",
})

module.exports = –°lientModel