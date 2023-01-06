const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "favorites",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
        bookTitle: {
          type: DataTypes.STRING,
          allowNull: false
        }
    },
    {
      timestamps: false,
    }
  );
};