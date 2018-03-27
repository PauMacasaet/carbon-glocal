const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query("SELECT glocalId, full_name, email, contactnumber, caseTitle, caseDescription, case_status from users JOIN case_monitoring ON users.full_name = case_monitoring.systemsEngineerLead WHERE position = 'System Engineer' ", (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ENGINEER TABLE');
        response.json(res.rows);
    });
});

module.exports = router3;