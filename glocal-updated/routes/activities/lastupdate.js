const { Router } = require('express');
const pool = require('../../db');

const router5 = Router();

router5.get('/', (request, response, next) => {
    pool.query('SELECT DISTINCT ON (trackingNo) trackingNo, timeOuts AS date_last_updated, client, productName FROM activities ORDER BY trackingNo, timeouts DESC', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM products TABLE');
        response.json(res.rows);
    });
});

module.exports = router5;