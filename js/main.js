document.addEventListener('DOMContentLoaded', function () {
  // Time elements (queried once)
  const daysElement = document.querySelector(".events .info .time .unit .days");
  const hoursElement = document.querySelector(".events .info .time .unit .hours");
  const monthsElement = document.querySelector(".events .info .time .unit .Months");
  const minutesElement = document.querySelector(".events .info .time .unit .minutes");
  const secondsElement = document.querySelector(".events .info .time .unit .seconds");
  const millisecondsElement = document.querySelector(".events .info .time .unit .seconds2");
  const yearsElement = document.querySelector(".events .info .time .unit .years");

  function updateTime() {
    const currentTime = new Date();
    if (daysElement) daysElement.textContent = currentTime.getDate();
    if (monthsElement) monthsElement.textContent = currentTime.getMonth() + 1; // Months are zero-indexed
    if (hoursElement) hoursElement.textContent = currentTime.getHours();
    if (minutesElement) minutesElement.textContent = currentTime.getMinutes();
    if (secondsElement) secondsElement.textContent = currentTime.getSeconds();
    if (millisecondsElement) millisecondsElement.textContent = currentTime.getMilliseconds();
    if (yearsElement) yearsElement.textContent = currentTime.getFullYear();
  }

  updateTime();
  const timer = setInterval(updateTime, 1000);
  
  // ===================================================================
  // Clients counter (safe access)
  // ===================================================================
  const div = document.querySelector(".stats .container .box .Clients");
  let i = 0;
  function saveClients(val) {
    localStorage.setItem("Clients", JSON.stringify(val));
  }
  function localScroll(scrollY) {
    localStorage.setItem("scrollY", JSON.stringify(scrollY));
  }

  let stats = localStorage.getItem("Clients");
  if (stats) {
    try {
      i = JSON.parse(stats);
    } catch (e) {
      i = 0;
    }
  }
  i++;
  saveClients(i);
  if (div) {
    div.textContent = i;
  }
  // ===================================================================
  // Skills progress
  // ===================================================================
  const spans = document.querySelectorAll(".our-skills .skill .the-progress span");
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 10000) {
      spans.forEach(spanEl => {
        const width = spanEl.getAttribute("data-width");
        if (width) {
          spanEl.style.width = width;
        }
      });
    }
    localScroll(window.scrollY);
  });

  // Restore scroll after full load (images/layout)
  window.addEventListener('load', function () {
    let scrollY = localStorage.getItem("scrollY");
    if (scrollY) {
      try {
        window.scrollTo({
          top: JSON.parse(scrollY),
          behavior: 'smooth'
        });
      } catch (e) {
        // ignore invalid stored value
      }
    }
  });
  // ===================================================================
  let upButton = document.querySelector(".UP");
  let progress = document.querySelector(".proggres")
  let hight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  window.addEventListener("scroll", function () {
    if (this.scrollY >= 700) {
      upButton.style.display = "block"
    } else {
      upButton.style.display = "none"
    }
    let top = document.documentElement.scrollTop
    progress.style.width = `${(top / hight) *100}%`

  });
$(upButton).click(function () {
    $("html,body").animate({ scrollTop: 0 }, 600)
  });
  // ===================================================================
  let a = $(".header a")
  $(a).click(function (e) { 
    e.preventDefault()
    let href = $(this).attr("href")
    console.log(href)
    let offset = $(href).offset().top
    $("html,body").animate({ scrollTop: offset }, 600)
  })
});
