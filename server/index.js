const express = require('express')
const { errorHandler } = require('./handlers/index')
const app = express();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.json({ message: "HELLO WORLD" })
})

//http://localhost:3000/anything
app.use((req, res, next) => {
    const err = new Error("Not Found")
    err.status = 404;

    next(err)
})

app.use(errorHandler)


app.listen(port, console.log(`Server Stated on http:\\localhost:${port}`))