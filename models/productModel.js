const db = require('../config/db');


// product schema
const Product = function (products) {
    this.product_type = products.product_type;
    this.name = products.name;
    this.price = products.price;
    this.create_at = new Date();
    this.update_at = new Date();
}

// find product  all
Product.findAll = result => {
    db.query(`select a.id, b.name as product_type, a.name, a.price from products a left join products_type b on a.product_type = b.id`, (err, res) => {
        if (err) {
            result(null, err);
        }

        return result(null, res);
    })
}

// find by id 
Product.findByID = (id, result) => {
    db.query(`select a.id, b.name as product_type, a.name, a.price from products a left join products_type b on a.product_type = b.id where a.id = ?`, id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    })
}

// create products 
Product.create = (newproduct, result) => {
    db.query(`insert into products set ?`, newproduct, (err, res) => {
        if (err) {
            result(null, err);
        }

        result(null, { id: res.insertId, ...newproduct });
    });
}

// remove product 
Product.remove = (id, result) => {
    db.query(`delete from products where id = ?`, id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found product 
            result({ productid: "not_found" }, null);
            return;
        }

        result(null, res);
    })
}

// update product 
Product.update = (id, product, result) => {
    const sql = `update products set product_type = ?, name =  ?, price = ? where id = ${id}`;
    const values = [product.product_type, product.name, product.price];
    db.query(sql, values, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found product 
            result({ productid: "not_found" }, null);
            return;
        }

        result(null, { id: id, ...product });
    })
}

module.exports = Product;