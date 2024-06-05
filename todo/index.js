const taskKey = '@tasks';
let selectedTaskId = null;

function addTask(event) {
  event.preventDefault();
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');

  li.id = `id-${taskId}`;
  li.innerHTML = `
    <div class="task-content">
      <div>
        <h2>${taskTitle}</h2>
        <p>${taskDescription}</p>
      </div>
      <div class="task-actions">
        <button title="Editar tarefa" onClick="openEditDialog(${taskId})">✏️</button>
        <button title="Excluir tarefa" onClick="deleteTask(${taskId})">❌</button>
      </div>
    </div>
  `;

  taskList.appendChild(li);

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

  selectedTaskId = tasks.findIndex((task) => task.id === taskId);
  const task = tasks[selectedTaskId];

  const dialog = document.querySelector('dialog');

  const editTitle = document.querySelector('#editTaskForm #editTitle');
  const editDescription = document.querySelector('#editTaskForm #editDescription');

  editTitle.value = task.title;
  editDescription.value = task.description;

  dialog.showModal();
}

function closeDialog() {
  const dialog = document.querySelector('dialog');
  dialog.close();
}

function editTask(event) {
  event.preventDefault();

  const editTitle = document.querySelector('#editTaskForm #editTitle').value;
  const editDescription = document.querySelector('#editTaskForm #editDescription').value;

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

  tasks[selectedTaskId].title = editTitle;
  tasks[selectedTaskId].description = editDescription;

  const editedTask = document.querySelector(`#taskList #id-${tasks[selectedTaskId].id}`);
  editedTask.querySelector('h2').textContent = editTitle;
  editedTask.querySelector('p').textContent = editDescription;

  localStorage.setItem(taskKey, JSON.stringify(tasks));

  const dialog = document.querySelector('dialog');
  dialog.close();
}

function deleteTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  tasks.splice(taskIndex, 1);

  const taskElement = document.querySelector(`#taskList #id-${taskId}`);
  if (taskElement) {
    taskElement.remove();
  }

  localStorage.setItem(taskKey, JSON.stringify(tasks));
}

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector('#taskList');

  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div class="task-content">
          <div>
            <h2>${task.title}</h2>
            <p>${task.description}</p>
          </div>
          <div class="task-actions">
            <button title="Editar tarefa" onClick="openEditDialog(${task.id})">✏️</button>
            <button title="Excluir tarefa" onClick="deleteTask(${task.id})">❌</button>
          </div>
        </div>
      </li>
    `
    )
    .join('');
});
