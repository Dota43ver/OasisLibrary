const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "book",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genre: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        // allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.FLOAT,
        // allowNull: false,                 //Algunos libros no tienen score.
      },
      description: {
        // type: DataTypes.STRING,           //Algunas descripciones sobrepasan los 255 char.
        type: DataTypes.TEXT,
        allowNull: false,
      },
      authorDescription: {
        type: DataTypes.TEXT,
      },
      authorImg: {
        type: DataTypes.TEXT,
      },
      language: {
        type: DataTypes.STRING,
        // allowNull: false,                  //Algunos libros no tienen language.
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
      },

      image: {
        type: DataTypes.STRING,
        /* allowNull: false, */
      },
      saga: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
