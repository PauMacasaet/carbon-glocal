const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query('SELECT * from activities', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ACTIVITIES TABLE');
        response.json(res.rows);
    });
});

router3.get('/:timeOuts', (request, response, next) => {
    const { timeOuts } = request.params
    pool.query('SELECT *  FROM activities WHERE timeOuts= ($1)', [timeOuts], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY TIMEOUT');
        response.json(res.rows);
    });
});

module.exports = router3;