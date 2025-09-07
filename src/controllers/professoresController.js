const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listarProfessores = async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar professores" });
  }
};
exports.criarProfessor = async (req, res) => {

  const { nome, email, idade, disciplina } = req.body;
  try {
    const novoProfessor = await prisma.professor.create({
      data: {
        nome,
        email,
        disciplina,
        idade: parseInt(idade)
      }
    });
    res.status(201).json(novoProfessor);
  } catch (error) {
  console.error("ERRO DETALHADO:", error);
  res.status(500).json({ error: "Erro ao cadastrar professor" });
  }
};

exports.atualizarProfessor = async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    const professorAtualizado = await prisma.professor.update({
      where: { id: parseInt(id) },
      data: { nome, email }
    });
    res.json(professorAtualizado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar o professor" });
  }
};


exports.deletarProfessor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.professor.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: "Professor excluido com sucesso" });
  } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.status(500).json({ error: "Erro ao excluir professor" });
  }
};