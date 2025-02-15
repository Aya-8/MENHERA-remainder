function startTimer() {
  const time = document.getElementById('timeInput').value;
  const messageElement = document.getElementById('message');
  messageElement.textContent = '';
  
  setTimeout(function() {
    messageElement.textContent = '時間が経過しました！';
    blinkMessage();
  }, time * 1000);
}

function blinkMessage() {
  const messageElement = document.getElementById('message');
  let isVisible = true;

  setInterval(function() {
    messageElement.style.visibility = isVisible ? 'hidden' : 'visible';
    isVisible = !isVisible;
  }, 500);
}
