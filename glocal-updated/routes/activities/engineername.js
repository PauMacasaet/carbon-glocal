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

router3.get('/:engineerName', (request, response, next) => {
    const { engineerName } = request.params
    pool.query('SELECT productName, trackingNo, engid, engineerName as engineer_surname, activityPerformed, nextActivity, recommendations FROM activities WHERE engineerName= ($1)', [engineerName], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY engineerName');
        response.json(res.rows);
    });
});

module.exports = router3;