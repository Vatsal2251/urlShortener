const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require('../models/shortUrl');
const app = express();

mongoose.connect('mongodb://localhost:27017/urlShortner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.get('/', async(req, res) => {
    try {
        const shortUrls = await ShortUrl.find()
        res.render("index", { shortUrls: shortUrls });
    } catch (err) {
        throw (err);
    }
})

app.post('/shortUrls', async(req, res) => {
    try {
        await ShortUrl.create({ full: req.body.fullUrl })
    } catch (err) {
        throw (err);
    }
})

app.get('/:shortUrl', async(req, res) => {
    try {
        const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })

        if (shortUrl == null) return res.sendStatus(404)

        shortUrl.save();
        res.redirect(shortUrl.full)
    } catch (err) {
        throw (err);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
