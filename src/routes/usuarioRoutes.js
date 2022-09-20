const express = require('express');
const router = express.Router();
const controlador = require('../controllers/usuarioController');

router.post('/', async (req, res) => {
  const resp = await controlador.registrar(req.body);
  res.json(resp);
});

router.get('/', (req, res) => {
  const resp = controlador.listar();
  res.json(resp);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const resp = controlador.buscarPorId(id);
  res.json(resp);
});

module.exports = router;
