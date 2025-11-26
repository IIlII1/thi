let startTime;
let timeoutHandle;
let delay = 0;
let waitgreen = false;
let bestTime = null;
let history = [];
const area = document.getElementById("area");
const display = document.getElementById("display");
const result = document.getElementById('result');
const bestScoreEl = document.getElementById('best-score');
const avgScoreEl = document.getElementById('avg-score');
const historyList = document.getElementById('history-list');
function preparetest() {
    waitgreen = true;
    area.style.backgroundColor = 'red';
    display.textContent = 'Chờ màu xanh lá...';
    result.textContent = '...';


    delay = Math.random() * 3000 + 2000; 
    timeoutHandle = setTimeout(startTimer, delay);
    
    area.onclick = handleclick;
}
function handleclick() {
    if (waitgreen) {
        earlyclick();
    } else if (area.style.backgroundColor === 'green') {
        endTimer();
    } else if (area.style.backgroundColor === 'blue' || area.style.backgroundColor === 'darkgreen' || area.style.backgroundColor === 'darkred') {
        preparetest();
    }
}
function endTimer() {
    const reactionTime = new Date().getTime() - startTime;
    waitgreen = false;
    display.textContent = 'Tuyệt vời!';
    result.textContent = `${reactionTime} ms`;
    area.style.backgroundColor = "darkgreen";
    updateStats(reactionTime);
    setTimeout(() => {
        display.textContent = 'Bấm để chơi lại';
        area.style.backgroundColor = 'blue'; 
    }, 2000);
}
function earlyclick() {
    clearTimeout(timeoutHandle);
    waitgreen = false; 
    area.style.backgroundColor = 'darkred';
    display.textContent = "Thất bại!";
    result.textContent = "Bạn bấm quá sớm";
    setTimeout(() => {
        startRound();
    }, 2000);
}
function startRound() {
    waitgreen = false;
    area.style.backgroundColor = 'blue';
    display.textContent = 'Bấm vào màn hình để bắt đầu';
    result.textContent = 'Sẵn sàng?';
    area.onclick = handleclick;
}
function startTimer() {
    waitgreen = false;
    startTime = new Date().getTime();
    area.style.backgroundColor = 'green';
    display.textContent = 'BẤM NGAY!';

}
function updateStats(time) {
    if (bestTime === null || time < bestTime) {
        bestTime = time;
        bestScoreEl.textContent = bestTime;

        bestScoreEl.style.color = "yellow";
    } else {
        bestScoreEl.style.color = "white";
    }
    history.push(time);
    

    const li = document.createElement("li");
    li.textContent = `Lần ${history.length}: ${time} ms`;
    historyList.prepend(li); 


    const total = history.reduce((acc, curr) => acc + curr, 0);
    const avg = Math.floor(total / history.length);
    avgScoreEl.textContent = avg;
}
startRound();