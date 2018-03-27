const { Router } = require('express');
const pool = require('../../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query("SELECT * from users WHERE position = 'System Engineer' ", (err, res) => {
        if (err) return next(err);

        console.log('SHOWING ALL ENGINEERS');
        response.json(res.rows);
    });
});

router.get('/:userid', (request, response, next) => {
    const { userid } = request.params
    pool.query('SELECT * FROM users WHERE userid = $1', [userid], (err, res) => {
        if (err) return next(err);

        console.log('RETRIEVING LIST BY ID');
        response.json(res.rows);
    });
});

router.put('/:userid', (request, response, next) => {
    const { userid } = request.params;
    const keys = ['full_name', 'username', 'pw', 'email', 'contactnumber'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    //partial updating
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE users SET ${field} = ($1) WHERE userid =($2)`, [request.body[field], userid],
            (err, res) => {
                if (err) return next(err);


                if (index === fields.length - 1)
                    response.json({
                        "update engineer": "engineer record updated"
                    });
            }
        )
    });
});

router.delete('/:userid', (request, response, next) => {
    const { userid } = request.params;

    pool.query(
        'DELETE FROM engineer WHERE userid = ($1)', [userid],
        (err, res) => {
            if (err) return next(err);

            response.json({
                "delete engineer": "engineer deleted"
            });
        }
    );
});

module.exports = router;