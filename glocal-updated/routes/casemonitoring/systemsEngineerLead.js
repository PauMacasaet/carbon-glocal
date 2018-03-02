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

router3.get('/:systemsEngineerLead', (request, response, next) => {
    const { systemsEngineerLead } = request.params
    pool.query('SELECT *  FROM case_monitoring WHERE systemsEngineerLead= ($1)', [systemsEngineerLead], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY SELEAD');
        response.json(res.rows);
    });
});

module.exports = router3;