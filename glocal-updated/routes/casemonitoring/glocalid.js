const { Router } = require('express');
const pool = require('../../db');

const router8 = Router();

router8.get('/', (request, response, next) => {
    pool.query('SELECT glocalId, vendorCaseId, dateIdCreated, accountManager, assignedSystemsEngineer, case_status, caseDescription, caseTitle, customer, dateRaised, glocalId, cm.productName, severity, systemsEngineerLead, vendor FROM case_monitoring cm JOIN client c ON c.accountName = cm.customer LEFT JOIN activities a ON cm.glocalid = a.trackingNo ORDER BY glocalId ASC', (err, res) => {
        if (err) return next(err);

        console.log('SHOWING ALL CASES');
        response.json(res.rows);
    });
});

router8.get('/search', (request, response, next) => {

    console.log(request.query);
    response.json(request.query);
});

router8.get('/:glocalId', (request, response, next) => {
    const { glocalId } = request.params
    pool.query('SELECT glocalId, vendorCaseId, dateIdCreated, accountManager, assignedSystemsEngineer, case_status, caseDescription, caseTitle, customer, dateRaised, glocalId, productName, severity, systemsEngineerLead, vendor FROM case_monitoring JOIN client ON client.accountName = case_monitoring.customer WHERE glocalId = ($1) ORDER BY glocalId ASC', [glocalId], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY glocalId');
        response.json(res.rows);
    });
});

router8.get('/customer/:customer', (request, response, next) => {
    const { customer } = request.params
    pool.query('SELECT customer, case_status, leads, severity, caseTitle, productName, dateRaised FROM case_monitoring WHERE customer = ($1)', [customer], (err, res) => {
        if (err) return next(err);

        console.log(request.query);
        response.json(res.rows);
    });
});

router8.get('/case_status/:case_status', (request, response, next) => {
    const { case_status } = request.params
    pool.query('SELECT customer, case_status, leads, severity, caseTitle, productName, dateRaised FROM case_monitoring WHERE case_status = ($1)', [case_status], (err, res) => {
        if (err) return next(err);

        console.log(request.query);
        response.json(res.rows);
    });
});

router8.get('/leads/:leads', (request, response, next) => {
    const { leads } = request.params
    pool.query('SELECT customer, case_status, leads, severity, caseTitle, productName, dateRaised FROM case_monitoring WHERE leads = ARRAY[($1)]', [leads], (err, res) => {
        if (err) return next(err);

        console.log(request.query);
        response.json(res.rows);
    });
});

router8.get('/severity/:severity', (request, response, next) => {
    const { severity } = request.params
    pool.query('SELECT customer, case_status, leads, severity, caseTitle, productName, dateRaised FROM case_monitoring WHERE severity = ($1)', [severity], (err, res) => {
        if (err) return next(err);
        console.log(request.query);
        response.json(res.rows);
    });
});

router8.get('/vendor/:vendor', (request, response, next) => {
    const { vendor } = request.params
    pool.query('SELECT customer, case_status, leads, severity, caseTitle, productName, dateRaised FROM case_monitoring WHERE vendor = ($1)', [vendor], (err, res) => {
        if (err) return next(err);
        console.log(request.query);
        response.json(res.rows);
    });
});

router8.get('/productName/:productName', (request, response, next) => {
    const { productName } = request.params
    pool.query('SELECT customer, case_status, leads, severity, caseTitle, productName, dateRaised FROM case_monitoring WHERE productName = ($1)', [productName], (err, res) => {
        if (err) return next(err);
        console.log(request.query);
        response.json(res.rows);
    });
});

router8.get('/dateRaised/:dateRaised', (request, response, next) => {
    const { dateRaised } = request.params
    pool.query('SELECT customer, case_status, leads, severity, caseTitle, productName, dateRaised FROM case_monitoring WHERE EXTRACT(month from dateRaised)=($1)', [dateRaised], (err, res) => {
        if (err) return next(err);
        console.log(request.query);
        response.json(res.rows);
    });
});

router8.post('/', (request, response, next) => {
    const { vendorCaseId, dateIdCreated, dateRaised, caseTitle, caseDescription, severity, vendor, customer, productName, systemsEngineerLead, assignedSystemsEngineer, case_status } = request.body;

    pool.query(
        'INSERT INTO case_monitoring( vendorCaseId, dateIdCreated, dateRaised, caseTitle, caseDescription, severity, vendor, customer, productName, systemsEngineerLead, assignedSystemsEngineer, case_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [vendorCaseId, dateIdCreated, dateRaised, caseTitle, caseDescription, severity, vendor, customer, productName, systemsEngineerLead, assignedSystemsEngineer, case_status],
        (err, res) => {
            if (err) return next(err);

            response.json({
                "Create case": "case created"
            });
        }
    );
});

router8.put('/:glocalId', (request, response, next) => {
    const { glocalId } = request.params;
    const keys = ['vendorCaseId', 'dateIdCreated', 'dateRaised', 'caseTitle', 'caseDescription', 'severity', 'vendor', 'customer', 'productName', 'systemsEngineerLead', 'assignedSystemsEngineer', 'case_status'];
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

                if (index === fields.length - 1)
                    response.json({
                        "update case": "case deleted"
                    });
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

            response.json({
                "delete case": "case deleted"
            });
        }
    );
});
module.exports = router8;