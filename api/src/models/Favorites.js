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
        // bookTitle: {
        //   type: DataTypes.STRING,
        //   allowNull: false
        // },
        // price: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false
        // },
        // image: {
        //   type: DataTypes.STRING,
        // },
    },
    {
      timestamps: false,
    }
  );
};