const app  = require("./app")

// Start server
app.listen(3000, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log('Started at http://localhost:3000')
})
