const lsVisistorsKey = '@visitorsCounter'

const defaultLsVisitors = {
    count: 0,
    lastVisit: getCurrentDateAndTime(),
}

function getCurrentDateAndTime() {
    const locale = 'pt-BR'
    const date = new Date()

    options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    const time = new Intl.DateTimeFormat(locale, options).format(date)
    return time
}

function countVisitors() {
    const lsVisitors =
        localStorage.getItem(lsVisistorsKey) || JSON.stringify(defaultLsVisitors)
    const lsVisitorsObj = JSON.parse(lsVisitors)

    lsVisitorsObj.count++
    lsVisitorsObj.lastVisit = getCurrentDateAndTime()

    localStorage.setItem(lsVisistorsKey, JSON.stringify(lsVisitorsObj))

    const p = document.createElement('p')
    p.id = 'visitors-counter'
    p.textContent = `Esta página foi visitada ${lsVisitorsObj.count} vezes. A última visita foi: ${lsVisitorsObj.lastVisit}`

    const footer = document.querySelector('footer')

    footer.appendChild(p)
}

document.addEventListener('DOMContentLoaded', function () {
    countVisitors()
})


// Função para exibir todas as tarefas salvas
function exibirTarefasSalvas() {
    // Obtém a lista de tarefas do localStorage
    const listaTarefas = JSON.parse(localStorage.getItem('listaTarefas'));

    // Verifica se há tarefas na lista
    if (listaTarefas && listaTarefas.length > 0) {
        // Obtém o elemento onde as tarefas serão exibidas
        const listaElement = document.getElementById('lista-tarefas');

        // Limpa qualquer conteúdo pré-existente na lista
        listaElement.innerHTML = '';

        // Itera sobre cada tarefa na lista e cria elementos para exibi-las
        listaTarefas.forEach((tarefa, index) => {
            // Cria um elemento de lista
            const listItem = document.createElement('li');

            // Define o conteúdo do elemento de lista com o título e a descrição da tarefa
            listItem.textContent = `Título: ${tarefa.titulo}, Descrição: ${tarefa.descricao}`;

            // Adiciona o elemento de lista à lista na página
            listaElement.appendChild(listItem);
        });
    }
}

// Função para enviar o formulário
function enviar(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos de entrada
    const titulo = document.forms['meu-form']['tarefa'].value;
    const descricao = document.forms['meu-form']['descricao'].value;

    // Verifica se os campos não estão vazios
    if (titulo.trim() !== '' && descricao.trim() !== '') {
        // Cria um objeto com os valores da tarefa
        const tarefa = {
            titulo: titulo,
            descricao: descricao
        };

        // Obtém a lista de tarefas do localStorage
        let listaTarefas = localStorage.getItem('listaTarefas');

        // Se não houver uma lista de tarefas, inicializa uma lista vazia
        if (!listaTarefas) {
            listaTarefas = [];
        } else {
            // Se houver uma lista de tarefas, converte de JSON para objeto JavaScript
            listaTarefas = JSON.parse(listaTarefas);
        }

        // Adiciona a nova tarefa à lista de tarefas
        listaTarefas.push(tarefa);

        // Armazena a lista atualizada no localStorage
        localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));

        // Limpa os campos do formulário
        document.forms['meu-form']['tarefa'].value = '';
        document.forms['meu-form']['descricao'].value = '';

        // Exibe todas as tarefas salvas na página
        exibirTarefasSalvas();
    } else {
        // Se algum campo estiver vazio, exibe uma mensagem de erro
        alert('Por favor, preencha todos os campos.');
    }
}

function exibirTarefasSalvas() {
    // Obtém a lista de tarefas do localStorage
    const listaTarefas = JSON.parse(localStorage.getItem('listaTarefas'));

    // Verifica se há tarefas na lista
    if (listaTarefas && listaTarefas.length > 0) {
        // Obtém o elemento onde as tarefas serão exibidas
        const listaElement = document.getElementById('lista-tarefas');

        // Limpa qualquer conteúdo pré-existente na lista
        listaElement.innerHTML = '';

        // Itera sobre cada tarefa na lista e cria elementos para exibi-las
        listaTarefas.forEach((tarefa, index) => {
            // Cria um elemento de divisão para cada tarefa
            const tarefaDiv = document.createElement('div');
            tarefaDiv.classList.add('tarefa');

            // Cria um elemento de divisão para o título da tarefa
            const tituloDiv = document.createElement('div');
            tituloDiv.textContent = `Título: ${tarefa.titulo}`;
            tituloDiv.classList.add('titulo');

            // Cria um elemento de divisão para a descrição da tarefa
            const descricaoDiv = document.createElement('div');
            descricaoDiv.textContent = `Descrição: ${tarefa.descricao}`;
            descricaoDiv.classList.add('descricao');

            // Adiciona os elementos de título e descrição à divisão da tarefa
            tarefaDiv.appendChild(tituloDiv);
            tarefaDiv.appendChild(descricaoDiv);

            // Adiciona a divisão da tarefa à lista na página
            listaElement.appendChild(tarefaDiv);
        });
    }
}




