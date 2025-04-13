const mysql = require('mysql');
const express = require('express');
const routes = express.Router();

const dbconfig = { 
    host: 'localhost',
    user: 'root',
    password: '',
    database: "coffiedb"
};

const conn = mysql.createConnection(dbconfig);


module.exports = async (query, values = []) => {
    return new Promise((resolve, reject) => {
        conn.query(query, values, (err, results) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(results);
            
            }
        });
    });
};
