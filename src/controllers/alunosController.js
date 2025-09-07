const prisma = require('../prisma.js');

exports.criarAluno = async (req, res) => {
  try {
    const { nome, email, idade, matricula } = req.body;
    console.log('Dados recebidos no backend:', req.body);

    const novoAluno = await prisma.aluno.create({
      data: { 
        nome, 
        email, 
        idade: parseInt(idade, 10),
        matricula
      }
    });
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(400).json({ error: 'Erro ao criar aluno' });
  }
};


exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar alunos' });
  }
};

exports.atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, idade, matricula } = req.body;

    const alunoAtualizado = await prisma.aluno.update({
      where: { id: parseInt(id, 10) },
      data: {
        nome,
        email,
        idade: parseInt(idade, 10),
        matricula
      }
    });

    res.status(200).json(alunoAtualizado);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar aluno' });
  }
};

exports.deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.aluno.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(200).json({ message: 'Aluno deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar aluno' });
  }
};
