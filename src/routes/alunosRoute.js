const express = require('express');
const router = express.Router();
const alunosController = require('../controllers/alunosController');

router.get('/alunos', alunosController.listaralunos);
router.post('/alunos', alunosController.criaraluno);
router.put('/alunos/:id', alunosController.atualizaraluno);
router.delete('/alunos/:id', alunosController.deletaraluno);

module.exports = router;