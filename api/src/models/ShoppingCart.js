const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "shopping_cart",
    {
      products: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shippingCost: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
