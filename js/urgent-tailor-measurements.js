const stepTwoForm = document.getElementById("urgent-step-two-form");

if (stepTwoForm) {
  const fields = Array.from(stepTwoForm.querySelectorAll("input[required], textarea[required]"));

  const getErrorNode = (field) => {
    const label = field.closest("label");
    return label ? label.querySelector(".urgent-field-error") : null;
  };

  const setError = (field, message) => {
    const errorNode = getErrorNode(field);
    field.classList.add("urgent-invalid");
    if (errorNode) {
      errorNode.textContent = message;
    }
  };

  const clearError = (field) => {
    const errorNode = getErrorNode(field);
    field.classList.remove("urgent-invalid");
    if (errorNode) {
      errorNode.textContent = "";
    }
  };

  const validateField = (field) => {
    const value = field.value.trim();

    if (!value) {
      setError(field, "This field is required.");
      return false;
    }

    clearError(field);
    return true;
  };

  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      validateField(field);
    });

    field.addEventListener("input", () => {
      if (field.classList.contains("urgent-invalid")) {
        validateField(field);
      }
    });
  });

  stepTwoForm.addEventListener("submit", (event) => {
    let hasError = false;

    fields.forEach((field) => {
      const isValid = validateField(field);
      if (!isValid) {
        hasError = true;
      }
    });

    if (hasError) {
      event.preventDefault();
    }
  });
}
