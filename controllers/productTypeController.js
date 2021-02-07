const productTypeModel = require('../models/productTypeModel');
const Joi = require('joi');

// find producttype all
exports.findAll = (req, res) => {
    productTypeModel.findAll((err, products) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products_type: products
            })
    });
}


// find by id
exports.findByID = (req, res) => {
    const id = req.params.id;
    productTypeModel.findByID(id, (err, product) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products_type: product
            })
    })
}

// create product type
exports.create = (req, res) => {
    const { name } = req.body;

    const newproduct = new productTypeModel({
        name: name
    });

    const { error } = validateProductType(newproduct);
   
    if (error) return res.send(error.details[0].message);

    productTypeModel.create(newproduct, (err, product) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products_type: product
            })
    })
}

// update product type
exports.update = (req, res) => {
    const id = req.params.id;
    const product = new productTypeModel({
        name: req.body.name
    });

    const { error } = validateProductType(product);
    if (error) return res.send(error.details[0].message);

    productTypeModel.update(id, product, (err, product) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products_type: product
            })
    })
}

// remove product type
exports.remove = (req, res) => {
    const id = req.params.id; 
    productTypeModel.remove(id, (err, product) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products_type: product
            })

    })
}

// validate product type
function validateProductType(product) {
    const schema = Joi.object({
        name: Joi.string().required(),
        create_at: Joi.date().required(),
        update_at: Joi.date().required(),
    })

    return schema.validate(product);
}