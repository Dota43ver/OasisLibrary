const { Author } = require("../db");
const jsonData = require("../api.json");
async function getAuthors() {
  // Crear autores en la base de datos a partir del archivo JSON
  jsonData.map((e) => {
    Author.findOrCreate({
      where: {
        name: e.author,
      },
    });
  });

  // Obtener todos los autores de la base de datos
  const allAuthors = await Author.findAll();
  return allAuthors;
}

// Buscar autores por nombre
const getAuthorsByName = async (name) => {
  const query = name.toLowerCase();
  const authors = await Author.findAll();
  const filteredAuthors = authors.filter((el) =>
    el.name.toLowerCase().includes(query)
  );
  return filteredAuthors;
};

// Buscar autor por ID
async function getAuthorById(id) {
  const author = await Author.findByPk(id);
  return author;
}

// Crear un nuevo autor
async function createAuthor(name) {
  const author = await Author.create({
    name,
  });
  return author;
}

module.exports = {
  getAuthors,
  getAuthorsByName,
  getAuthorById,
  createAuthor,
};
