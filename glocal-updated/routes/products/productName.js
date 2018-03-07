const { Router } = require('express');
const pool = require('../../db');

const router5 = Router();

router5.get('/', (request, response, next) => {
    pool.query('SELECT * from products', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM products TABLE');
        response.json(res.rows);
    });
});

router5.get('/:productName', (request, response, next) => {
    const { productName } = request.params
    pool.query('SELECT *  FROM products WHERE productName= ($1)', [productName], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY productName');
        response.json(res.rows);
    });
});

router5.post('/', (request, response, next) => {
    const { productName, vendor } = request.body;

    pool.query(
        'INSERT INTO products( productName, vendor) VALUES($1, $2)', [productName, vendor],
        (err, res) => {
            if (err) return next(err);

            console.log('products created');
            req.flash('success_msg', 'Product Created!');
        }
    );
});

router5.put('/:productName', (request, response, next) => {
    const { productName } = request.params;
    const keys = ['productName', 'vendor'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE products SET ${field} = ($1) WHERE productName =($2)`, [request.body[field], productName],
            (err, res) => {
                if (err) return next(err);

                if (index === fields.length - 1)
                    console.log('UPDATING products record');

            }
        )
    });
});

router5.delete('/:productName', (request, response, next) => {
    const { productName } = request.params;

    pool.query(
        'DELETE FROM products WHERE productName = ($1)', [productName],
        (err, res) => {
            if (err) return next(err);

            request.method = 'GET';

            console.log('deleted record from products');
        }
    );
});

module.exports = router5;