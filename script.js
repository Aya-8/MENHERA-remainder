    // 時間と分と秒を引数として渡す
    startTimer(taskName, hours, minutes, seconds);
    startTimer(taskName, hours, minutes, seconds, newTask);
});

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
            return;
        }

        updateDisplay();
    }, 1000);
}
