const { Router } = require('express');
const pool = require('../../db');

const router5 = Router();

router5.get('/', (request, response, next) => {
    pool.query('SELECT last_value +1 AS next_id FROM case_monitoring_glocalId_seq', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING next glocalid');
        response.json(res.rows);
    });
});

module.exports = router5;