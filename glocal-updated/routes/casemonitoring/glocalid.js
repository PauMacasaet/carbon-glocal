const { Router } = require('express');
const pool = require('../../db');

const router8 = Router();

router8.get('/', (request, response, next) => {
    pool.query('SELECT * from case_monitoring', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM case monitoring TABLE');
        response.json(res.rows);
    });
});

router8.get('/:glocalId', (request, response, next) => {
    const { glocalId } = request.params
    pool.query('SELECT *  FROM case_monitoring WHERE glocalId = ($1)', [glocalId], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY glocalId');
        response.json(res.rows);
    });
});

router8.post('/', (request, response, next) => {
    const { vendorCaseId, dateIdCreated, dateRaised, caseTitle, caseDescription, severity, vendor, customer, productName, customerName, systemsEngineerLead, assignedAccountManager, assignedSystemsEngineer, case_status } = request.body;

    pool.query(
        'INSERT INTO case_monitoring( vendorCaseId, dateIdCreated, dateRaised, caseTitle, caseDescription, severity, vendor, customer, productName, customerName, systemsEngineerLead, assignedAccountManager, assignedSystemsEngineer, case_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING glocalId+1', [vendorCaseId, dateIdCreated, dateRaised, caseTitle, caseDescription, severity, vendor, customer, productName, customerName, systemsEngineerLead, assignedAccountManager, assignedSystemsEngineer, case_status],
        (err, res) => {
            if (err) return next(err);

            console.log('new case created');
            response.redirect('/glocalid');
        }
    );
});

router8.put('/:glocalId', (request, response, next) => {
    const { glocalId } = request.params;
    const keys = ['glocalId', 'vendorCaseId', 'dateIdCreated', 'dateRaised', 'caseTitle', 'caseDescription', 'severity', 'vendor', 'customer', 'productName', 'customerName', 'systemsEngineerLead', 'assignedAccountManager', 'assignedSystemsEngineer', 'case_status'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE case_monitoring SET ${field} = ($1) WHERE glocalId =($2)`, [request.body[field], glocalId],
            (err, res) => {
                if (err) return next(err);

                console.log('UPDATED client record');

                if (index === fields.length - 1) response.redirect('/glocalid');
            }
        )
    });
});

router8.delete('/:glocalId', (request, response, next) => {
    const { glocalId } = request.params;

    pool.query(
        'DELETE FROM case_monitoring WHERE glocalId = ($1)', [glocalId],
        (err, res) => {
            if (err) return next(err);

            console.log('deleted record from case monitoring');
            response.redirect('/glocalid');
        }
    );
});
module.exports = router8;