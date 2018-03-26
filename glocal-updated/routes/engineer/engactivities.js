const { Router } = require('express');
const pool = require('../../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query("SELECT activityNo, productName, client, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, assignedSystemsEngineer AS Engineers FROM activities", (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL engineer activities');
        response.json(res.rows);
    });
});

router.get('/:engineerId', (request, response, next) => {
    const { engineerId } = request.params
    pool.query('SELECT activityNo, productName, client, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, assignedSystemsEngineer FROM activities JOIN engineer ON activities.engineerId = engineer.engid WHERE engineerId = $1 ', [engineerId], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING activity by engineer id');
        response.json(res.rows);
    });
});

module.exports = router;