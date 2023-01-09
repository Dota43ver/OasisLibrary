require("dotenv").config();
const { Router } = require("express");
const { Genre, Book, Author } = require("../db");
const {
  getAuthorById,
  getAuthorsByName,
  getAuthorByName,
} = require("../controllers/getAuthors");

const jsonData = require("../api.json");
// console.log(jsonData);

const router = Router();

router.get("/", async (req, res) => {
  try {
    //CORREGIIIIIIIIIIIIIIRRRRRRRRRRRRRRRRR
    //get de autores por query (A SOLUCIONAR)
    const { name } = req.query;

    if (name) {
      let authorName = jsonData.filter((book) =>
        book.author.toLowerCase().includes(name.toLowerCase())
      );

      if (authorName.length) {
        const filterByName = [...new Set(authorName)];

        filterByName.forEach((a) => {
          Author.findOrCreate({
            where: {
              name: a.author,
            },
          });
        });
        const authorByName = await Author.findAll();
        res.status(200).send(authorByName);
      } else {
        res.status(404).send({ error: "sorry, we could not find the author" });
      }
    }

    //get de todos los autores
    else {
      const author = jsonData.map((g) => {
        return g.author;
      });

      // const filter = [... new Set (author)];

      author.forEach((a) => {
        Author.findOrCreate({
          where: {
            name: a,
          },
        });
      });

      const allAuthors = await Author.findAll();
      const authorsArray = allAuthors.map(e => e.dataValues.name)
      const uniqueAuthors = [];
      authorsArray.forEach(e => {
        if (!uniqueAuthors.includes(e)) {
          uniqueAuthors.push(e);
      }
      })
      // console.log(authorsArray);
      res.status(200).send(uniqueAuthors);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const author = await getAuthorById(id);
    res.status(200).send(author);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// endpoint /name no estaria funcionando
router.get("/name/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const author = await getAuthorsByName(name);
    res.status(200).send(author[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    let { name } = req.body;

    const createAuthor = await Author.create({
      name,
    });

    return res
      .status(200)
      .send({ message: "Autor creado con exito", createAuthor });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
