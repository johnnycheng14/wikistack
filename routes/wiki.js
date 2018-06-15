const express = require('express');
const router = express.Router();
module.exports = router;

const { Page } = require('../models');
const { addPage } = require('../views');
// const { wikiPage } = require('../views');

router.get('/', (req, res, next) => {
    res.send();
})

router.post('/', async (req, res, next) => {
    const page = req.body;
    const newPage = new Page({
        title: page.title,
        content: page.content
    });
    try {
        await newPage.save();
        res.redirect('/');
    }
    catch (error) {
        next(error);
    }
})

router.get('/add', (req, res, next) => {
    res.send(addPage());
})
