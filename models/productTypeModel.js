const db = require('../config/db');


// product schema
const ProductsType = function (products) {
    this.name = products.name;
    this.create_at = new Date();
    this.update_at = new Date();
}

// find product type all
ProductsType.findAll = result => {
    db.query(`select * from products_type`, (err, res) => {
        if (err) {
            result(null, err);
        }

        return result(null, res);
    })
}

// find by id 
ProductsType.findByID = (id, result) => {
    db.query(`select * from products_type where id = ?`, id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
 
        result(null, res);
    })
}

// create products type
ProductsType.create = (newproduct, result) => {
    db.query(`insert into products_type set ?`, newproduct, (err, res) => {
        if (err) {
            result(null, err);
        }

        result(null, { id: res.insertId, ...newproduct });
    });
}

// remove product type
ProductsType.remove = (id, result) => {
    db.query(`delete from products_type where id = ?`, id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found product type
            result({ productid: "not_found" }, null);
            return;
        }
 
        result(null, res);
    })
}

// update product type
ProductsType.update = (id, product,result) => {
    const sql =  `update products_type set name =  ? where id = ${id}`;
    const values = [product.name];
    db.query(sql,values,(err,res)=>{
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found product type
            result({ productid: "not_found" }, null);
            return;
        }

        result(null, { id: id, ...product });
    })
}

module.exports = ProductsType;