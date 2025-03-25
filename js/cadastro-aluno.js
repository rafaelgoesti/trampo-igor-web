document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('alunos')) {
        localStorage.setItem('alunos', JSON.stringify([]));
    }

    const formCadastro = document.getElementById('form-cadastro');
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length > 0) {
            value = value.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
        }
        e.target.value = value;
    });
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();
        const dataNascimento = new Date(document.getElementById('dataNascimento').value);
        const hoje = new Date();
        const idadeMinima = new Date(hoje.getFullYear() - 10, hoje.getMonth(), hoje.getDate());
        
        if (dataNascimento > idadeMinima) {
            alert('O aluno deve ter pelo menos 10 anos de idade.');
            return;
        }
        const alunos = JSON.parse(localStorage.getItem('alunos'));
        const novoId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1;
        
        const aluno = {
            id: novoId,
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            dataNascimento: formatarData(dataNascimento),
            curso: document.getElementById('curso').value,
            endereco: document.getElementById('endereco').value,
            telefone: document.getElementById('telefone').value,
            dataCadastro: formatarData(hoje)
        };
        alunos.push(aluno);
        localStorage.setItem('alunos', JSON.stringify(alunos));
        
        alert('Aluno cadastrado com sucesso!');
        window.location.href = 'lista-de-alunos.html';
    });
    
    function formatarData(data) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
});