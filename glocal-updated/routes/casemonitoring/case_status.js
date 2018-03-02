const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query('SELECT * from case_monitoring', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM CASE MONITORING TABLE');
        response.json(res.rows);
    });
});

router3.get('/:case_status', (request, response, next) => {
    const { case_status } = request.params
    pool.query('SELECT case_status FROM case_monitoring WHERE case_status = ($1)', [case_status], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY CASE STATUS');
        response.json(res.rows);
    });
});

module.exports = router3;