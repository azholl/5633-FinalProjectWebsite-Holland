// Demonstration form validation; no information is sent or saved.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  // Helper function to show a status message with highlight
  function setStatusMessage(message) {
    if (!status) return;

    status.textContent = message;

    // Toggle highlight class for visual feedback
    status.classList.add("highlight");

    setTimeout(() => {
      status.classList.remove("highlight");
    }, 800);
  }

  // Contact form validation
  if (form) {
    form.addEventListener("reset", () => {
      form.querySelectorAll(".field-error").forEach((el) => { el.textContent = ""; });
      if (status) status.textContent = "";
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const typeSelect = document.getElementById("request-type");
      const messageInput = document.getElementById("message");
      const quantityInput = document.getElementById("quantity");

      // Clear previous errors
      ["name-error", "email-error", "type-error", "message-error", "quantity-error"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = "";
      });

      let valid = true;

      // Trim inputs and enforce length limits
      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (name.length < 2) {
        document.getElementById("name-error").textContent =
          "Please enter at least 2 characters for your name.";
        valid = false;
      } else if (name.length > 60) {
        document.getElementById("name-error").textContent =
          "Please keep your name under 60 characters.";
        valid = false;
      }

      if (emailInput) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          document.getElementById("email-error").textContent = "Email is required.";
          valid = false;
        } else if (email.length > 120) {
          document.getElementById("email-error").textContent =
            "Please keep your email under 120 characters.";
          valid = false;
        } else if (!pattern.test(email)) {
          document.getElementById("email-error").textContent =
            "Please enter a valid email.";
          valid = false;
        }
      }

      if (typeSelect && !typeSelect.value) {
        document.getElementById("type-error").textContent =
          "Please choose what you need.";
        valid = false;
      }

      if (!message) {
        document.getElementById("message-error").textContent =
          "Please include a short message.";
        valid = false;
      } else if (message.length > 1000) {
        document.getElementById("message-error").textContent =
          "Please keep your message under 1000 characters.";
        valid = false;
      }

      if (quantityInput && quantityInput.value) {
        const q = Number(quantityInput.value);
        if (Number.isNaN(q) || q < 1 || q > 200) {
          document.getElementById("quantity-error").textContent =
            "Please enter a number between 1 and 200, or leave blank.";
          valid = false;
        }
      }

      if (!valid) {
        setStatusMessage("Please fix the highlighted fields and try again.");
        return;
      }

      // Simulated success
      form.reset();
      setStatusMessage("Demo complete. Your entries passed validation. No request was sent or saved.");
    });
  }
});
