const axios = require('axios');
const cheerio = require('cheerio');
const {Router, response} = require('express');

const wScrapperRouter = Router()


wScrapperRouter.get('/', async (req, res) => {
    const url = "https://elpais.com/noticias/libros/";
    try {

        async function articles() {
            const articles = [];
            const response = await axios(url)
            const html = response.data;
            const $ = cheerio.load(html);

                $('.c_t', html).each( function() {
                    const title = $(this).text();
                    const url = $(this).find('a').attr('href');
                    articles.push({
                        title,
                        url: "elpais.com" + url
                    });
                })
                // console.log(articles);
            return articles
            }
            const data = await articles()
            const primero = data[0]
            // res.status(200).send({Msg: 'Acá estan tus artículos 😎', primero});


        // articles.forEach( e => {
        //     axios(e.url)
        //     .then(response => {
        //         const articleHtml = response.data;
        //         const $ = cheerio.load(articleHtml);

        //         const body = $('a_st', articleHtml).text()
        //         article.push({
        //             body
        //         });
        //         // console.log($)
        //         res.status(200).send({Msg: 'Acá estan tus noticias 😎', article})
        //     })
        // })

// console.log(primero.url); 
async function article() {
    const article = [];
    const response = await axios("https://www.lanacion.com.ar/cultura/las-obras-de-que-escritores-quedan-libres-de-derechos-en-2023-nid02012023/")
    // console.log(response);
    const html = response.data;
    const $ = cheerio.load(html);

    const body = $('.com-paragraph').text()
    const img = $('.com-image').attr('src')
    article.push({
        body,
        img
    });

        // console.log(article);
    return article
    }
    const dataArticle = await article()
    res.status(200).send({Msg: 'Acá estan tus noticias 😎', dataArticle})

    } catch (error) {
        console.log(error);
        // res.status(401).send({error: error.message})
    }
})

module.exports = wScrapperRouter;