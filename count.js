function startTimer() {
    const hours = document.getElementById('hours').value || 0;
    const minutes = document.getElementById('minutes').value || 0;
    const seconds = document.getElementById('seconds').value || 0;
    const taskName = document.getElementById('name').value;
    const totalTime = (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
    const messageElement = document.getElementById('message');
    messageElement.textContent = '';
    setTimeout(function() {
        alert(`${taskName}をやる時間になったよ！`);
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






