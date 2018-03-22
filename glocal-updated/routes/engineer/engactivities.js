const { Router } = require('express');
const pool = require('../../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query("SELECT activityNo, productName, client, contactCustomer, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, assignedSystemsEngineer[0:1][0:2] AS FirstEngineer, assignedSystemsEngineer[2:2][2] AS SecondEngineer FROM activities", (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL engineer activities');
        response.json(res.rows);
    });
});

router.get('/:assignedSystemsEngineer', (request, response, next) => {
    const { assignedSystemsEngineer } = request.params
    pool.query('SELECT activityNo, productName, client, contactCustomer, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, engid FROM activities WHERE assignedSystemsEngineer = $1 ', [assignedSystemsEngineer], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING activity by engineer id');
        response.json(res.rows);
    });
});

module.exports = router;