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

router8.get('/:caseTitle', (request, response, next) => {
    const { caseTitle } = request.params
    pool.query('SELECT *  FROM case_monitoring WHERE caseTitle = ($1)', [caseTitle], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY dateRaised');
        response.json(res.rows);
    });
});

module.exports = router8;