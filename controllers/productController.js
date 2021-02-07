const productModel = require('../models/productModel');
const Joi = require('joi');

// find products all
exports.findAll = (req, res) => {
    productModel.findAll((err, products) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products: products
            })
    });
}


// find by id
exports.findByID = (req, res) => {
    const id = req.params.id;
    productModel.findByID(id, (err, product) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products: product
            })
    })
}

// create product 
exports.create = (req, res) => {
    const { product_type, name, price } = req.body;

    const newproduct = new productModel({
        product_type: product_type,
        name: name,
        price: price
    });

    const { error } = validateProduct(newproduct);

    if (error) return res.send(error.details[0].message);

    productModel.create(newproduct, (err, product) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products: product
            })
    })
}

// update product 
exports.update = (req, res) => {
    const id = req.params.id;
    const product = new productModel({
        product_type: req.body.product_type,
        name: req.body.name,
        price: req.body.price
    });

    const { error } = validateProduct(product);
    if (error) return res.send(error.details[0].message);

    productModel.update(id, product, (err, product) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products: product
            })
    })
}

// remove product 
exports.remove = (req, res) => {
    const id = req.params.id;
    productModel.remove(id, (err, product) => {
        if (err) {
            res.status(500)
                .json({
                    err: err
                })
        }

        res.status(201)
            .json({
                products: product
            })

    })
}

// validate product type
function validateProduct(product) {
    const schema = Joi.object({
        product_type: Joi.required(),
        name: Joi.string().required(),
        price: Joi.required(),
        create_at: Joi.date().required(),
        update_at: Joi.date().required(),
    })

    return schema.validate(product);
}