const { Router } = require('express');
const pool = require('../../db');

const router6 = Router();

router6.get('/', (request, response, next) => {
    pool.query('SELECT * from products', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM products TABLE');
        response.json(res.rows);
    });
});

router6.get('/:vendor', (request, response, next) => {
    const { vendor } = request.params
    pool.query('SELECT *  FROM products WHERE vendor = ($1)', [vendor], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY productLine');
        response.json(res.rows);
    });
});

module.exports = router6;