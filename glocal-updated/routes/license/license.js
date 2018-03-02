const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query('SELECT * from license', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM LICENSE TABLE');
        response.json(res.rows);
    });
});

router3.get('/:license', (request, response, next) => {
    const { license } = request.params
    pool.query('SELECT *  FROM license WHERE license= ($1)', [license], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY LICENSE');
        response.json(res.rows);
    });
});

module.exports = router3;