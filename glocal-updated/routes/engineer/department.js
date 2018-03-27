const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();


router3.get('/', (request, response, next) => {

    pool.query("SELECT * FROM users", (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL Employees');
        response.json(res.rows);
    });
});

router3.get('/se', (request, response, next) => {

    pool.query("SELECT * FROM users WHERE position= 'System Engineer' ", (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL SYSTEMS ENGINEER');
        response.json(res.rows);
    });
});

router3.get('/am', (request, response, next) => {

    pool.query("SELECT * FROM users WHERE position= 'Account Manager' ", (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL SYSTEMS ENGINEER');
        response.json(res.rows);
    });
});

module.exports = router3;