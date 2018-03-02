const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query('SELECT * from engineer ORDER BY engId ASC', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ENGINEER TABLE');
        response.json(res.rows);
    });
});

router3.get('/:department', (request, response, next) => {
    const { department } = request.params
    pool.query('SELECT *  FROM engineer WHERE department= ($1)', [department], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY DEPARTMENT');
        response.json(res.rows);
    });
});

module.exports = router3;