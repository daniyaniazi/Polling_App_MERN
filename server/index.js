require('dotenv').config()
const express = require('express')
const handler = require('./handlers/index')
const cors = require('cors')
const routes = require('./routes')
//db
const db = require('./models/index')
const app = express();
const port = process.env.PORT || 5000;



//Middlewares
app.use(cors());
app.use(express.json());
//to recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded({ extended: false })); // recognize the incoming Request Object as strings or arrays

app.use((req, res, next) => {
    console.log(`REQUEST URL : ${req.url}`)
    console.log(`REQUEST MWTHOD : ${req.method}`)
    console.log(`BODY: ${req.body}`)
    next()
})

app.use('/api/auth', routes.auth);

app.use('/api/polls', routes.poll);

app.use(handler.errorHandler)

//http://localhost:3000/anything
app.use(handler.notFound);




app.listen(port, console.log(`Server Stated on http:\\localhost:${port}`));