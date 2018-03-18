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

router11.get('/:personName', (request, response, next) => {
    const { personName } = request.params
    pool.query('SELECT client, personName AS Contact_Person FROM contact_person WHERE personName = ($1)', [personName], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY personName');
        response.json(res.rows);
    });
});

router11.post('/', (request, response, next) => {
    const { client, personName } = request.body;

    pool.query(
        'INSERT INTO contact_person(client, personName) VALUES($1, $2)', [client, personName],
        (err, res) => {
            if (err) return next(err);

            response.json({
                "create contact person": "contact person created"
            });
        }
    );
});

router11.put('/:contactPerson', (request, response, next) => {
    const { contactPerson } = request.params;
    const keys = ['client', 'contactPerson'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE contact_person SET ${field} = ($1) WHERE contactPerson =($2)`, [request.body[field], contactPerson],
            (err, res) => {
                if (err) return next(err);


                if (index === fields.length - 1)

                    response.json({
                    "update contact person": "contact person updated"
                });
            }
        )
    });
});

router11.delete('/:contactPerson', (request, response, next) => {
    const { contactPerson } = request.params;

    pool.query(
        'DELETE FROM contact_person WHERE contactPerson = ($1)', [contactPerson],
        (err, res) => {
            if (err) return next(err);

            response.json({
                "delete contact person": "contact person deleted"
            });

        }
    );
});
module.exports = router11;