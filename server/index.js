require('dotenv').config()
const express = require('express')
const handler = require('./handlers/index')
const cors = require('cors')



const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json()); //to recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded({ extended: false })); // recognize the incoming Request Object as strings or arrays

app.get('/', (req, res) => {
    res.json({ message: "HELLO WORLD" })
})

//http://localhost:3000/anything
app.use(handler.notFound);

app.use(handler.errorHandler);


app.listen(port, console.log(`Server Stated on http:\\localhost:${port}`));