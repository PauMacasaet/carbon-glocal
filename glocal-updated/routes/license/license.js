const { Router } = require('express');
const pool = require('../../db');

const router3 = Router();

router3.get('/', (request, response, next) => {
    pool.query('SELECT * from license', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM LICENSE TABLE');
        response.json(res.rows);
    });
});

router3.get('/:productName', (request, response, next) => {
    const { productName } = request.params
    pool.query('SELECT client, date_start, date_end, support_date_start, support_date_end, particulars, on_site FROM license WHERE productname= ($1)', [productName], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY product license');
        response.json(res.rows);
    });
});

router3.post('/', (request, response, next) => {
    const { date_start, date_end, vendor, productName, client, particulars, on_site, support_date_start, support_date_end, man_days, remaining_man_days, quarterly_hc, remarks } = request.body;

    pool.query(
        'INSERT INTO license( date_start, date_end, vendor, productName, client, particulars, on_site, support_date_start, support_date_end, man_days, remaining_man_days, quarterly_hc, remarks) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [date_start, date_end, vendor, productName, client, particulars, on_site, support_date_start, support_date_end, man_days, remaining_man_days, quarterly_hc, remarks],
        (err, res) => {
            if (err) return next(err);

            response.json({
                "create license": "license created"
            });
        }
    );
});

router3.put('/:licenseId', (request, response, next) => {
    const { licenseId } = request.params;
    const keys = ['date_start', 'date_end, vendor', 'productName', 'client', 'particulars', 'on_site', 'support_date_start', 'support_date_end', 'man_days', 'remaining_man_days', 'quarterly_hc', 'remarks'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE license SET ${field} = ($1) WHERE licenseId =($2)`, [request.body[field], licenseId],
            (err, res) => {
                if (err) return next(err);


                if (index === fields.length - 1)
                    response.json({
                        "create license": "license created"
                    });
            }
        )
    });
});

router3.delete('/:licenseId', (request, response, next) => {
    const { licenseId } = request.params;

    pool.query(
        'DELETE FROM license WHERE licenseId = ($1)', [licenseId],
        (err, res) => {
            if (err) return next(err);

            response.json({
                "create license": "license created"
            });
        }
    );
});

module.exports = router3;