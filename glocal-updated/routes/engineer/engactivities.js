const { Router } = require('express');
const pool = require('../../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query("SELECT activityNo, productName, client, contactCustomer, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, e.engid, CONCAT (firstName, ' ' ,lastName) AS fullName FROM activities a JOIN engineer e ON a.engid = e.engid;", (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL engineer activities');
        response.json(res.rows);
    });
});

router.get('/:engid', (request, response, next) => {
    const { engid } = request.params
    pool.query('SELECT activityNo, productName, client, contactCustomer, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, e.engid, firstName, lastName FROM activities a JOIN engineer e ON a.engid = e.engid WHERE e.engid = $1', [engid], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING activity by engineer id');
        response.json(res.rows);
    });
});

module.exports = router;