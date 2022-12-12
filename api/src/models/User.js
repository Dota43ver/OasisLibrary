const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // lastName: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shoppingCart: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: "SignedInWithGoogle",
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    },
    {
      timestamps: false,
    }
  );
};
