// 時間と分と秒を引数として受け取る
function startTimer(taskName, hours, minutes, seconds) {
    const totalTime = (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;

    const messageElement = document.getElementById('message');
    messageElement.textContent = '';

    setTimeout(function() {
        alert(`時間だよ！${taskName}終わったよね？`);
        blinkMessage();
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
