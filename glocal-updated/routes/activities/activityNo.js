const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query("SELECT activityNo, trackingNo AS glocalId, productName, cp.client, personName, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, timeIn, timeOuts, assignedSystemsEngineer FROM activities a JOIN contact_person cp ON a.client = cp.client ORDER BY activityNo ASC", (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ACTIVITIES TABLE');
        response.json(res.rows);
    });
});

router3.get('/:activityNo', (request, response, next) => {
    const { activityNo } = request.params
    pool.query("SELECT activityNo, trackingNo AS glocalId, productName, cp.client, personName, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, timeIn, timeOuts, assignedSystemsEngineer FROM activities a JOIN contact_person cp ON a.client = cp.client WHERE activityNo = $1 ORDER BY activityNo ASC", [activityNo], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST from activities bY activityno');
        response.json(res.rows);
    });
});

router3.post('/', (request, response, next) => {
    const { trackingNo, timeIn, timeOuts, productName, client, addres, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, assignedSystemsEngineer } = request.body;

    pool.query(
        'INSERT INTO activities( trackingNo, timeIn, timeOuts, client, addres, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, assignedSystemsEngineer) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [trackingNo, timeIn, timeOuts, productName, client, addres, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, assignedSystemsEngineer],
        (err, res) => {
            if (err) return next(err);

            response.json({
                "create activity": "activity created"
            });
        }
    );
});

router3.put('/:activityNo', (request, response, next) => {
    const { activityNo } = request.params;
    const keys = ['trackingNo', 'timeIn', 'timeOuts', 'productName', 'client', 'addres', 'typeOfActivity', 'purposeOfVisit', 'activityPerformed', 'nextActivity', 'recommendations', 'assignedSystemsEngineer'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE activities SET ${field} = ($1) WHERE activityNo =($2)`, [request.body[field], activityNo],
            (err, res) => {
                if (err) return next(err);


                if (index === fields.length - 1)
                    response.json({
                        "update activity": "activity updated"
                    });
            }
        )
    });
});

router3.delete('/:activityNo', (request, response, next) => {
    const { activityNo } = request.params;

    pool.query(
        'DELETE FROM activities WHERE activityNo = ($1)', [activityNo],
        (err, res) => {
            if (err) return next(err);
            response.json({
                "delete activity": "activity deleted"
            });
        }
    );
});
module.exports = router3;