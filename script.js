let startTime, updatedTime, difference, tInterval;
let running = false;

const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const millisecondsSpan = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');
const serialnumber = document.getElementById('serial-number')

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopBtn.innerText = 'Stop';
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        running = true;
    } else {
        startStopBtn.innerText = 'Start';
        clearInterval(tInterval);
        running = false;
    }
});

lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = `${pad(minutesSpan.innerText)}:${pad(secondsSpan.innerText)}:${pad(millisecondsSpan.innerText)}`;
        const lapItem = document.createElement('li');
        lapItem.innerText = lapTime;
        lapsList.appendChild(lapItem);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    startStopBtn.innerText = 'Start';
    minutesSpan.innerText = '00';
    secondsSpan.innerText = '00';
    millisecondsSpan.innerText = '00';
    lapsList.innerHTML = '';
});

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesSpan.innerText = pad(minutes);
    secondsSpan.innerText = pad(seconds);
    millisecondsSpan.innerText = pad(milliseconds);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
