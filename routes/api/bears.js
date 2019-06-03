const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../../knexfile').development;
console.log(knexConfig);
const db = knex(knexConfig);


router.get('/', (req, res) => {
    db('bears').then(function (data) {
        res.json(data);
    })

})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('bears').where({ id: id }).then(function (data) {
        res.send(data);
    })
})


router.post('/', (req, res) => {
    const name = req.body;
    db.insert(name)
        .into('bears')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('bears')
        .where({ id: id })
        .update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('bears')
        .where({ id: id })
        .del()
        .then(count => {
            res.status(200).json({ Message: `Deleted Bear #${count}` });
        });
});


module.exports = router;
