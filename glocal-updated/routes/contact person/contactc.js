const { Router } = require('express');
const pool = require('../../db');

const router11 = Router();

router11.get('/', (request, response, next) => {
    pool.query('SELECT client, personName AS Contact_Person from contact_person', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM contact person TABLE');
        response.json(res.rows);
    });
});

router11.get('/:client', (request, response, next) => {
    const { client } = request.params
    pool.query('SELECT client, personName AS Contact_Person FROM contact_person WHERE client = ($1)', [client], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY personName');
        response.json(res.rows);
    });
});

module.exports = router11;