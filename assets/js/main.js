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
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.textContent = open ? "CLOSE" : "MENU";
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.textContent = "MENU";
      });
    });
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
