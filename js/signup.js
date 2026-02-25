const PROFILE_STORAGE_KEY = "taye_profile_data";
const USERS_STORAGE_KEY = "taye_users";

const signupForm = document.getElementById("signup-form");
const fullNameInput = document.getElementById("signup-full-name");
const countryCodeInput = document.getElementById("signup-country-code");
const phoneNumberInput = document.getElementById("signup-phone-number");
const emailInput = document.getElementById("signup-email");
const passwordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("signup-confirm-password");
const submitButton = document.getElementById("signup-submit-btn");
const successMessage = document.getElementById("signup-success-message");
const globalErrorMessage = document.getElementById("signup-global-error");
const phoneRow = document.querySelector(".signup-phone-row");

const fullNameError = document.getElementById("signup-full-name-error");
const phoneNumberError = document.getElementById("signup-phone-number-error");
const emailError = document.getElementById("signup-email-error");
const passwordError = document.getElementById("signup-password-error");
const confirmPasswordError = document.getElementById("signup-confirm-password-error");

const passwordToggles = [
  document.getElementById("signup-password-toggle"),
  document.getElementById("signup-confirm-password-toggle"),
];

const messages = {
  fullName: "Please enter your full name (First and Last name).",
  phone: "Please enter a complete phone number for the selected country.",
  email: "Please enter a valid email address.",
  password: "Password must be at least 8 characters.",
  confirmPassword: "Passwords do not match.",
  global: "Please correct the errors above before proceeding",
  success: "Account created successfully!",
};

const setFieldError = (field, errorNode, message) => {
  if (!field || !errorNode) return;
  errorNode.textContent = message || "";
  field.classList.toggle("has-error", Boolean(message));
};

const setGlobalError = (message) => {
  if (!globalErrorMessage) return;
  globalErrorMessage.textContent = message || "";
};

const clearMessages = () => {
  setGlobalError("");
  if (successMessage) {
    successMessage.textContent = "";
    successMessage.classList.remove("is-visible");
  }
};

