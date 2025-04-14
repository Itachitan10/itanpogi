const mysql = require('mysql');
const express = require('express');
const routes = express.Router();

const dbconfig = {
    host: 'sql12.freesqldatabase.com',
    user: 'sql12773152',
    password: 'UUZXNxkGxN',
    database: 'sql12773152',
    port: 3306
};

const conn = mysql.createConnection(dbconfig);

conn.connect((err) => {
    if (err) {
        console.error('Connection failed: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + conn.threadId);
});

module.exports = async (query, values = []) => {
    return new Promise((resolve, reject) => {
        conn.query(query, values, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
};

