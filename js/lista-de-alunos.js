document.addEventListener('DOMContentLoaded', function() {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    const tabelaAlunos = document.getElementById('tabela-alunos');
    
    function renderizarAlunos(listaAlunos) {
        tabelaAlunos.innerHTML = '';
        listaAlunos.forEach(aluno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.dataNascimento}</td>
                <td>${aluno.telefone}</td>
                <td>
                    <a href="detalhe-aluno.html?id=${aluno.id}" class="btn btn-primary btn-sm me-1">Ver</a>
                    <a href="editar-aluno.html?id=${aluno.id}" class="btn btn-warning btn-sm me-1">Editar</a>
                    <button class="btn btn-danger btn-sm btn-excluir" data-id="${aluno.id}">Excluir</button>
                </td>
            `;
            tabelaAlunos.appendChild(row);
        });
        document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                if (confirm(`Tem certeza que deseja excluir o aluno ${id}?`)) {
                    const alunosAtualizados = alunos.filter(a => a.id !== id);
                    localStorage.setItem('alunos', JSON.stringify(alunosAtualizados));
                    renderizarAlunos(alunosAtualizados);
                    alert(`Aluno ${id} excluído com sucesso!`);
                }
            });
        });
    }
    renderizarAlunos(alunos);

    const nomeFiltro = document.getElementById('nomeFiltro');
    const cursoFiltro = document.getElementById('cursoFiltro');
    const dataFiltro = document.getElementById('dataFiltro');
    
    function aplicarFiltros() {
        const nome = nomeFiltro.value.toLowerCase();
        const curso = cursoFiltro.value;
        const data = dataFiltro.value;
        
        const alunosFiltrados = alunos.filter(aluno => {
            const atendeNome = aluno.nome.toLowerCase().includes(nome);
            const atendeCurso = curso === '' || aluno.curso === curso;
            const atendeData = data === '' || aluno.dataNascimento.includes(data.split('-').reverse().join('/'));
            
            return atendeNome && atendeCurso && atendeData;
        });
        
        renderizarAlunos(alunosFiltrados);
    }
    
    nomeFiltro.addEventListener('input', aplicarFiltros);
    cursoFiltro.addEventListener('change', aplicarFiltros);
    dataFiltro.addEventListener('change', aplicarFiltros);
    const formBusca = document.getElementById('form-busca');
    formBusca.addEventListener('submit', function(e) {
        e.preventDefault();
        const termo = document.getElementById('input-busca').value.toLowerCase();
        
        const alunosFiltrados = alunos.filter(aluno => 
            aluno.nome.toLowerCase().includes(termo) || 
            aluno.email.toLowerCase().includes(termo)
        );
        renderizarAlunos(alunosFiltrados);
    });
});