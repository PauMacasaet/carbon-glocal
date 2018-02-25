const { Router } = require('express');
const pool = require('../../db');

const router11 = Router();

router11.get('/', (request, response, next) => {
    pool.query('SELECT * from client', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM client TABLE');
        response.json(res.rows);
    });
});

router11.get('/:accountName', (request, response, next) => {
    const { accountName } = request.params
    pool.query('SELECT * FROM client WHERE accountName = ($1)', [accountName], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY account name');
        response.json(res.rows);
    });
});

router11.post('/', (request, response, next) => {
    const { accountName, contact_details, company_address, systemEngineerLead, accountManager } = request.body;

    pool.query(
        'INSERT INTO client(accountName, contact_details, company_address, systemEngineerLead, accountManager) VALUES($1, $2, $3, $4, $5)', [accountName, contact_details, company_address, systemEngineerLead, accountManager],
        (err, res) => {
            if (err) return next(err);

            console.log('NEW client CREATED');
            response.redirect('/client');
        }
    );
});

router11.put('/:accountName', (request, response, next) => {
    const { accountName } = request.params;
    const keys = ['accountName', 'contact_details', 'company_address', 'systemEngineerLead', 'accountManager'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE client SET ${field} = ($1) WHERE accountName =($2)`, [request.body[field], client],
            (err, res) => {
                if (err) return next(err);

                console.log('UPDATED client record');

                if (index === fields.length - 1) response.redirect('/client');
            }
        )
    });
});

router11.delete('/:client', (request, response, next) => {
    const { client } = request.params;

    pool.query(
        'DELETE FROM client WHERE client = ($1)', [client],
        (err, res) => {
            if (err) return next(err);

            console.log('deleted record from client');
            response.redirect('/client');
        }
    );
});
module.exports = router11;