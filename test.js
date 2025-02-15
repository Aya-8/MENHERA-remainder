const addTaskButton = document.getElementById('add-task-button');
const addTaskForm = document.getElementById('add-task-form');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list').querySelector('ul');
const messageElement = document.getElementById('message');

addTaskButton.addEventListener('click', () => {
    addTaskForm.style.display = 'block';
});

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskName = document.getElementById('name').value;
    const hours = document.getElementById('hours').value || 0;
    const minutes = document.getElementById('minutes').value || 0;
    const seconds = document.getElementById('seconds').value || 0;

    const newTask = document.createElement('li');
    newTask.textContent = `${taskName} (${hours}時間${minutes}分${seconds}秒)`;
    taskList.appendChild(newTask);

    addTaskForm.style.display = 'none';
    taskForm.reset();

    startTimer(taskName, hours, minutes, seconds, newTask);
});

function startTimer(taskName, hours, minutes, seconds, taskElement) {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds * 1;
    let remainingSeconds = totalSeconds;

    // 経過時間表示
    const updateDisplay = () => {
        const displayHours = Math.floor(remainingSeconds / 3600);
        const displayMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const displaySeconds = remainingSeconds % 60;
        taskElement.textContent = `${taskName} (${displayHours}時間${displayMinutes}分${displaySeconds}秒)`;
    };

    updateDisplay();

    const timerInterval = setInterval(() => {
        remainingSeconds--;

        if (remainingSeconds < 0) {
            clearInterval(timerInterval);
            taskElement.textContent = `${taskName} (終了)`;
            return;
        }

        updateDisplay();
    }, 1000);

    // アラート表示
    setTimeout(() => {
        alert(`時間だよ！${taskName}終わったよね？`);
        messageElement.textContent = `時間だよ！${taskName}終わったよね？`; // メッセージ表示
    }, totalSeconds * 1000);
}
