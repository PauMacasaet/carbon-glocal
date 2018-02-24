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

router11.post('/', (request, response, next) => {
    const { client, personName } = request.body;

    pool.query(
        'INSERT INTO client(client, personName) VALUES($1, $2)', [client, personName],
        (err, res) => {
            if (err) return next(err);

            console.log('NEW contact person created CREATED');
            response.redirect('/contactc');
        }
    );
});

router11.put('/:client', (request, response, next) => {
    const { client } = request.params;
    const keys = ['client', 'contactPerson'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE contact_person SET ${field} = ($1) WHERE client =($2)`, [request.body[field], client],
            (err, res) => {
                if (err) return next(err);

                console.log('UPDATED contact person record');

                if (index === fields.length - 1) response.redirect('/contactc');
            }
        )
    });
});

router11.delete('/:client', (request, response, next) => {
    const { client } = request.params;

    pool.query(
        'DELETE FROM client WHERE client = ($1)', [client],
        (err, res) => {
            if (err) return next(err);

            console.log('deleted record from client');
            response.redirect('/contactc');
        }
    );
});
module.exports = router11;