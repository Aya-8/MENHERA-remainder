const addTaskButton = document.getElementById('add-task-button');
const addTaskForm = document.getElementById('add-task-form');
const taskForm = document.getElementById('task-form');

const taskList = document.querySelector(".list");
console.log("タスクリストの display:", getComputedStyle(taskList).display);

const sortSelect = document.getElementById('sort-select');

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
        <input type="checkbox">
        <div class="task-details">
            ${taskName} (${duration}) - 重要度: ${priority}
        </div>
        <div class="task-actions">
            <button class="menu-button">...</button>
            <div class="dropdown-menu">
                <button class="edit-button">編集</button>
                <button class="delete-button">削除</button>
            </div>
        </div>
    `;
    taskList.appendChild(newTask);

    addTaskForm.style.display = 'none';
    taskForm.reset();

    startTimer(taskName, hours, minutes, seconds, newTask); // newTaskを引数として渡す
    sortTasks(); // タスクを追加後にソート
});

taskList.addEventListener('click', (event) => {
    const target = event.target;
    const listItem = target.closest('li');

    if (target.type === 'checkbox') {
        if (target.checked) {
          listItem.classList.add('completed'); // タスクを完了済みにする
        } else {
          listItem.classList.remove('completed'); // タスクを未完了に戻す
        }
      }
    

    if (target.classList.contains('menu-button')) {
        listItem.querySelector('.dropdown-menu').style.display = 'block';
    } else if (target.classList.contains('edit-button')) {
        // ...
    } else if (target.classList.contains('delete-button') || target.type === 'checkbox') {
        if (listItem && listItem.id !== 'add-task-button-container') {
            listItem.remove();
            event.stopPropagation(); // イベント伝播を阻止
        }
    }
});

sortSelect.addEventListener('change', () => {
    sortTasks();
});

function sortTasks() {
    const sortValue = sortSelect.value;
    const tasks = Array.from(taskList.querySelectorAll('li:not(#add-task-button-container)'));

    tasks.sort((a, b) => {
        if (sortValue === 'priority') {
            const priorityA = a.querySelector('.task-details').textContent.includes('絶対') ? 3 : a.querySelector('.task-details').textContent.includes('やるべき') ? 2 : 1;
            const priorityB = b.querySelector('.task-details').textContent.includes('絶対') ? 3 : b.querySelector('.task-details').textContent.includes('やるべき') ? 2 : 1;
            return priorityB - priorityA;
        } else {
            // 締め切り順のソートは未実装
            return 0;
        }
    });

    tasks.forEach(task => taskList.appendChild(task));
}

function startTimer(taskName, hours, minutes, seconds, newTask) { //newTaskを受け取る
    const totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    const messageElement = document.getElementById('message');
    messageElement.textContent = '';

    setTimeout(function() {
        alert(`時間だよ！ ${taskName} 終わったよね？`);
        blinkMessage();
    }, totalTime);

      
        if (remainingSeconds < 0) {
          clearInterval(timerInterval);
          taskElement.textContent = `${taskName} (終了)`;
      
          const confirmationDialog = document.getElementById('confirmation-dialog');
          const confirmationTaskName = document.getElementById('confirmation-task-name');
      
          confirmationTaskName.textContent = taskName;
          confirmationDialog.style.display = 'block';
      
          // ボタンのイベントリスナー
          document.getElementById('complete-button').addEventListener('click', () => {
            confirmationDialog.style.display = 'none';
            taskElement.classList.add('completed');
            // 必要であれば、localStorageの更新などを行う
          });
      
          document.getElementById('incomplete-button').addEventListener('click', () => {
            confirmationDialog.style.display = 'none';
            // 必要であれば、タスクの状態を未完了に戻す処理を行う
          });
      
          return;
      }
}

function blinkMessage() {
    const messageElement = document.getElementById('message');
    let isVisible = true;

    setInterval(function() {
        messageElement.style.visibility = isVisible ? 'hidden' : 'visible';
        isVisible = !isVisible;
    }, 500);
}
