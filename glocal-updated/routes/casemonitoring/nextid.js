const { Router } = require('express');
const pool = require('../../db');

const router5 = Router();

router5.get('/', (request, response, next) => {
    pool.query('SELECT last_value +1 FROM case_monitoring_glocalId_seq AS next_id', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING next glocalid');
        response.json(res.rows);
    });
});

module.exports = router5;