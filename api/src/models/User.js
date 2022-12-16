const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // shoppingCart: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      role: {  // Admin or User
        type: DataTypes.STRING,
        defaultValue: 'user',
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: "SignedInWithGoogle",
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }, //Para el borrador logico
      activationToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false,
    }
  );
};
