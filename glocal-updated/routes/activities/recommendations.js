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

router3.get('/:recommendations', (request, response, next) => {
    const { recommendations } = request.params
    pool.query('SELECT *  FROM activities WHERE recommendations= ($1)', [recommendations], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY RECOMMENDATIONS');
        response.json(res.rows);
    });
});

module.exports = router3;