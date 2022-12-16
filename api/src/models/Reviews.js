const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Reviews", {
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