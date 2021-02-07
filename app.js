const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

// import route
const productType = require('./routes/productTypeRoute');
const product = require('./routes/productRoute');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000

app.get('/', (req, res) => res.send('Test-Products'));

// route product type
app.use('/product-type',productType);

// route product
app.use('/product',product);

app.listen(port, () => console.log(`Serve Start on PORT : ${port}`));