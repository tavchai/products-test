const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "products_test"
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Connect DB Suc...`);
    }
   
});

module.exports = db;