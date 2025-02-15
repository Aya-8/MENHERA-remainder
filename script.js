const addTaskButton = document.getElementById('add-task-button');

const addTaskForm = document.getElementById('add-task-form');

const taskForm = document.getElementById('task-form');

const taskList = document.getElementById('task-list').querySelector('ul');

addTaskButton.addEventListener('click', () => {

addTaskForm.style.display = 'block';

});


taskForm.addEventListener('submit', (event) => {

event.preventDefault();

const taskName = document.getElementById('name').value;

const hours = document.getElementById('hours').value || 0;

const minutes = document.getElementById('minutes').value || 0;

const seconds = document.getElementById('seconds').value || 0;

const duration = `${hours}時間${minutes}分${seconds}秒`;


const newTask = document.createElement('li');

newTask.textContent = `${taskName} (${duration})`;

taskList.appendChild(newTask);



addTaskForm.style.display = 'none';

taskForm.reset();



 // 時間と分と秒を引数として渡す

startTimer(taskName, hours, minutes, seconds);

});
