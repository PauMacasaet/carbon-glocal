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

router3.get('/:engid', (request, response, next) => {
    const { engid } = request.params
    pool.query('SELECT trackingNo, engid, productName, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, engineerName as engineerSurname FROM activities WHERE engid= ($1)', [engid], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST from activities bY engid');
        response.json(res.rows);
    });
});

module.exports = router3;