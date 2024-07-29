let startTime, updatedTime, difference = 0, tInterval;
let running = false;
let lapCounter = 0;

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1000);
        running = true;
        document.getElementById("startBtn").disabled = true;
        document.getElementById("stopBtn").disabled = false;
        document.getElementById("resetBtn").disabled = false;
        document.getElementById("lapBtn").disabled = false;
    }
}

function stop() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        document.getElementById("startBtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCounter = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("laps").innerHTML = "";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("resetBtn").disabled = true;
    document.getElementById("lapBtn").disabled = true;
    resetClock();
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    document.getElementById("display").innerHTML = hours + ":" + minutes + ":" + seconds;
    updateClock(hours, minutes, seconds);
}

function lap() {
    lapCounter++;
    let lapTime = document.getElementById("display").innerHTML;
    let lapEntry = document.createElement("div");
    lapEntry.className = "lap";
    lapEntry.innerHTML = "Lap " + lapCounter + ": " + lapTime;
    document.getElementById("laps").appendChild(lapEntry);
}

function updateClock(hours, minutes, seconds) {
    let hourHand = document.getElementById("hour");
    let minuteHand = document.getElementById("minute");
    let secondHand = document.getElementById("second");

    let hoursDegrees = ((hours % 12) / 12) * 360 + ((minutes / 60) * 30) + 90;
    let minutesDegrees = (minutes / 60) * 360 + ((seconds / 60) * 6) + 90;
    let secondsDegrees = (seconds / 60) * 360 + 90;

    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
}

function resetClock() {
    document.getElementById("hour").style.transform = "rotate(90deg)";
    document.getElementById("minute").style.transform = "rotate(90deg)";
    document.getElementById("second").style.transform = "rotate(90deg)";
}