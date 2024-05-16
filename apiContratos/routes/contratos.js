const express = require('express');
const router = express.Router();
const Contratos = require('../models/contratos');

const contratosController = require('../controllers/contratos');

router.get('/', async (req, res) => {
    if (req.query.entidade) {
      contratosController.findByEntidade(req.query.entidade)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(502).json(err));
    } else if (req.query.tipo) {
      contratosController.findByTipoProcedimento(req.query.tipo)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(503).json(err));
    } else if (req.query.ent) {
        contratosController.findByEntidadeNum(req.query.ent)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(503).json(err));
    } else {
      contratosController.listTotal()
            .then(data => res.status(201).json(data))
            .catch(err => res.status(504).json(err));
    }
});

router.get('/entidades', (req, res) => {
  contratosController.listEntidades()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(506).json(err));
});

router.get('/tipos', (req, res) => {
  contratosController.listTipos()
        .then(data => res.status(201).json(data))
        .catch(err => res.status(507).json(err));
});

router.get('/:id', (req, res) => {
  contratosController.findById(req.params.id)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  contratosController.insert(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(508).json(err));
});

router.delete('/:id', (req, res) => {
  contratosController.delete(req.params.id)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(509).json(err));
});

router.put('/:id', (req, res) => {
  contratosController.update(req.body, req.params.id)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(510).json(err));
});

module.exports = router;