const { Router } = require('express');
const pool = require('../../db');

const router8 = Router();

router8.get('/', (request, response, next) => {
    pool.query('SELECT customer, case_status, assignedSystemsEngineer, severity, caseTitle, productName, dateRaised from case_monitoring', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM case monitoring TABLE');
        response.json(res.rows);
    });
});

router8.get(':/glocalId', (request, response, next) => {
    const { glocalId } = request.params;
    const keys = ['customer', 'case_status', 'assignedSystemsEngineer', 'severity', 'vendor', 'productName', 'dateRaised'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
        pool.query(
            `SELECT customer, case_status, assignedSystemsEngineer, severity, caseTitle, productName, dateRaised FROM case_monitoring WHERE ${field} = ($1) WHERE glocalId = ($2)`, [request.body[field], glocalId],
            (err, res) => {
                if (err) return next(err);

                console.log(`Showing ${field} filter`);
                
                if (index === fields.length - 1) response.redirect('/filter');
            }
        )
    });
});

module.exports = router8;