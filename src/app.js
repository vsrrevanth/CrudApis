'use strict'
const express = require('express')
const path = require("path")
const routes = require("./routes/userRoutes")
const bodyParser = require("body-parser")

// Create the express app
const app = express()
// Routes and middleware
// app.use(/* ... */)
// app.get(/* ... */)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(routes)
app.use(express.static(path.join(__dirname, 'public')));

// Error handlers
app.use(function fourOhFourHandler (req, res) {
  res.status(404).send()
})
app.use(function fiveHundredHandler (err, req, res, next) {
  console.error(err)
  res.status(500).send()
})

module.exports = app