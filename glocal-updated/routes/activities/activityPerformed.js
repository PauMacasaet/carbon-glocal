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

router3.get('/:activityPerformed', (request, response, next) => {
    const { activityPerformed } = request.params
    pool.query('SELECT * FROM activities WHERE activityPerformed= ($1)', [activityPerformed], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY ACTIVITY PERFORMED');
        response.json(res.rows);
    });
});

module.exports = router3;