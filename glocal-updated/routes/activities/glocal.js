const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query("SELECT trackingNo AS glocalId, activityNo, productName, cp.client, personName, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, timeIn, timeOuts, assignedSystemsEngineer FROM activities a JOIN contact_person cp ON a.client = cp.client ORDER BY trackingNo ASC", (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ACTIVITIES TABLE');
        response.json(res.rows);
    });
});

router3.get('/:trackingNo', (request, response, next) => {
    const { trackingNo } = request.params
    pool.query("SELECT trackingNo AS glocalId, activityNo, productName, cp.client, personName, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, timeIn, timeOuts, assignedSystemsEngineer FROM activities a JOIN contact_person cp ON a.client = cp.client WHERE trackingNo = $1 ORDER BY trackingNo ASC", [trackingNo], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST from activities bY activityno');
        response.json(res.rows);
    });
});

module.exports = router3;