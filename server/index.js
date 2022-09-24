require('dotenv').config()
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')

process.env.PORT = process.env.PORT || 8083


const app = express()

// logging middleware
app.use(morgan('dev'))

//  body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// compression middleware
app.use(compression())

// routers
app.use('/api', require('./api'))

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
});

// file serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// remaining requests with an extension (.js, .css, other) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error(`File Could not be located: ${req.path}`)
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// send index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// error handlers
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Endpoint Server Error')
})

function bootStartApp() {
  console.log('Creating Server: ' + (process.env.DATABASE_NAME || 'no name provided'))
  if (require.main === module) {
    return (startServer())
  }
}

const startServer = () => {
  // syncDb()
  // start listening and creates a server object
  return app.listen(process.env.PORT, () => {
    console.log(`App initializing. Now running on Port ${process.env.PORT}`)
  })
}

// const syncDb = async () => {
//   await db.sync()
// }

const server = bootStartApp()

module.exports = server
