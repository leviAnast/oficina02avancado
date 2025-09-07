document.addEventListener('DOMContentLoaded', () => {
    carregarAlunos();
    configurarFormularioAluno();
    carregarProfessores();
    configurarFormularioProfessor();
});

async function carregarProfessores() {
    try {
        const response = await fetch('/api/professores');
        if (!response.ok) {
            throw new Error('A resposta da rede não foi boa');
        }
        const professores = await response.json();

        const tabelaCorpo = document.querySelector('#tabela-professores tbody');
        tabelaCorpo.innerHTML = '';

        professores.forEach(professor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${professor.id}</td>
                <td>${professor.nome}</td>
                <td>${professor.email}</td>
                <td>${professor.idade}</td>
                <td>${professor.disciplina}</td>
            `;
            tabelaCorpo.appendChild(tr);
        });

    } catch (error) {
        console.error('Falha ao carregar professores:', error);
        alert('Não foi possível carregar a lista de professores.');
    }
}

function configurarFormularioProfessor() {
    const formProfessor = document.querySelector('#form-professor');

    formProfessor.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formProfessor);
        const dados = new URLSearchParams(formData);

        try {
            const response = await fetch('/api/professores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: dados
            });

            if (response.ok) {
                formProfessor.reset();     
                carregarProfessores();     
                alert('Professor cadastrado com sucesso!');
            } else {
                const erro = await response.json();
                console.error('Erro ao cadastrar professor:', erro);
                alert(`Erro ao cadastrar: ${erro.error || 'Verifique os dados e tente novamente.'}`);
            }
        } catch (error) {
            console.error('Falha na requisição de cadastro:', error);
            alert('Ocorreu um erro de comunicação com o servidor.');
        }
    });
}

async function carregarAlunos() {
    try {
        const response = await fetch('/api/alunos'); 
        if (!response.ok) {
            throw new Error('A resposta da rede não foi boa');
        }
        const alunos = await response.json();

        const tabelaCorpo = document.querySelector('#tabela-alunos tbody');
        tabelaCorpo.innerHTML = '';

        alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.matricula}</td>
            `;
            tabelaCorpo.appendChild(tr);
        });

    } catch (error) {
        console.error('Falha ao carregar alunos:', error);
        alert('Não foi possível carregar a lista de alunos.');
    }
}

function configurarFormularioAluno() {
    const formAluno = document.querySelector('#form-aluno');

    formAluno.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formAluno);
        const dados = new URLSearchParams(formData); // Mantém x-www-form-urlencoded

        const alunoId = document.querySelector('#aluno-id').value;
        const url = alunoId ? `/api/alunos/${alunoId}` : '/api/alunos';
        const metodo = alunoId ? 'PUT' : 'POST'; // 🔹 Corrige o método

        try {
            const response = await fetch(url, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: dados
            });

            if (response.ok) {
                formAluno.reset();
                carregarAlunos();
                alert(alunoId ? 'Aluno atualizado com sucesso!' : 'Aluno cadastrado com sucesso!');
            } else {
                const erro = await response.json();
                console.error('Erro ao cadastrar/atualizar aluno:', erro);
                alert(`Erro: ${erro.error || 'Verifique os dados e tente novamente.'}`);
            }
        } catch (error) {
            console.error('Falha na requisição:', error);
            alert('Ocorreu um erro de comunicação com o servidor.');
        }
    });
}


