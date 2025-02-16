function startTimer(taskName, hours, minutes, seconds, taskElement, priority) {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    let remainingSeconds = totalSeconds;
    let alertCount = 0;

    const updateDisplay = () => {
        const displayHours = Math.floor(remainingSeconds / 3600);
        const displayMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const displaySeconds = remainingSeconds % 60;
        taskElement.querySelector('.task-time').textContent = `${displayHours}時間${displayMinutes}分${displaySeconds}秒 - 重要度: ${priority}`;
    };

    updateDisplay();

    const timerInterval = setInterval(() => {
        remainingSeconds--;
        updateDisplay();

        if (remainingSeconds < 0) {
            clearInterval(timerInterval);
            taskElement.querySelector('.task-time').textContent = `時間切れ - 重要度: ${priority}`;

            const showAlert = () => {
                if (alertCount < 3) {
                    alert(`時間だよ！${taskName}終わったよね？`);
                    alert(`ねえ！終わったよね？`);
                    alert(`ちゃんと終わらせたよね？`);
                    blinkMessage();
                    showConfirm(taskName, taskElement.parentElement, taskElement.parentElement.parentElement);
                    alertCount++;
                }
            };
            showAlert();
            return;
        }
    }, 1000);

    taskElement.timerInterval = timerInterval;
}

function blinkMessage() {
    const messageElement = document.getElementById('message');
    let isVisible = true;

    const blinkInterval = setInterval(function () {
        messageElement.style.visibility = isVisible ? 'hidden' : 'visible';
        isVisible = !isVisible;
    }, 500);

    setTimeout(() => {
        clearInterval(blinkInterval);
        messageElement.style.visibility = 'visible';
    }, 5000);
}

function showConfirm(taskName, taskElement, liElement) {
    const messageElement = document.getElementById('message'); // message要素を取得

    if (confirm(`タスク「${taskName}」を削除する？`)) {
        if (taskElement) {
            taskElement.remove();
            messageElement.textContent = ''; // 削除時はメッセージをクリア
        }
    } else {
        messageElement.textContent = `何で終わらせてくれないの…？`; // 削除しない場合はメッセージを表示
    }
}
