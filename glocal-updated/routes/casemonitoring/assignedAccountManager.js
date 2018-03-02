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

router3.get('/:assignedAccountManager', (request, response, next) => {
    const { assignedAccountManager } = request.params
    pool.query('SELECT *  FROM case_monitoring WHERE assignedAccountManager= ($1)', [assignedAccountManager], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY ACCOUNTMGR');
        response.json(res.rows);
    });
});

module.exports = router3;