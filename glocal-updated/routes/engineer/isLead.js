const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query('SELECT * from engineer ORDER BY engId ASC', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ENGINEER TABLE');
        response.json(res.rows);
    });
});

router3.get('/:isLead', (request, response, next) => {
    const { isLead } = request.params
    pool.query('SELECT *  FROM engineer WHERE isLead = ($1)', [isLead], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY SELead bool');
        response.json(res.rows);
    });
});

module.exports = router3;