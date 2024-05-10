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



function exibirTarefasSalvas() {
    const listaTarefas = JSON.parse(localStorage.getItem('listaTarefas'));


    if (listaTarefas && listaTarefas.length > 0) {
        const listaElement = document.getElementById('lista-tarefas');

        listaElement.innerHTML = '';

        listaTarefas.forEach((tarefa, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Título: ${tarefa.titulo}, Descrição: ${tarefa.descricao}`;
            listaElement.appendChild(listItem);
        });
    }
}


function enviar(event) {
    event.preventDefault();

    const titulo = document.forms['meu-form']['tarefa'].value;
    const descricao = document.forms['meu-form']['descricao'].value;

    if (titulo.trim() !== '' && descricao.trim() !== '') {
        const tarefa = {
            titulo: titulo,
            descricao: descricao
        };

        let listaTarefas = localStorage.getItem('listaTarefas');

        if (!listaTarefas) {
            listaTarefas = [];
        } else {
            listaTarefas = JSON.parse(listaTarefas);
        }

        listaTarefas.push(tarefa);

        localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));

        document.forms['meu-form']['tarefa'].value = '';
        document.forms['meu-form']['descricao'].value = '';

        exibirTarefasSalvas();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function exibirTarefasSalvas() {
    const listaTarefas = JSON.parse(localStorage.getItem('listaTarefas'));

    if (listaTarefas && listaTarefas.length > 0) {
        const listaElement = document.getElementById('lista-tarefas');

        listaElement.innerHTML = '';

        listaTarefas.forEach((tarefa, index) => {
            const tarefaDiv = document.createElement('div');
            tarefaDiv.classList.add('tarefa');

            const tituloDiv = document.createElement('div');
            tituloDiv.textContent = `Título: ${tarefa.titulo}`;
            tituloDiv.classList.add('titulo');

            const descricaoDiv = document.createElement('div');
            descricaoDiv.textContent = `Descrição: ${tarefa.descricao}`;
            descricaoDiv.classList.add('descricao');

            tarefaDiv.appendChild(tituloDiv);
            tarefaDiv.appendChild(descricaoDiv);

            listaElement.appendChild(tarefaDiv);
        });
    }
}




