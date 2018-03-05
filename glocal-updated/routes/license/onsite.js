const { Router } = require('express');
const pool = require('../../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query('SELECT * from license', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM LICENSE TABLE');
        response.json(res.rows);
    });
});

router.get('/:on_site', (request, response, next) => {
    const { on_site } = request.params;
    pool.query('SELECT client, particulars, vendor, productName, quarterly_hc, remarks from license WHERE on_site = ($1)', [on_site], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LICENSE BY SUPPORT LEVEL');
        response.json(res.rows);
    });
});

module.exports = router;