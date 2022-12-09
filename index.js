import Validate from "./validate.js";

const Page = {
  $: {
    formInputs: document.querySelectorAll(".form-input"),
    nameInput: document.querySelector("[data-slctr=nameInput]"),
    emailInput: document.querySelector("[data-slctr=emailInput]"),
    passwordInput: document.querySelector("[data-slctr=passwordInput]"),
    confirmPasswordInput: document.querySelector(
      "[data-slctr=confirmPasswordInput]"
    ),
  },
  showNameError() {
    const nameErrorLabel = document.querySelector(
      "[data-slctr=nameErrorLabel]"
    );
    const nameErrorLabelSpan = document.querySelector(
      "[data-slctr=nameErrorLabel] > span"
    );

    if (Validate.patternIsInvalid(Page.$.nameInput)) {
      Page.$.nameInput.classList.add("form-input-invalid");
      nameErrorLabel.classList.remove("elem-hide");
      nameErrorLabelSpan.textContent = "Numbers and symbols are not allowed.";
      return;
    }

    Page.$.nameInput.classList.remove("form-input-invalid");
    nameErrorLabel.classList.add("elem-hide");
    nameErrorLabelSpan.textContent = "";
    return;
  },
  showEmailError() {
    const emailInputValue = Page.$.emailInput.value;
    const emailErrorLabel = document.querySelector(
      "[data-slctr=emailErrorLabel]"
    );
    const emailErrorLabelSpan = document.querySelector(
      "[data-slctr=emailErrorLabel] > span"
    );

    if (Validate.patternIsInvalid(Page.$.emailInput)) {
      Page.$.emailInput.classList.add("form-input-invalid");
      emailErrorLabel.classList.remove("elem-hide");
      emailErrorLabelSpan.textContent = `Must be a valid email. You entered ${emailInputValue}`;
      return;
    }

    Page.$.emailInput.classList.remove("form-input-invalid");
    emailErrorLabel.classList.add("elem-hide");
    emailErrorLabelSpan.textContent = "";
    return;
  },
  showPasswordError() {
    Page.showConfirmPasswordError();

    const passwordErrorLabel = document.querySelector(
      "[data-slctr=passwordErrorLabel]"
    );
    const passwordErrorLabelSpan = document.querySelector(
      "[data-slctr=passwordErrorLabel] > span"
    );
    const firstPassword = Page.$.passwordInput.value;

    if (!Validate.passwordConditionsMet(firstPassword)) {
      Page.$.passwordInput.classList.add("form-input-invalid");
      Page.$.passwordInput.classList.remove("form-input-valid");
      passwordErrorLabel.classList.remove("elem-hide");
      passwordErrorLabelSpan.textContent =
        "Must contain at least one uppercase, lowercase, and number character.";
      return;
    }

    if (Validate.belowMinLength(Page.$.passwordInput)) {
      Page.$.passwordInput.classList.add("form-input-invalid");
      Page.$.passwordInput.classList.remove("form-input-valid");
      passwordErrorLabel.classList.remove("elem-hide");
      passwordErrorLabelSpan.textContent = `Must contain at least 6 characters of any type. You entered ${firstPassword.length}.`;
      return;
    }

    Page.$.passwordInput.classList.remove("form-input-invalid");
    Page.$.passwordInput.classList.add("form-input-valid");
    passwordErrorLabel.classList.add("elem-hide");
    passwordErrorLabelSpan.textContent = "";
    return;
  },
  showConfirmPasswordError() {
    const confirmPasswordErrorLabel = document.querySelector(
      "[data-slctr=confirmPasswordErrorLabel]"
    );
    const confirmPasswordErrorLabelSpan = document.querySelector(
      "[data-slctr=confirmPasswordErrorLabel] > span"
    );
    const firstPassword = Page.$.passwordInput.value;
    const finalPassword = Page.$.confirmPasswordInput.value;

    if (Validate.passwordMatch(firstPassword, finalPassword)) {
      Page.$.confirmPasswordInput.classList.remove("form-input-invalid");
      Page.$.confirmPasswordInput.classList.add("form-input-valid");
      confirmPasswordErrorLabel.classList.add("elem-hide");
      confirmPasswordErrorLabelSpan.textContent = "";
      return;
    }

    Page.$.confirmPasswordInput.classList.add("form-input-invalid");
    Page.$.confirmPasswordInput.classList.remove("form-input-valid");
    confirmPasswordErrorLabel.classList.remove("elem-hide");
    confirmPasswordErrorLabelSpan.textContent =
      "Password does not match previous password.";
    return;
  },
  liftLabel(e) {
    const input = e.target;
    const inputId = input.getAttribute("id");
    const label = document.querySelector(`[for=${inputId}]`);
    label.classList.toggle("form-label-lift");
  },
  init() {
    Page.$.formInputs.forEach((formInput) => {
      formInput.addEventListener("focus", Page.liftLabel);
      formInput.addEventListener("blur", Page.liftLabel);
    });
    Page.$.nameInput.addEventListener("input", Page.showNameError);
    Page.$.emailInput.addEventListener("input", Page.showEmailError);
    Page.$.passwordInput.addEventListener("input", Page.showPasswordError);
    Page.$.confirmPasswordInput.addEventListener(
      "input",
      Page.showConfirmPasswordError
    );
  },
};

Page.init();
