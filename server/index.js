const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const shortUrl = require('./models/shortUrl.js')

mongoose.connect('mongodb://localhost/url-shortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  const shortUrls = await shortUrl.find()

  res.json(shortUrls)
})

app.post('/', async (req, res) => {
  try {
    await shortUrl.create({ full: req.body.fullUrl })
  } catch (err) {
    console.log(err);  
  }
})

app.get('/:urlId', async (req, res) => {

  const shorturl = await shortUrl.findOne({ short: req.params.urlId })
  if (shorturl == null) return res.sendStatus(404)

  res.redirect(shorturl.full)

})

app.listen(5000)