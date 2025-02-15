function startTimer(taskName, hours, minutes, seconds, taskElement) {
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let remainingSeconds = totalSeconds;
  let alertCount = 0;

  const updateDisplay = () => {
      const displayHours = Math.floor(remainingSeconds / 3600);
      const displayMinutes = Math.floor((remainingSeconds % 3600) / 60);
      const displaySeconds = remainingSeconds % 60;
      taskElement.textContent = `${taskName} (${displayHours}時間${displayMinutes}分${displaySeconds}秒)`;
  };

  updateDisplay();

  const timerInterval = setInterval(() => {
      remainingSeconds--;
      updateDisplay();

      if (remainingSeconds < 0) {
          clearInterval(timerInterval);
          taskElement.textContent = `${taskName} (終了)`;

          const showAlert = () => {
              if (alertCount < 3) {
                  alert(`時間だよ！${taskName}終わったよね？`);
                  blinkMessage();
                  alertCount++;
                  showConfirm(taskName, taskElement.parentElement);
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

function showConfirm(taskName, taskElement) {
  if (confirm(`タスク「${taskName}」を削除しますか？`)) {
      if (taskElement) {
          let taskItem = taskElement.closest("li");
          if (taskItem) {
              // タイマーが動いていたら止める
              if (taskItem.timerInterval) {
                  clearInterval(taskItem.timerInterval);
              }
              // タスクアイテムを削除
              taskItem.remove();
              console.log("削除成功");

              // `localStorage` からも削除
              let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
              tasks = tasks.filter(task => task.name !== taskName); // タスク名が一致しないものだけ残す
              localStorage.setItem("tasks", JSON.stringify(tasks));

              // タスクリストを更新
              const taskList = document.querySelector(".list");
              // ここで特に再描画は必要ありません
              // もしタスクリストの内容を手動で更新する必要がある場合は、以下のようにできます
              // taskList.innerHTML = ''; // 一度クリアする場合
              // tasks.forEach(task => {
              //     taskList.innerHTML += `<li>${task.name}</li>`; // 例としてタスク名を表示
              // });
          }
      }
  }
}
