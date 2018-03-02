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

router8.get('/:caseDescription', (request, response, next) => {
    const { caseDescription } = request.params
    pool.query('SELECT *  FROM case_monitoring WHERE caseDescription = ($1)', [caseDescription], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY case description');
        response.json(res.rows);
    });
});

module.exports = router8;