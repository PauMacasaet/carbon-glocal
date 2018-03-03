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

router3.get('/:client', (request, response, next) => {
    const { client } = request.params
    pool.query('SELECT productName, date_start, date_end, support_date_start, support_date_end, particulars, on_site FROM license WHERE client= ($1)', [client], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY client license');
        response.json(res.rows);
    });
});


module.exports = router3;