// Get the current date and time
let currentTime = new Date();
let intervalDelay = 1000; // 1000ms = 1 second

// Update the displayed time every second
let timer = setInterval(() => {
  currentTime = new Date(); // Refresh current time

  // Select DOM elements for each time unit
  let daysElement = document.querySelector(".events .info .time .unit .days");
  let hoursElement = document.querySelector(".events .info .time .unit .hours");
  let minutesElement = document.querySelector(".events .info .time .unit .minutes");
  let secondsElement = document.querySelector(".events .info .time .unit .seconds");
  let millisecondsElement = document.querySelector(".events .info .time .unit .seconds2");
  let yearsElement = document.querySelector(".events .info .time .unit .years");

  // Update the content of each element with the current time values
  daysElement.innerHTML = currentTime.getDate();
  hoursElement.innerHTML = currentTime.getHours();
  minutesElement.innerHTML = currentTime.getMinutes();
  secondsElement.innerHTML = currentTime.getSeconds();
  millisecondsElement.innerHTML = currentTime.getMilliseconds();
  yearsElement.innerHTML = currentTime.getFullYear();
}, intervalDelay);
