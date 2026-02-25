const emailForm = document.getElementById("forgot-email-form");
const otpForm = document.getElementById("forgot-otp-form");

const emailInput = document.getElementById("forgot-email");
const emailError = document.getElementById("forgot-email-error");
const otpError = document.getElementById("forgot-otp-error");

const stepEmail = document.getElementById("forgot-step-email");
const stepOtp = document.getElementById("forgot-step-otp");

const sendButton = document.getElementById("forgot-send-btn");
const otpInputs = Array.from(document.querySelectorAll(".login-otp-input"));

const successModal = document.getElementById("forgot-success-modal");
const card = document.getElementById("forgot-card");

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const updateSendButtonState = () => {
  if (!sendButton || !emailInput) return;
  const ready = isValidEmail(emailInput.value.trim());
  sendButton.disabled = !ready;
  sendButton.classList.toggle("is-active", ready);
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
    if (otpInputs[0]) otpInputs[0].focus();
  });
}

otpInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (otpError) otpError.textContent = "";
    if (input.value && otpInputs[index + 1]) otpInputs[index + 1].focus();
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
    const code = otpInputs.map((input) => input.value.trim()).join("");

    if (code.length !== otpInputs.length) {
      if (otpError) otpError.textContent = "Please enter the complete code.";
      return;
    }

    if (card) card.classList.add("is-blurred");
    if (successModal) successModal.hidden = false;
  });
}
