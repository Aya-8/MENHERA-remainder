const addTaskButton = document.getElementById('add-task-button');
const addTaskForm = document.getElementById('add-task-form');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list').querySelector('ul');
const messageArea = document.getElementById('message'); // メッセージ表示エリア

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

    startTimer(taskName, hours, minutes, seconds, newTask);

    // 確認コンファームを表示
    showConfirm(taskName, newTask); // newTaskを渡す
});

let confirmCount = 0;

function showConfirm(taskName, taskElement) { // taskElementを受け取る
    const isYes = confirm(`${taskName}は本当に完了したの？`);

    if (isYes) {
        confirmCount++;
        if (confirmCount < 3) {
            showConfirm(taskName, taskElement); // taskElementを渡す
        } else {
            confirmCount = 0;
            messageArea.textContent = `${taskName}やっと完了したんだね！`;
            taskElement.textContent = `${taskName} (終了)`; // タイマーを停止
        }
    } else {
        messageArea.textContent = `${taskName}頑張って！`;
        confirmCount = 0;
    }
}


function startTimer(taskName, hours, minutes, seconds, taskElement) {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds * 1;
    let remainingSeconds = totalSeconds;

    const updateDisplay = () => {
        const displayHours = Math.floor(remainingSeconds / 3600);
        const displayMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const displaySeconds = remainingSeconds % 60;
        taskElement.textContent = `${taskName} (${displayHours}時間${displayMinutes}分${displaySeconds}秒)`;
    };

    updateDisplay(); // 初回表示

    const timerInterval = setInterval(() => {
        remainingSeconds--;

        if (remainingSeconds < 0) {
            clearInterval(timerInterval);
            taskElement.textContent = `${taskName} (終了)`;
            showConfirm(taskName, taskElement); // タイマー終了時に確認コンファームを表示
            return;
        }

        updateDisplay();
    }, 1000);

    // タイマー終了時にclearInterval()を呼び出すために、timerIntervalをtaskElementに保存
    taskElement.timerInterval = timerInterval;
}
