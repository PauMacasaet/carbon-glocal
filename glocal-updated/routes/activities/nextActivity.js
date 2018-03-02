const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query('SELECT * from activities', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ACTIVITIES TABLE');
        response.json(res.rows);
    });
});

router3.get('/:nextActivity', (request, response, next) => {
    const { nextActivity } = request.params
    pool.query('SELECT *  FROM activities WHERE nextActivity= ($1)', [nextActivity], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY NEXT ACTIVITY');
        response.json(res.rows);
    });
});

module.exports = router3;