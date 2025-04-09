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

module.exports = async (data) => { 
    return new Promise((resolve, reject) => { 
        conn.query(data, (err, results) => {
            if (err) {
                reject(err);
                return;
            } else { 
                resolve(results);
                console.log('Connected');
            }
        });
    });
};
