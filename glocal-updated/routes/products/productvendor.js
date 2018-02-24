const { Router } = require('express');
const pool = require('../../db');

const router6 = Router();

router6.get('/', (request, response, next) => {
    pool.query('SELECT * from products', (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING ALL RECORDS FROM products TABLE');
        response.json(res.rows);
    });
});

router6.get('/:vendor', (request, response, next) => {
    const { vendor } = request.params
    pool.query('SELECT *  FROM products WHERE vendor = ($1)', [vendor], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY productLine');
        response.json(res.rows);
    });
});

router6.post('/', (request, response, next) => {
    const { productName, productLine, vendor, category } = request.body;

    pool.query(
        'INSERT INTO products( productName, productLine, vendor, category) VALUES($1, $2, $3, $4)', [productName, productLine, vendor, category],
        (err, res) => {
            if (err) return next(err);

            console.log('NEW PRODUCT CREATED');
            response.redirect('/vendor');
        }
    );
});

router6.put('/:vendor', (request, response, next) => {
    const { vendor } = request.params;
    const keys = ['productName', 'productLine', 'vendor', 'category'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE products SET ${field} = ($1) WHERE vendor =($2)`, [request.body[field], vendor],
            (err, res) => {
                if (err) return next(err);

                console.log('UPDATED products record');

                if (index === fields.length - 1) response.redirect('/vendor');
            }
        )
    });
});

router6.delete('/:vendor', (request, response, next) => {
    const { vendor } = request.params;

    pool.query(
        'DELETE FROM products WHERE vendor = ($1)', [vendor],
        (err, res) => {
            if (err) return next(err);

            console.log('deleted record from products');
            response.redirect('/vendor');
        }
    );
});
module.exports = router6;