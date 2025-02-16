const addTaskButton = document.getElementById('add-task-button');
const addTaskForm = document.getElementById('add-task-form');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list-header').querySelector('.list ul');
const sortPriorityButton = document.getElementById('sort-priority-button');
const sortDueButton = document.getElementById('sort-due-button');

addTaskButton.addEventListener('click', () => {
    addTaskForm.style.display = 'block';
});

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskName = document.getElementById('name').value;
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const priority = document.querySelector('input[name="priority"]:checked') ? document.querySelector('input[name="priority"]:checked').value : 'medium';
    const duration = `${hours}時間${minutes}分${seconds}秒`;

    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <div class="task-container">
            <input type="checkbox">
            <div class="task-details">
                <span class="task-name">${taskName}</span>
                <span class="task-time">${duration} - 重要度: ${priority}</span>
            </div>
            <div class="task-actions">
                <button class="menu-button">...</button>
                <div class="dropdown-menu">
                    <button class="edit-button">編集</button>
                    <button class="delete-button">削除</button>
                </div>
            </div>
        </div>
    `;
    taskList.appendChild(newTask);

    addTaskForm.style.display = 'none';
    taskForm.reset();

    startTimer(taskName, hours, minutes, seconds, newTask.querySelector('.task-container'), priority);
    sortTasks();
});

taskList.addEventListener('click', (event) => {
    const target = event.target;
    const taskContainer = target.closest('.task-container');

    if (target.classList.contains('menu-button')) {
        const dropdownMenu = taskContainer.querySelector('.dropdown-menu');
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block'; // 表示/非表示を切り替え
    } else if (target.classList.contains('edit-button')) {
        if (taskContainer) {
            const taskName = taskContainer.querySelector('.task-name').textContent;
            const editedTask = prompt('タスクを編集:', taskName);
            if (editedTask) {
                taskContainer.querySelector('.task-name').textContent = editedTask;
            }
        }
    } else if (target.classList.contains('delete-button')) {
        if (taskContainer) {
            taskContainer.parentElement.remove();
        }
    } else if (target.type === 'checkbox') {
        if (taskContainer) {
            taskContainer.parentElement.remove();
        }
    }
});

sortPriorityButton.addEventListener('click', () => {
    sortTasks('priority');
});

sortDueButton.addEventListener('click', () => {
    sortTasks('due');
});

function sortTasks(sortBy) {
    const tasks = Array.from(taskList.querySelectorAll('li:not(#add-task-button-container)'));

    tasks.sort((a, b) => {
        const aDetails = a.querySelector('.task-details').textContent;
        const bDetails = b.querySelector('.task-details').textContent;

        if (sortBy === 'priority') {
            const priorityA = aDetails.includes('絶対') ? 3 : aDetails.includes('やるべき') ? 2 : 1;
            const priorityB = bDetails.includes('絶対') ? 3 : bDetails.includes('やるべき') ? 2 : 1;
            return priorityB - priorityA;
        } else if (sortBy === 'due') {
            const timeA = getTimeInSeconds(aDetails);
            const timeB = getTimeInSeconds(bDetails);
            return timeA - timeB;
        }
        return 0;
    });

    tasks.forEach(task => taskList.appendChild(task));
}

function getTimeInSeconds(details) {
    const timeMatch = details.match(/(\d+)時間(\d+)分(\d+)秒/);
    if (timeMatch) {
        const hours = parseInt(timeMatch[1]) || 0;
        const minutes = parseInt(timeMatch[2]) || 0;
        const seconds = parseInt(timeMatch[3]) || 0;
        return hours * 3600 + minutes * 60 + seconds;
    }
    return Infinity;
}

function startTimer(taskName, hours, minutes, seconds, taskContainer, priority) {
    const totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    const messageElement = document.getElementById('message');
    messageElement.textContent = '';

    let alertCount = 0;

    const showAlert = () => {
        if (alertCount < 3) {
            alert(`時間だよ！${taskName}終わったよね？`);
            blinkMessage();
            alertCount++;
            showConfirm(taskName, taskContainer, taskContainer.parentElement);
        }
    };

    setTimeout(function() {
        showAlert();
    }, totalTime);
}

function blinkMessage() {
    const messageElement = document.getElementById('message');
    let isVisible = true;

    setInterval(function() {
        messageElement.style.visibility = isVisible ? 'hidden' : 'visible';
        isVisible = !isVisible;
    }, 500);
}
