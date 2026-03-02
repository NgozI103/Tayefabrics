const emailForm = document.getElementById("forgot-email-form");
const otpForm = document.getElementById("forgot-otp-form");
const resetForm = document.getElementById("forgot-reset-form");

const emailInput = document.getElementById("forgot-email");
const emailError = document.getElementById("forgot-email-error");
const otpError = document.getElementById("forgot-otp-error");
const newPasswordInput = document.getElementById("forgot-new-password");
const confirmPasswordInput = document.getElementById("forgot-confirm-password");
const newPasswordError = document.getElementById("forgot-new-password-error");
const confirmPasswordError = document.getElementById("forgot-confirm-password-error");

const stepEmail = document.getElementById("forgot-step-email");
const stepOtp = document.getElementById("forgot-step-otp");
const stepReset = document.getElementById("forgot-step-reset");

const sendButton = document.getElementById("forgot-send-btn");
const verifyButton = document.getElementById("forgot-verify-btn");
const resetButton = document.getElementById("forgot-reset-btn");
const otpInputs = Array.from(document.querySelectorAll(".login-otp-input"));

const successModal = document.getElementById("forgot-success-modal");
const card = document.getElementById("forgot-card");

const newPasswordToggle = document.getElementById("forgot-new-password-toggle");
const confirmPasswordToggle = document.getElementById("forgot-confirm-password-toggle");

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidPassword = (value) => String(value || "").length >= 8;

const setActiveState = (button, isActive) => {
  if (!button) return;
  button.disabled = !isActive;
  button.classList.toggle("is-active", isActive);
};

const updateSendButtonState = () => {
  if (!emailInput) return;
  setActiveState(sendButton, isValidEmail(emailInput.value.trim()));
};

const getOtpCode = () => otpInputs.map((input) => input.value.trim()).join("");

const updateVerifyButtonState = () => {
  const ready = otpInputs.length > 0 && otpInputs.every((input) => /^\d$/.test(input.value.trim()));
  setActiveState(verifyButton, ready);
};

const updateResetButtonState = () => {
  const password = String(newPasswordInput?.value || "");
  const confirm = String(confirmPasswordInput?.value || "");
  const ready = isValidPassword(password) && password === confirm;
  setActiveState(resetButton, ready);
};

const togglePasswordVisibility = (input, toggle) => {
  if (!input || !toggle) return;
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  toggle.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
  const icon = toggle.querySelector("i");
  if (icon) {
    icon.classList.toggle("bx-hide", !isHidden);
    icon.classList.toggle("bx-show", isHidden);
  }
};

if (emailInput) {
  updateSendButtonState();
  emailInput.addEventListener("input", () => {
    if (emailError) emailError.textContent = "";
    updateSendButtonState();
  });
}

if (emailForm) {
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput ? emailInput.value.trim() : "";
    if (!isValidEmail(email)) {
      if (emailError) emailError.textContent = "Please enter a valid email address.";
      updateSendButtonState();
      return;
    }

    if (stepEmail) stepEmail.hidden = true;
    if (stepOtp) stepOtp.hidden = false;
    updateVerifyButtonState();
    if (otpInputs[0]) otpInputs[0].focus();
  });
}

otpInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (otpError) otpError.textContent = "";

    if (input.value && otpInputs[index + 1]) {
      otpInputs[index + 1].focus();
    }

    updateVerifyButtonState();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && otpInputs[index - 1]) {
      otpInputs[index - 1].focus();
    }
  });
});

if (otpForm) {
  otpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = getOtpCode();

    if (code.length !== otpInputs.length) {
      if (otpError) otpError.textContent = "Please enter the complete code.";
      updateVerifyButtonState();
      return;
    }

    if (stepOtp) stepOtp.hidden = true;
    if (stepReset) stepReset.hidden = false;
    updateResetButtonState();
    if (newPasswordInput) newPasswordInput.focus();
  });
}

if (newPasswordInput) {
  ["input", "blur"].forEach((eventName) => {
    newPasswordInput.addEventListener(eventName, () => {
      if (newPasswordError) {
        newPasswordError.textContent = isValidPassword(newPasswordInput.value)
          ? ""
          : "Password must be at least 8 characters.";
      }
      if (confirmPasswordError && confirmPasswordInput?.value) {
        confirmPasswordError.textContent =
          newPasswordInput.value === confirmPasswordInput.value ? "" : "Passwords do not match.";
      }
      updateResetButtonState();
    });
  });
}

if (confirmPasswordInput) {
  ["input", "blur"].forEach((eventName) => {
    confirmPasswordInput.addEventListener(eventName, () => {
      if (confirmPasswordError) {
        confirmPasswordError.textContent =
          confirmPasswordInput.value && confirmPasswordInput.value === newPasswordInput?.value
            ? ""
            : "Passwords do not match.";
      }
      updateResetButtonState();
    });
  });
}

if (resetForm) {
  resetForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const password = String(newPasswordInput?.value || "");
    const confirm = String(confirmPasswordInput?.value || "");

    const validPassword = isValidPassword(password);
    const validConfirm = password === confirm && confirm.length > 0;

    if (newPasswordError) {
      newPasswordError.textContent = validPassword ? "" : "Password must be at least 8 characters.";
    }

    if (confirmPasswordError) {
      confirmPasswordError.textContent = validConfirm ? "" : "Passwords do not match.";
    }

    if (!validPassword || !validConfirm) {
      updateResetButtonState();
      return;
    }

    if (card) card.classList.add("is-blurred");
    if (successModal) successModal.hidden = false;
  });
}

if (newPasswordToggle) {
  newPasswordToggle.addEventListener("click", () => {
    togglePasswordVisibility(newPasswordInput, newPasswordToggle);
  });
}

if (confirmPasswordToggle) {
  confirmPasswordToggle.addEventListener("click", () => {
    togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle);
  });
}

updateVerifyButtonState();
updateResetButtonState();
