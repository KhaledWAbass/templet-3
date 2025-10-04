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
  // ensure timer is used/cleared so linter won't complain
  window.addEventListener('beforeunload', function () {
    clearInterval(timer);
  });
  
  // ===================================================================
  // Clients counter (safe access)
  // ===================================================================
  let stats = localStorage.getItem("Clients");
  const div = document.querySelector(".stats .container .box .Clients");
  const Section_stats = document.querySelector(".stats");
  let i = 0;
  function saveClients(val) {
    localStorage.setItem("Clients", JSON.stringify(val));
  }
  function localScroll(scrollY) {
    localStorage.setItem("scrollY", JSON.stringify(scrollY));
  }
// window.addEventListener("scroll", function () { 
//   if (stats && Section_stats) {
//     i = JSON.parse(stats);
//     if (window.scrollY > Section_stats.offsetTop - 250) {
//       if (div) {
//         // update the displayed clients count (no jQuery animation)
//         div.textContent = i;
//       }
//     }
//   }
// });
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
  const section = document.querySelector(".our-skills");
  // Use a native scroll listener (no nested $(document).ready() inside DOMContentLoaded)
  if (section && window.jQuery) {
    $(window).one("scroll", function () {
      if (window.scrollY > section.offsetTop - 250 || window.pageYOffset > section.offsetTop) {
        $(spans).each(function () {
          const width = $(this).data("width");
          if (width) {
            $(this).animate({ "width": width }, 1000);
          }
        })
      }
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
          // Ignore JSON parse errors
        }
      }

      // ===================================================================
      // Up button and progress bar (run after load so heights are correct)
      // ===================================================================
      let upButton = document.querySelector(".UP");
      let progress = document.querySelector(".proggres");
      let hight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      window.addEventListener("scroll", function () {
        // upButton guard
        if (upButton) {
          if (window.scrollY >= 700) {
            upButton.style.display = "block";
          } else {
            upButton.style.display = "none";
          }
        }

        // progress guard
        if (progress && hight > 0) {
          let top = document.documentElement.scrollTop || document.body.scrollTop;
          progress.style.width = `${(top / hight) * 100}%`;
        }

        // save current scroll position
        localScroll(window.scrollY);
      });

      // upButton click (jQuery if available, otherwise native)
      if (upButton) {
        if (window.jQuery) {
          $(upButton).click(function () {
            $("html,body").animate({ scrollTop: 0 }, 600);
          });
        } else {
          upButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      }

      // Smooth scroll for header links (jQuery if available, otherwise native)
      if (window.jQuery) {
        let a = $(".header a");
        $(a).click(function (e) {
          e.preventDefault();
          let href = $(this).attr("href");
          if (!href) return;
          let $target = $(href);
          if ($target.length) {
            let offset = $target.offset().top;
            $("html,body").animate({ scrollTop: offset }, 600);
          }
        });
      } else {
        document.querySelectorAll(".header a").forEach(anchor => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let href = this.getAttribute("href");
            if (!href) return;
            let target = document.querySelector(href);
            if (target) {
              let offset = target.offsetTop;
              window.scrollTo({ top: offset, behavior: 'smooth' });
            }
          });
        });
      }
    }); // end load
  }
  // ===================================================================
  
  // ===================================================================


}); // end DOMContentLoaded
