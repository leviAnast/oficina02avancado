const express = require('express');
const router = express.Router();
const alunosController = require('../controllers/alunosController');

router.get('/alunos', alunosController.listarAlunos);
router.post('/alunos', alunosController.criarAluno);
router.put('/alunos/:id', alunosController.atualizarAluno);
router.delete('/alunos/:id', alunosController.deletarAluno);

module.exports = router;