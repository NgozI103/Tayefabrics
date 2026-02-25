const PROFILE_STORAGE_KEY = "taye_profile_data";
const REMEMBER_EMAIL_KEY = "taye_login_email";
const USERS_STORAGE_KEY = "taye_users";

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const passwordToggleButton = document.getElementById("login-password-toggle");
const rememberMeInput = document.getElementById("remember-me");
const submitButton = document.getElementById("login-submit-btn");
const emailError = document.getElementById("login-email-error");
const passwordError = document.getElementById("login-password-error");

const setFieldError = (field, errorNode, message) => {
  if (!field || !errorNode) return;
  errorNode.textContent = message || "";
  field.classList.toggle("has-error", Boolean(message));
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidPassword = (value) => String(value || "").length >= 6;

const toDisplayName = (email) => {
  const base = String(email || "").split("@")[0] || "Customer";
  const cleaned = base.replace(/[._-]+/g, " ").trim();
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

const loadRememberedEmail = () => {
  if (!emailInput || !rememberMeInput) return;
  const rememberedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
  if (!rememberedEmail) return;
  emailInput.value = rememberedEmail;
  rememberMeInput.checked = true;
};

const updateSubmitState = () => {
  if (!submitButton || !emailInput || !passwordInput) return;
  const ready = isValidEmail(emailInput.value.trim()) && isValidPassword(passwordInput.value);
  submitButton.disabled = !ready;
  submitButton.classList.toggle("is-active", ready);
};

const getRegisteredUsers = () => {
  try {
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!rawUsers) return [];
    const parsedUsers = JSON.parse(rawUsers);
    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch (error) {
    return [];
  }
};

if (loginForm && emailInput && passwordInput) {
  loadRememberedEmail();
  updateSubmitState();

  emailInput.addEventListener("input", () => {
    if (emailError && emailError.textContent) setFieldError(emailInput, emailError, "");
    updateSubmitState();
  });

  passwordInput.addEventListener("input", () => {
    if (passwordError && passwordError.textContent) setFieldError(passwordInput, passwordError, "");
    updateSubmitState();
  });

  if (passwordToggleButton) {
    passwordToggleButton.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      passwordToggleButton.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
      const icon = passwordToggleButton.querySelector("i");
      if (icon) {
        icon.classList.toggle("bx-hide", !isHidden);
        icon.classList.toggle("bx-show", isHidden);
      }
    });
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let isValid = true;

    if (!isValidEmail(email)) {
      setFieldError(emailInput, emailError, "Please enter a valid email address.");
      isValid = false;
    } else {
      setFieldError(emailInput, emailError, "");
    }

    if (!isValidPassword(password)) {
      setFieldError(passwordInput, passwordError, "Password must be at least 6 characters.");
      isValid = false;
    } else {
      setFieldError(passwordInput, passwordError, "");
    }

    if (!isValid) {
      updateSubmitState();
      return;
    }

    const users = getRegisteredUsers();
    const registeredUser = users.find(
      (user) => String(user.email || "").toLowerCase() === email.toLowerCase()
    );

    if (!registeredUser) {
      setFieldError(emailInput, emailError, "No account found. Please sign up first.");
      updateSubmitState();
      return;
    }

    if (String(registeredUser.password || "") !== password) {
      setFieldError(passwordInput, passwordError, "Incorrect password.");
      updateSubmitState();
      return;
    }

    const profileData = {
      firstName: registeredUser.fullName || toDisplayName(email),
      email,
      mobile: "",
      avatar: "/Images/image 18.png",
    };

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));

    if (rememberMeInput && rememberMeInput.checked) {
      localStorage.setItem(REMEMBER_EMAIL_KEY, email);
    } else {
      localStorage.removeItem(REMEMBER_EMAIL_KEY);
    }

    updateSubmitState();
    window.location.href = "index.html";
  });
}
