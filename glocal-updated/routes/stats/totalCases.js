const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query('SELECT case_status, count(*) NumberofCases FROM case_monitoring GROUP BY case_status;', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING TOTAL CASES');
        response.json(res.rows);
    });
});

router3.get('/:case_status', (request, response, next) => {
    const { case_status } = request.params
    pool.query('SELECT count(*) FILTER(WHERE case_status=($1)) FROM case_monitoring', [case_status], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING COUNT BY CASE STATUS');
        response.json(res.rows);
    });
});

module.exports = router3;