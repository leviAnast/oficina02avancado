document.addEventListener('DOMContentLoaded', () => {
   // ei vey coloca os alunes aquir
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