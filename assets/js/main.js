(function () {
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");
  var year = document.getElementById("year");
  var form = document.getElementById("contactForm");
  var statusEl = document.getElementById("formStatus");
  var submitBtn = document.getElementById("submitBtn");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.hasAttribute("hidden");
      if (open) {
        mobileNav.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
      } else {
        mobileNav.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Soft parallax on hero atmosphere
  var atmosphere = document.querySelector(".hero-atmosphere");
  if (atmosphere && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener(
      "pointermove",
      function (event) {
        var x = (event.clientX / window.innerWidth - 0.5) * 16;
        var y = (event.clientY / window.innerHeight - 0.5) * 12;
        atmosphere.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      },
      { passive: true }
    );
  }

  // Reveal sections on scroll
  var bands = document.querySelectorAll(".service-band, .process-list li, .stack-mosaic li");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    bands.forEach(function (el, i) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity 0.55s ease " + (i % 6) * 0.05 + "s, transform 0.55s ease " + (i % 6) * 0.05 + "s";
      io.observe(el);
    });
    var style = document.createElement("style");
    style.textContent = ".is-in{opacity:1!important;transform:none!important}";
    document.head.appendChild(style);
  }

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      statusEl.hidden = true;
      statusEl.className = "form-status";
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      var data = new FormData(form);
      var payload = {
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone"),
        company: data.get("company"),
        service: data.get("service"),
        message: data.get("message"),
      };

      try {
        var res = await fetch("contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        var json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Failed to send");
        }
        form.reset();
        statusEl.hidden = false;
        statusEl.className = "form-status ok";
        statusEl.textContent =
          "Thanks — your message is saved. We'll get back soon.";
      } catch (err) {
        statusEl.hidden = false;
        statusEl.className = "form-status error";
        statusEl.textContent =
          err && err.message
            ? err.message
            : "Something went wrong. Please try again.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      }
    });
  }
})();
