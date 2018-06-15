const express = require('express');
const router = express.Router();
module.exports = router;

const { Page } = require('../models');
const { addPage } = require('../views');
const { wikiPage } = require('../views');

router.get('/', (req, res, next) => {
    res.send();
})

Page.beforeValidate((Pageinstance) => {
    Pageinstance.slug = Pageinstance.title.replace(/\s+/g, '_').replace(/\W/g, '')
}) 

router.post('/', async (req, res, next) => {
    const page = req.body;
    const newPage = new Page({
        title: page.title,
        content: page.content,
    });

    try {
        await newPage.save();
        console.log(newPage)
        res.redirect('/');
    }
    catch (error) {
        // next(error);
    }
})

router.get('/add', (req, res, next) => {
    res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
    try {
        const temp = "" + req.params.slug;
        const foundPage = await Page.findOne({
            where: {
                slug: temp
            }
        })
        // console.log(foundPage);
        if(foundPage){
            const tempAuthor = ""
            console.log("redirecting");
            res.send(wikiPage(foundPage, tempAuthor));
        }
        else{
            res.status(404).send("Page not found.");
        }
    } catch (error) {
        next(error)
    }
    res.send();
});
  