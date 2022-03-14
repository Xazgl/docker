const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class СlientModel extends Model { }

СlientModel.init({
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

module.exports = СlientModel