const { Router } = require('express');
const pool = require('../../db');

const router8 = Router();

router8.get('/', (request, response, next) => {
    pool.query('SELECT * from case_monitoring', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM case monitoring TABLE');
        response.json(res.rows);
    });
});

router8.get('/:vendorCaseId', (request, response, next) => {
    const { vendorCaseId } = request.params
    pool.query('SELECT *  FROM case_monitoring WHERE vendorCaseId = ($1)', [vendorCaseId], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY vendorCaseId');
        response.json(res.rows);
    });
});

module.exports = router8;