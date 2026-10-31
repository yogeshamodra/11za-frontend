/* About page: animate the stat numbers when they scroll into view */
document.addEventListener("DOMContentLoaded", function () {
  var counters = document.querySelectorAll(".stat-number");
  if (!counters.length) return;

  function run(counter) {
    var start = parseInt(counter.getAttribute("data-start"), 10);
    var target = parseInt(counter.getAttribute("data-target"), 10);
    var suffix = counter.getAttribute("data-suffix") || "";
    var steps = 60;
    var interval = 2000 / steps;
    var step = (target - start) / steps;
    var current = start;

    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current).toLocaleString() + suffix;
    }, interval);
  }

  if (
    !("IntersectionObserver" in window) ||
    (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)
  ) {
    counters.forEach(function (c) {
      c.textContent =
        parseInt(c.getAttribute("data-target"), 10).toLocaleString() +
        (c.getAttribute("data-suffix") || "");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(function (c) {
    io.observe(c);
  });
});
