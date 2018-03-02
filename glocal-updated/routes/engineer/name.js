const { Router } = require('express');
const pool = require('../../db');

const router2 = Router();

router2.get('/', (request, response, next) => {
    pool.query('SELECT * from engineer ORDER BY engId ASC', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ENGINEER TABLE');
        response.json(res.rows);
    });
});

router2.get('/:lastName', (request, response, next) => {
    const { lastName } = request.params
    pool.query('SELECT *  FROM engineer WHERE lastName = ($1)', [lastName], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY last name');
        response.json(res.rows);
    });
});

module.exports = router2;