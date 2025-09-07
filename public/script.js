document.addEventListener('DOMContentLoaded', () => {
    carregarAlunos();
    configurarFormularioAluno();
    carregarProfessores();
    configurarFormularioProfessor();
});

async function carregarProfessores() {
    try {
        const response = await fetch('/api/professores');
        if (!response.ok) throw new Error('A resposta da rede não foi boa');
        const professores = await response.json();
        const tabelaCorpo = document.querySelector('#tabela-professores tbody');
        tabelaCorpo.innerHTML = '';

        if (professores.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6" style="text-align: center;">Nenhum professor cadastrado ainda.</td>`;
            tabelaCorpo.appendChild(tr);
        } else {
            professores.forEach(professor => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${professor.id}</td>
                    <td>${professor.nome}</td>
                    <td>${professor.email}</td>
                    <td>${professor.idade}</td>
                    <td>${professor.disciplina}</td>
                    <td>
                        <button class="action-btn btn-editar" onclick="preencherFormularioProfessor(${professor.id}, '${professor.nome}', '${professor.email}', ${professor.idade}, '${professor.disciplina}')">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="action-btn btn-deletar" onclick="deletarProfessor(${professor.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                `;
                tabelaCorpo.appendChild(tr);
            });
        }
    } catch (error) {
        console.error('Falha ao carregar professores:', error);
        alert('Não foi possível carregar a lista de professores.');
    }
}

function configurarFormularioProfessor() {
    const formProfessor = document.querySelector('#form-professor');
    const submitButton = formProfessor.querySelector('button[type="submit"]');

    formProfessor.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formProfessor);
        const dados = new URLSearchParams(formData);

        const professorId = document.querySelector('#professor-id').value;
        const url = professorId ? `/api/professores/${professorId}` : '/api/professores';
        const method = professorId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: dados
            });

            if (response.ok) {
                document.querySelector('#professor-id').value = ''; 
                formProfessor.reset();
                submitButton.textContent = 'Cadastrar Professor';
                carregarProfessores();
                alert(professorId ? 'Professor atualizado com sucesso!' : 'Professor cadastrado com sucesso!');
            } else {
                const erro = await response.json();
                alert(`Erro: ${erro.error || 'Verifique os dados.'}`);
            }
        } catch (error) {
            alert('Ocorreu um erro de comunicação com o servidor.');
        }
    });
}

function preencherFormularioProfessor(id, nome, email, idade, disciplina) {
    document.querySelector('#professor-id').value = id;
    document.querySelector('#professor-nome').value = nome;
    document.querySelector('#professor-email').value = email;
    document.querySelector('#professor-idade').value = idade;
    document.querySelector('#professor-disciplina').value = disciplina;
    
    const submitButton = document.querySelector('#form-professor button[type="submit"]');
    submitButton.textContent = 'Atualizar Professor';

    document.querySelector('#form-professor').scrollIntoView({ behavior: 'smooth' });
}

async function carregarAlunos() {
    try {
        const response = await fetch('/api/alunos');
        if (!response.ok) throw new Error('A resposta da rede não foi boa');
        const alunos = await response.json();
        const tabelaCorpo = document.querySelector('#tabela-alunos tbody');
        tabelaCorpo.innerHTML = '';

        if (alunos.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6" style="text-align: center;">Nenhum aluno cadastrado ainda.</td>`;
            tabelaCorpo.appendChild(tr);
        } else {
            alunos.forEach(aluno => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${aluno.id}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.email}</td>
                    <td>${aluno.idade}</td>
                    <td>${aluno.matricula || ''}</td>
                    <td>
                        <button class="action-btn btn-editar" onclick="preencherFormularioAluno(${aluno.id}, '${aluno.nome}', '${aluno.email}', ${aluno.idade}, '${aluno.matricula || ''}')">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="action-btn btn-deletar" onclick="deletarAluno(${aluno.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                `;
                tabelaCorpo.appendChild(tr);
            });
        }
    } catch (error) {
        console.error('Falha ao carregar alunos:', error);
        alert('Não foi possível carregar a lista de alunos.');
    }
}

function configurarFormularioAluno() {
    const formAluno = document.querySelector('#form-aluno');
    const submitButton = formAluno.querySelector('button[type="submit"]');

    formAluno.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formAluno);
        const dados = new URLSearchParams(formData);

        const alunoId = document.querySelector('#aluno-id').value;
        const url = alunoId ? `/api/alunos/${alunoId}` : '/api/alunos';
        const method = alunoId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: dados
            });

            if (response.ok) {
                document.querySelector('#aluno-id').value = '';
                formAluno.reset();
                submitButton.textContent = 'Cadastrar Aluno';
                carregarAlunos();
                alert(alunoId ? 'Aluno atualizado com sucesso!' : 'Aluno cadastrado com sucesso!');
            } else {
                const erro = await response.json();
                alert(`Erro: ${erro.error || 'Verifique os dados.'}`);
            }
        } catch (error) {
            alert('Ocorreu um erro de comunicação com o servidor.');
        }
    });
}

function preencherFormularioAluno(id, nome, email, idade, matricula) {
    document.querySelector('#aluno-id').value = id;
    document.querySelector('#aluno-nome').value = nome;
    document.querySelector('#aluno-email').value = email;
    document.querySelector('#aluno-idade').value = idade;
    document.querySelector('#aluno-matricula').value = matricula;

    const submitButton = document.querySelector('#form-aluno button[type="submit"]');
    submitButton.textContent = 'Atualizar Aluno';

    document.querySelector('#form-aluno').scrollIntoView({ behavior: 'smooth' });
}

async function deletarAluno(id) {
    if (!confirm(`Tem certeza que deseja excluir o aluno com ID ${id}?`)) return;
    try {
        const response = await fetch(`/api/alunos/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Aluno excluído com sucesso!');
            carregarAlunos();
        } else {
            const erro = await response.json();
            alert(`Erro ao excluir aluno: ${erro.error}`);
        }
    } catch (error) {
        alert('Ocorreu um erro de comunicação com o servidor.');
    }
}

async function deletarProfessor(id) {
    if (!confirm(`Tem certeza que deseja excluir o professor com ID ${id}?`)) return;
    try {
        const response = await fetch(`/api/professores/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Professor excluído com sucesso!');
            carregarProfessores();
        } else {
            const erro = await response.json();
            alert(`Erro ao excluir professor: ${erro.error}`);
        }
    } catch (error) {
        alert('Ocorreu um erro de comunicação com o servidor.');
    }
}