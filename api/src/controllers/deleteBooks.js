const { Book } = require ('../db');

const deleteBooks = async (id) => {
    const book = await Book.findByPk(id);
    await book.destroy();
}

module.exports = {
    deleteBooks
};