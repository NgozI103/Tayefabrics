const STORAGE_KEY = "taye_profile_data";
const successBanner = document.getElementById("profile-success-banner");
const successMessage = document.getElementById("profile-success-message");
const successClose = document.getElementById("profile-success-close");

const defaultProfile = {
  firstName: "Ngozi",
  lastName: "Ukah",
  mobile: "+2349136664497",
  email: "ngozivicah@gmail.com",
  address: "Lekki, Lagos, Nigeria",
  passcode: "123456",
  mobileVerified: false,
  emailVerified: false,
};

let currentEditingKey = null;
let successTimer = null;

function readProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProfile };
    const parsed = JSON.parse(raw);
    return { ...defaultProfile, ...parsed };
  } catch (error) {
    return { ...defaultProfile };
  }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function maskPasscode(value) {
  const safe = value || "";
  return "•".repeat(Math.max(4, safe.length));
}

function renderProfile(profile) {
  const name = `${profile.firstName} ${profile.lastName}`.trim();
  document.getElementById("profile-display-name").textContent = name || "Profile";
  document.getElementById("profile-firstName").textContent = profile.firstName;
  document.getElementById("profile-lastName").textContent = profile.lastName;
  document.getElementById("profile-mobile").textContent = profile.mobile;
  document.getElementById("profile-email").textContent = profile.email;
  const addressNode = document.getElementById("profile-address");
  if (addressNode) {
    addressNode.textContent = profile.address || "";
  }
  document.getElementById("profile-passcode").textContent = maskPasscode(profile.passcode);

  const mobileBadge = document.getElementById("profile-mobile-verified");
  const emailBadge = document.getElementById("profile-email-verified");
  if (mobileBadge) {
    mobileBadge.style.display = profile.mobileVerified ? "inline-flex" : "none";
  }
  if (emailBadge) {
    emailBadge.style.display = profile.emailVerified ? "inline-flex" : "none";
  }
}

function showSuccess(text) {
  if (!successBanner || !successMessage) return;
  successMessage.textContent = text;
  successBanner.classList.add("show");
  if (successTimer) clearTimeout(successTimer);
  successTimer = setTimeout(() => {
    successBanner.classList.remove("show");
  }, 3500);
}

function closeSuccess() {
  if (!successBanner) return;
  successBanner.classList.remove("show");
  if (successTimer) clearTimeout(successTimer);
}

function requestOtpVerification(channelLabel) {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const entered = window.prompt(
    `Enter the 6-digit OTP sent to your ${channelLabel}.\nDemo OTP: ${otp}`,
    "",
  );

  if (entered === null) {
    return { ok: false, message: "OTP verification was cancelled." };
  }

  if (entered.trim() !== otp) {
    return { ok: false, message: "Incorrect OTP. Please try again." };
  }

  return { ok: true };
}

function renderStandardEditor(field, key, currentValue) {
  if (key === "mobile") {
    const code = currentValue.startsWith("+") ? currentValue.slice(0, 4) : "+234";
    const number = currentValue.startsWith("+") ? currentValue.slice(4) : currentValue;
    return `
      <div class="profile-edit-grid-phone">
        <input type="text" data-edit-input="code" value="${code}" />
        <input type="text" data-edit-input="number" value="${number}" />
      </div>
      <p class="profile-edit-error" data-error></p>
      <div class="profile-edit-actions">
        <button type="button" class="profile-save-btn">Save</button>
        <button type="button" class="profile-cancel-btn">Cancel</button>
      </div>
    `;
  }

  return `
    <input type="${key === "email" ? "email" : "text"}" data-edit-input="value" value="${currentValue}" />
    <p class="profile-edit-error" data-error></p>
    <div class="profile-edit-actions">
      <button type="button" class="profile-save-btn">Save</button>
      <button type="button" class="profile-cancel-btn">Cancel</button>
    </div>
  `;
}

function renderPasscodeEditor(field) {
  return `
    <label>Current Passcode</label>
    <input type="password" data-edit-input="currentPasscode" placeholder="Current Passcode" />
    <label>New Passcode</label>
    <input type="password" data-edit-input="newPasscode" placeholder="New Passcode" />
    <label>Confirm Passcode</label>
    <input type="password" data-edit-input="confirmPasscode" placeholder="Confirm Passcode" />
    <p class="profile-edit-error" data-error></p>
    <div class="profile-edit-actions">
      <button type="button" class="profile-save-btn">Save</button>
      <button type="button" class="profile-cancel-btn">Cancel</button>
    </div>
  `;
}

