const productTypeController = require('../controllers/productTypeController');
const express = require('express');
const route = express.Router();

route.get('/',productTypeController.findAll);
route.get('/:id',productTypeController.findByID);
route.post('/',productTypeController.create);
route.put('/:id',productTypeController.update);
route.delete('/:id',productTypeController.remove);



module.exports = route;