const { Router } = require('express');
const pool = require('../../db');

const router2 = Router();

router2.get('/', (request, response, next) => {
    pool.query('SELECT * from users', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM ENGINEER TABLE');
        response.json(res.rows);
    });
});

router2.get('/:full_name', (request, response, next) => {
    const { full_name } = request.params
    pool.query('SELECT *  FROM users WHERE full_name = ($1)', [full_name], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY last name');
        response.json(res.rows);
    });
});

module.exports = router2;