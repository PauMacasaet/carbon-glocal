const { Router } = require('express');
const pool = require('../../db');

const router11 = Router();

router11.get('/', (request, response, next) => {
    pool.query('SELECT client, accountManager from client', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM client TABLE');
        response.json(res.rows);
    });
});

router11.get('/:accountManager', (request, response, next) => {
    const { accountManager } = request.params
    pool.query('SELECT * FROM client WHERE accountManager = ($1)', [accountManager], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY accountManager name');
        response.json(res.rows);
    });
});

module.exports = router11;