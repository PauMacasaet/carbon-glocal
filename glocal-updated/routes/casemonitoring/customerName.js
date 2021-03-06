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

router3.get('/:customerName', (request, response, next) => {
    const { customerName } = request.params
    pool.query('SELECT *  FROM case_monitoring WHERE customerName= ($1)', [customerName], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY CUSTOMERNAME');
        response.json(res.rows);
    });
});

module.exports = router3;