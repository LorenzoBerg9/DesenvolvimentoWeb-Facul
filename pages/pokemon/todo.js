document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-text');
    const todoList = document.getElementById('todo-list');


    loadTodoItems();


    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoItem(todoText);
            todoInput.value = '';
        }
    });


    function addTodoItem(text) {
        const li = document.createElement('li');
        li.textContent = text;
        todoList.appendChild(li);
        saveTodoItems();
    }


    function saveTodoItems() {
        localStorage.setItem('todoItems', todoList.innerHTML);
    }


    function loadTodoItems() {
        const savedItems = localStorage.getItem('todoItems');
        if (savedItems) {
            todoList.innerHTML = savedItems;
        }
    }
});
