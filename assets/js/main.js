(function () {
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");
  var year = document.getElementById("year");
  var form = document.getElementById("contactForm");
  var formAlert = document.getElementById("formAlert");
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

  var atmosphere = document.querySelector(".hero-atmosphere");
  if (atmosphere && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener(
      "pointermove",
      function (event) {
        var x = (event.clientX / window.innerWidth - 0.5) * 16;
        var y = (event.clientY / window.innerHeight - 0.5) * 12;
        atmosphere.style.transform =
          "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      },
      { passive: true }
    );
  }

  var bands = document.querySelectorAll(
    ".service-band, .process-list li, .stack-mosaic li"
  );
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
      el.style.transition =
        "opacity 0.55s ease " +
        (i % 6) * 0.05 +
        "s, transform 0.55s ease " +
        (i % 6) * 0.05 +
        "s";
      io.observe(el);
    });
    var style = document.createElement("style");
    style.textContent =
      ".is-in{opacity:1!important;transform:none!important}";
    document.head.appendChild(style);
  }

  function clearFieldErrors() {
    if (!form) return;
    form.querySelectorAll(".field").forEach(function (field) {
      field.classList.remove("is-invalid");
    });
    form.querySelectorAll(".field-error").forEach(function (el) {
      el.textContent = "";
      el.classList.remove("is-visible");
    });
    form.querySelectorAll(".has-error").forEach(function (el) {
      el.classList.remove("has-error");
    });
  }

  function hideAlert() {
    if (!formAlert) return;
    formAlert.hidden = true;
    formAlert.className = "form-alert";
    formAlert.textContent = "";
  }

  function showAlert(type, message) {
    if (!formAlert) return;
    formAlert.hidden = false;
    formAlert.className = "form-alert is-" + type + " is-visible";
    formAlert.textContent = message;
    formAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function showFieldErrors(errors) {
    if (!form || !errors) return;
    Object.keys(errors).forEach(function (field) {
      if (field === "form") return;
      var message = errors[field];
      var wrap = form.querySelector('.field[data-field="' + field + '"]');
      var input = form.querySelector('[name="' + field + '"]');
      var errorEl = form.querySelector('[data-error-for="' + field + '"]');
      if (wrap) wrap.classList.add("is-invalid");
      if (input) input.classList.add("has-error");
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add("is-visible");
      }
    });
  }

  function validateClient() {
    var errors = {};
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var email = String(data.get("email") || "").trim();
    var phone = String(data.get("phone") || "").trim();
    var company = String(data.get("company") || "").trim();
    var message = String(data.get("message") || "").trim();

    if (!name) errors.name = "Please enter your name.";
    else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

    if (!email) errors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (phone.length > 40) errors.phone = "Phone number is too long.";
    if (company.length > 160) errors.company = "Company name is too long.";

    if (!message) errors.message = "Please enter a message.";
    else if (message.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    return errors;
  }

  if (form) {
    form.querySelectorAll("input, textarea, select").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("has-error");
        var name = field.getAttribute("name");
        var wrap = form.querySelector('.field[data-field="' + name + '"]');
        var errorEl = form.querySelector('[data-error-for="' + name + '"]');
        if (wrap) wrap.classList.remove("is-invalid");
        if (errorEl) {
          errorEl.textContent = "";
          errorEl.classList.remove("is-visible");
        }
      });
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      clearFieldErrors();
      hideAlert();

      var clientErrors = validateClient();
      if (Object.keys(clientErrors).length) {
        showFieldErrors(clientErrors);
        showAlert("error", "Please fix the highlighted fields and try again.");
        var firstInvalid = form.querySelector(".has-error");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      var data = new FormData(form);
      var payload = {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        company: String(data.get("company") || "").trim(),
        service: String(data.get("service") || "").trim(),
        message: String(data.get("message") || "").trim(),
      };

      try {
        var res = await fetch("contact.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        var raw = await res.text();
        var json = null;
        try {
          json = raw ? JSON.parse(raw) : null;
        } catch (parseErr) {
          throw new Error(
            "Server returned an unexpected response. Please try again or email info@talentocart.com."
          );
        }

        if (!res.ok) {
          if (json && json.errors) {
            showFieldErrors(json.errors);
          }
          throw new Error(
            (json && json.error) ||
              "Could not send your message. Please try again."
          );
        }

        form.reset();
        clearFieldErrors();
        showAlert("ok", "Thanks — your message is saved. We'll get back soon.");
      } catch (err) {
        showAlert(
          "error",
          err && err.message
            ? err.message
            : "Something went wrong. Please try again."
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      }
    });
  }
})();
