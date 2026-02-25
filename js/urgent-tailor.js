const stepOneForm = document.getElementById("urgent-step-one-form");

if (stepOneForm) {
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const countryCodeSelect = document.getElementById("country-code");
  const phoneNumberInput = document.getElementById("phone-number");
  const styleUploadInput = document.getElementById("style-upload");
  const uploadBox = document.querySelector(".urgent-upload-box");

  const firstNameError = document.getElementById("first-name-error");
  const lastNameError = document.getElementById("last-name-error");
  const phoneError = document.getElementById("phone-number-error");
  const uploadError = document.getElementById("style-upload-error");

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  const namePattern = /^[A-Za-z][A-Za-z' -]{1,49}$/;

  const setError = (field, errorNode, message) => {
    if (!field || !errorNode) return;
    errorNode.textContent = message;
    field.classList.add("urgent-invalid");
  };

  const clearError = (field, errorNode) => {
    if (!field || !errorNode) return;
    errorNode.textContent = "";
    field.classList.remove("urgent-invalid");
  };

  const selectedCountryMeta = () => {
    const selectedOption = countryCodeSelect.options[countryCodeSelect.selectedIndex];
    return {
      code: selectedOption.value,
      country: selectedOption.dataset.country,
      min: Number(selectedOption.dataset.min),
      max: Number(selectedOption.dataset.max),
    };
  };

  const validateName = (input, errorNode, label) => {
    const value = input.value.trim();

    if (!value) {
      setError(input, errorNode, `Invalid name. Enter your ${label}.`);
      return false;
    }

    if (!namePattern.test(value)) {
      setError(input, errorNode, "Invalid name.");
      return false;
    }

    clearError(input, errorNode);
    return true;
  };

  const validatePhoneNumber = () => {
    const { country, min, max, code } = selectedCountryMeta();
    const numberOnly = phoneNumberInput.value.replace(/\D/g, "");

    if (!numberOnly) {
      setError(phoneNumberInput, phoneError, "Invalid number.");
      return false;
    }

    if (numberOnly.length < min || numberOnly.length > max) {
      setError(
        phoneNumberInput,
        phoneError,
        `Invalid number. Enter a complete number for ${code}.`
      );
      return false;
    }

    if (country === "NG" && !/^[789]\d{9}$/.test(numberOnly)) {
      setError(phoneNumberInput, phoneError, "Invalid number.");
      return false;
    }

    clearError(phoneNumberInput, phoneError);
    return true;
  };

  const validateUpload = () => {
    const file = styleUploadInput.files[0];

    if (!file) {
      setError(uploadBox, uploadError, "Error: upload a picture to continue.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(uploadBox, uploadError, "Your file size exceeds the maximum size.");
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setError(uploadBox, uploadError, "Error: upload a PNG or JPG image.");
      return false;
    }

    clearError(uploadBox, uploadError);
    return true;
  };

  const refreshPhoneHint = () => {
    const { min, max, code } = selectedCountryMeta();
    phoneNumberInput.value = phoneNumberInput.value.replace(/\D/g, "");
    phoneNumberInput.placeholder =
      min === max ? `${"0".repeat(min)}` : `${"0".repeat(min)} to ${"0".repeat(max)}`;
    phoneNumberInput.setAttribute("aria-label", `Phone number without ${code}`);
    clearError(phoneNumberInput, phoneError);
  };

  firstNameInput.addEventListener("blur", () => validateName(firstNameInput, firstNameError, "first name"));
  lastNameInput.addEventListener("blur", () => validateName(lastNameInput, lastNameError, "last name"));

  phoneNumberInput.addEventListener("input", () => {
    phoneNumberInput.value = phoneNumberInput.value.replace(/\D/g, "");
    if (phoneError.textContent) {
      validatePhoneNumber();
    }
  });

  countryCodeSelect.addEventListener("change", refreshPhoneHint);
  styleUploadInput.addEventListener("change", validateUpload);

  stepOneForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isFirstNameValid = validateName(firstNameInput, firstNameError, "first name");
    const isLastNameValid = validateName(lastNameInput, lastNameError, "last name");
    const isPhoneValid = validatePhoneNumber();
    const isUploadValid = validateUpload();

    if (isFirstNameValid && isLastNameValid && isPhoneValid && isUploadValid) {
      stepOneForm.submit();
    }
  });

  refreshPhoneHint();
}
