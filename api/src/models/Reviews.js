const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Reviews", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
        descript: {
            type: DataTypes.STRING,
            allowNull: false
        },
        votes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}