const { Router } = require('express');
const pool = require('../../db');

const router5 = Router();

router5.get('/', (request, response, next) => {
    pool.query('select DISTINCT ON (trackingNo) trackingNo, timeOuts, client, productName FROM activities ORDER BY trackingNo, timeouts DESC', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM products TABLE');
        response.json(res.rows);
    });
});

module.exports = router5;