const digitsOnly = (value) => String(value || "").replace(/\D/g, "");
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validateFullName = () => {
  const value = String(fullNameInput?.value || "").trim();
  const parts = value.split(/\s+/).filter(Boolean);
  const looksValid = parts.length >= 2 && parts.every((part) => /^[A-Za-z][A-Za-z'-]*$/.test(part));
  const error = looksValid ? "" : messages.fullName;
  setFieldError(fullNameInput, fullNameError, error);
  return !error;
};

const validatePhone = () => {
  if (!countryCodeInput || !phoneNumberInput) return false;
  const selectedOption = countryCodeInput.options[countryCodeInput.selectedIndex];
  const min = Number(selectedOption?.dataset.min || 0);
  const max = Number(selectedOption?.dataset.max || min);
  const country = String(selectedOption?.dataset.country || "");
  const digits = digitsOnly(phoneNumberInput.value);

  const lengthValid = digits.length >= min && digits.length <= max;
  const countryValid = country === "NG" ? /^[789]\d{9}$/.test(digits) : true;
  const isValid = Boolean(lengthValid && countryValid);

  const error = isValid ? "" : messages.phone;
  setFieldError(phoneNumberInput, phoneNumberError, error);
  if (phoneRow) phoneRow.classList.toggle("has-error", Boolean(error));
  return isValid;
};

const validateEmail = () => {
  const value = String(emailInput?.value || "").trim();
  const error = isValidEmail(value) ? "" : messages.email;
  setFieldError(emailInput, emailError, error);
  return !error;
};

const validatePassword = () => {
  const value = String(passwordInput?.value || "");
  const error = value.length >= 8 ? "" : messages.password;
  setFieldError(passwordInput, passwordError, error);
  return !error;
};

const validateConfirmPassword = () => {
  const password = String(passwordInput?.value || "");
  const confirm = String(confirmPasswordInput?.value || "");
  const error = password && confirm && password === confirm ? "" : messages.confirmPassword;
  setFieldError(confirmPasswordInput, confirmPasswordError, error);
  return !error;
};

const hasValidData = () => {
  const fullName = String(fullNameInput?.value || "").trim();
  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const validFullName =
    nameParts.length >= 2 && nameParts.every((part) => /^[A-Za-z][A-Za-z'-]*$/.test(part));

  const selectedOption = countryCodeInput?.options[countryCodeInput.selectedIndex];
  const min = Number(selectedOption?.dataset.min || 0);
  const max = Number(selectedOption?.dataset.max || min);
  const country = String(selectedOption?.dataset.country || "");
  const phoneDigits = digitsOnly(phoneNumberInput?.value || "");
  const validPhoneLength = phoneDigits.length >= min && phoneDigits.length <= max;
  const validPhoneCountry = country === "NG" ? /^[789]\d{9}$/.test(phoneDigits) : true;
  const validPhone = Boolean(validPhoneLength && validPhoneCountry);

  const email = String(emailInput?.value || "").trim();
  const validEmail = isValidEmail(email);

  const password = String(passwordInput?.value || "");
  const confirm = String(confirmPasswordInput?.value || "");
  const validPassword = password.length >= 8;
  const validConfirm = password && confirm && password === confirm;

  return validFullName && validPhone && validEmail && validPassword && validConfirm;
};

const isFormValid = () => {
  const validFullName = validateFullName();
  const validPhone = validatePhone();
  const validEmail = validateEmail();
  const validPassword = validatePassword();
  const validConfirm = validateConfirmPassword();
  return validFullName && validPhone && validEmail && validPassword && validConfirm;
};

const updateSubmitState = () => {
  if (!submitButton) return;
  const ready = hasValidData();
  submitButton.disabled = !ready;
  submitButton.classList.toggle("is-active", ready);
};

passwordToggles.forEach((toggle) => {
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const wrap = toggle.closest(".login-password-wrap");
    const input = wrap ? wrap.querySelector("input") : null;
    if (!input) return;
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    toggle.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
    const icon = toggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bx-hide", !isHidden);
      icon.classList.toggle("bx-show", isHidden);
    }
  });
});

if (phoneNumberInput) {
  phoneNumberInput.addEventListener("input", () => {
    phoneNumberInput.value = digitsOnly(phoneNumberInput.value);
  });
}

const fieldBindings = [
  { input: fullNameInput, validate: validateFullName },
  { input: phoneNumberInput, validate: validatePhone },
  { input: emailInput, validate: validateEmail },
  { input: passwordInput, validate: () => { validatePassword(); validateConfirmPassword(); } },
  { input: confirmPasswordInput, validate: validateConfirmPassword },
];

fieldBindings.forEach(({ input, validate }) => {
  if (!input) return;
  ["input", "blur"].forEach((eventName) => {
    input.addEventListener(eventName, () => {
      clearMessages();
      validate();
      updateSubmitState();
    });
  });
});

if (countryCodeInput) {
  ["change", "blur"].forEach((eventName) => {
    countryCodeInput.addEventListener(eventName, () => {
      clearMessages();
      validatePhone();
      updateSubmitState();
    });
  });
}

if (signupForm) {
  updateSubmitState();

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessages();

    const valid = isFormValid();
    updateSubmitState();

    if (!valid) {
      setGlobalError(messages.global);
      return;
    }

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const countryCode = countryCodeInput ? countryCodeInput.value : "";
    const phoneDigits = digitsOnly(phoneNumberInput ? phoneNumberInput.value : "");

    let users = [];
    try {
      const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
      users = rawUsers ? JSON.parse(rawUsers) : [];
      if (!Array.isArray(users)) users = [];
    } catch (error) {
      users = [];
    }

    const existingUserIndex = users.findIndex(
      (user) => String(user.email || "").toLowerCase() === email.toLowerCase()
    );

    const userPayload = {
      fullName,
      email,
      password,
      countryCode,
      phoneNumber: phoneDigits,
    };

    if (existingUserIndex >= 0) {
      users[existingUserIndex] = userPayload;
    } else {
      users.push(userPayload);
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    const profileData = {
      firstName: fullName,
      email,
      mobile: `${countryCode}${phoneDigits}`,
      avatar: "/Images/image 18.png",
    };

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));

    if (successMessage) {
      successMessage.textContent = messages.success;
      successMessage.classList.add("is-visible");
    }

    window.location.href = "home.html?signup=success";
  });
}