function exitEditMode(field) {
  field.classList.remove("editing");
  const editArea = field.querySelector(".profile-edit-area");
  if (editArea) editArea.innerHTML = "";
}

function validateAndCommit(field, key, profile) {
  const errorEl = field.querySelector("[data-error]");
  const setError = (text) => {
    if (errorEl) errorEl.textContent = text;
  };

  if (key === "email") {
    const value = field.querySelector('[data-edit-input="value"]').value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setError("Please enter a valid email address.");
      return false;
    }

    const otpResult = requestOtpVerification("email");
    if (!otpResult.ok) {
      setError(otpResult.message);
      return false;
    }

    profile.email = value;
    profile.emailVerified = true;
    showSuccess("Email updated successfully");
    return true;
  }

  if (key === "mobile") {
    const code = field.querySelector('[data-edit-input="code"]').value.trim();
    const number = field.querySelector('[data-edit-input="number"]').value.replace(/\s+/g, "");
    const validCode = /^\+\d{1,4}$/.test(code);
    const validNumber = /^\d{10,11}$/.test(number);
    if (!validCode || !validNumber) {
      setError("Please enter a complete and valid phone number.");
      return false;
    }

    const otpResult = requestOtpVerification("phone number");
    if (!otpResult.ok) {
      setError(otpResult.message);
      return false;
    }

    profile.mobile = `${code}${number}`;
    profile.mobileVerified = true;
    showSuccess("Mobile number updated successfully");
    return true;
  }

  if (key === "passcode") {
    const current = field.querySelector('[data-edit-input="currentPasscode"]').value;
    const next = field.querySelector('[data-edit-input="newPasscode"]').value;
    const confirm = field.querySelector('[data-edit-input="confirmPasscode"]').value;

    if (current !== profile.passcode) {
      setError("Current passcode is incorrect.");
      return false;
    }
    if (next.length < 4) {
      setError("New passcode must be at least 4 characters.");
      return false;
    }
    if (next !== confirm) {
      setError("Passcode confirmation does not match.");
      return false;
    }

    profile.passcode = next;
    showSuccess("Passcode updated successfully");
    return true;
  }

  const value = field.querySelector('[data-edit-input="value"]').value.trim();
  if (!value) {
    setError("This field cannot be empty.");
    return false;
  }
  profile[key] = value;
  const label = field.dataset.label || "Field";
  showSuccess(`${label} updated successfully`);
  return true;
}

function enterEditMode(field, key, profile) {
  if (currentEditingKey && currentEditingKey !== key) {
    const previous = document.querySelector(`.profile-field-item[data-key="${currentEditingKey}"]`);
    if (previous) exitEditMode(previous);
  }

  const editArea = field.querySelector(".profile-edit-area");
  if (!editArea) return;

  field.classList.add("editing");
  currentEditingKey = key;

  if (key === "passcode") {
    editArea.innerHTML = renderPasscodeEditor(field);
  } else {
    editArea.innerHTML = renderStandardEditor(field, key, profile[key] || "");
  }

  const firstInput = editArea.querySelector("input");
  if (firstInput) firstInput.focus();

  const saveBtn = editArea.querySelector(".profile-save-btn");
  const cancelBtn = editArea.querySelector(".profile-cancel-btn");

  saveBtn.addEventListener("click", () => {
    const ok = validateAndCommit(field, key, profile);
    if (!ok) return;

    saveProfile(profile);
    renderProfile(profile);
    exitEditMode(field);
    currentEditingKey = null;
  });

  cancelBtn.addEventListener("click", () => {
    exitEditMode(field);
    currentEditingKey = null;
  });
}

const profile = readProfile();
renderProfile(profile);

if (successClose) {
  successClose.addEventListener("click", closeSuccess);
}

document.querySelectorAll(".profile-field-item").forEach((field) => {
  const key = field.dataset.key;
  const editButton = field.querySelector(".profile-edit-btn");
  const displayRow = field.querySelector(".profile-display-row");
  if (!key || !editButton) return;

  editButton.addEventListener("click", () => {
    if (field.classList.contains("editing")) return;
    enterEditMode(field, key, profile);
  });

  if (displayRow) {
    displayRow.addEventListener("click", (event) => {
      if (event.target.closest(".profile-edit-btn")) return;
      if (field.classList.contains("editing")) return;
      enterEditMode(field, key, profile);
    });
  }
});
