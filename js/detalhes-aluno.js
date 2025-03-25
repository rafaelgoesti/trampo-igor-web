document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const alunoId = parseInt(urlParams.get('id'));
    
    if (!alunoId) {
        alert('ID do aluno não especificado!');
        window.location.href = 'lista-de-alunos.html';
        return;
    }
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    const aluno = alunos.find(a => a.id === alunoId);
    
    if (!aluno) {
        alert('Aluno não encontrado!');
        window.location.href = 'lista-de-alunos.html';
        return;
    }
    const detalhesContainer = document.getElementById('aluno-detalhes');
    detalhesContainer.innerHTML = `
        <dt class="col-sm-3">Nome:</dt>
        <dd class="col-sm-9">${aluno.nome}</dd>

        <dt class="col-sm-3">Email:</dt>
        <dd class="col-sm-9">${aluno.email}</dd>

        <dt class="col-sm-3">Curso:</dt>
        <dd class="col-sm-9">${aluno.curso}</dd>

        <dt class="col-sm-3">Data de Nascimento:</dt>
        <dd class="col-sm-9">${aluno.dataNascimento}</dd>

        <dt class="col-sm-3">Telefone:</dt>
        <dd class="col-sm-9">${aluno.telefone}</dd>

        <dt class="col-sm-3">Endereço:</dt>
        <dd class="col-sm-9">${aluno.endereco || 'Não informado'}</dd>

        <dt class="col-sm-3">Data de Cadastro:</dt>
        <dd class="col-sm-9">${aluno.dataCadastro || 'Não informada'}</dd>
    `;
    const btnEditar = document.querySelector('a[href="editar-aluno.html"]');
    btnEditar.href = `editar-aluno.html?id=${alunoId}`;
    document.getElementById('btn-excluir').addEventListener('click', function() {
        if (confirm('Tem certeza que deseja excluir este aluno?')) {
            const alunosAtualizados = alunos.filter(a => a.id !== alunoId);
            localStorage.setItem('alunos', JSON.stringify(alunosAtualizados));
            
            alert('Aluno excluído com sucesso!');
            window.location.href = 'lista-de-alunos.html';
        }
    });
});