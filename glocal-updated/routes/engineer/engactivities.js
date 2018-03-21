const { Router } = require('express');
const pool = require('../../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query('SELECT activityNo, productName, client, contactCustomer, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, e.engId, firstName, lastName FROM activities a JOIN engineer e ON a.engId = e.engid;', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL engineer activities');
        response.json(res.rows);
    });
});

router.get('/:engId', (request, response, next) => {
    const { engId } = request.params
    pool.query('SELECT activityNo, productName, client, contactCustomer, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, e.engId, firstName, lastName FROM activities a JOIN engineer e ON a.engId = e.engid WHERE e.engId = $1', [engId], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING activity by engineer id');
        response.json(res.rows);
    });
});

module.exports = router;