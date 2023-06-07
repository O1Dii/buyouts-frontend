const path = require('path')
const express = require('express')
const app = express(),
  DIST_DIR = path.join(__dirname, '../app/static/dist'),
  HTML_FILE = path.join(DIST_DIR, 'index.html')
app.use(express.static(DIST_DIR))

const urls_list = ['/', '/my-items', '/buyouts', '/delivery', '/buyouts/detail/0'];

for (const item of urls_list) {
  app.get(item, (req, res) => {
    res.sendFile(HTML_FILE)
  })
}

app.use('/static/dist', express.static(DIST_DIR))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})