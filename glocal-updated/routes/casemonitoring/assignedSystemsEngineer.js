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

router3.get('/:assignedSystemsEngineer', (request, response, next) => {
    const { assignedSystemsEngineer } = request.params
    pool.query('SELECT assignedSystemsEngineer FROM case_monitoring WHERE assignedSystemsEngineer = ($1)', [assignedSystemsEngineer], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY ASSIGNED SE');
        response.json(res.rows);
    });
});

module.exports = router3;