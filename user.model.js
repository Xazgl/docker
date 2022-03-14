const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

class UserModel extends Model { }

UserModel.init({
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
},  {
    sequelize: sequelize,
    tableName: "user_db",
})

module.exports = UserModel