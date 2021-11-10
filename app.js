const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRouter = require('./routers/products')
const userRouter = require('./routers/users')
const bidRouter = require('./routers/bids')
const categoryRouter = require('./routers/categories')
const morgan = require('morgan')


require('dotenv/config')
const api = process.env.API_URL
const dbConnection = process.env.CONNECTION_URL

app.use(express.json())
app.use(morgan('tiny'))
app.use(`${api}/products`, productRouter)
app.use(`${api}/users`, userRouter)
app.use(`${api}/bids`, bidRouter)
app.use(`${api}/categories`, categoryRouter)

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'bidhunter'
}).then(()=>{
    console.log('connection with database successful')
}).catch(err =>{
    console.log(err)
})

app.listen(3001, ()=>{
    console.log('server running on http://localhost:3001')
})