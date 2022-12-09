import Validate from "./validate.js";

const Page = {
  $: {
    formInputs: document.querySelectorAll(".form-input"),

    nameInput: document.querySelector("[data-slctr=nameInput]"),
    emailInput: document.querySelector("[data-slctr=emailInput]"),
    countryInput: document.querySelector("[data-slctr=countryInput]"),
    zipPostalInput: document.querySelector("[data-slctr=zipPostalInput]"),

    passwordInput: document.querySelector("[data-slctr=passwordInput]"),
    confirmPasswordInput: document.querySelector(
      "[data-slctr=confirmPasswordInput]"
    ),
  },
  changeToValid(elem, text, showStateLabel) {
    const inputID = elem.getAttribute("id");
    const stateLabel = document.querySelector(
      `[data-slctr=${inputID}StateLabel]`
    );
    const stateLabelSpan = document.querySelector(
      `[data-slctr=${inputID}StateLabel] > span`
    );
    const stateLabelIcon = document.querySelector(
      `[data-slctr=${inputID}StateLabel] > object`
    );

    elem.classList.add("form-input-valid");
    elem.classList.remove("form-input-invalid");

    showStateLabel
      ? stateLabelIcon.classList.add("elem-hide")
      : stateLabelIcon.classList.remove("elem-hide");

    showStateLabel
      ? stateLabel.classList.remove("elem-hide")
      : stateLabel.classList.add("elem-hide");

    stateLabel.classList.remove("form-stateLabel-invalid");
    stateLabel.classList.add("form-stateLabel-valid");
    stateLabelSpan.textContent = text;
  },
  changeToInvalid(elem, text) {
    const inputID = elem.getAttribute("id");
    const stateLabel = document.querySelector(
      `[data-slctr=${inputID}StateLabel]`
    );
    const stateLabelSpan = document.querySelector(
      `[data-slctr=${inputID}StateLabel] > span`
    );
    const stateLabelIcon = document.querySelector(
      `[data-slctr=${inputID}StateLabel] > object`
    );

    elem.classList.add("form-input-invalid");
    elem.classList.remove("form-input-valid");
    stateLabel.classList.remove("elem-hide");

    stateLabel.classList.add("form-stateLabel-invalid");
    stateLabel.classList.remove("form-stateLabel-valid");
    stateLabelIcon.classList.remove("elem-hide");
    stateLabelSpan.textContent = text;
  },

  showNameState() {
    if (Validate.inputIsEmpty(Page.$.nameInput)) {
      Page.changeToInvalid(Page.$.nameInput, "Must input your fullname.");
      return;
    }

    if (Validate.patternIsInvalid(Page.$.nameInput)) {
      Page.changeToInvalid(
        Page.$.nameInput,
        "Numbers and symbols are not allowed."
      );
      return;
    }

    Page.changeToValid(Page.$.nameInput, "");
    return;
  },
  showEmailState() {
    const emailInputValue = Page.$.emailInput.value;

    if (Validate.inputIsEmpty(Page.$.emailInput)) {
      Page.changeToInvalid(Page.$.emailInput, "Must input your email.");
      return;
    }

    if (Validate.patternIsInvalid(Page.$.emailInput)) {
      Page.changeToInvalid(
        Page.$.emailInput,
        `Must be a valid email. You entered ${emailInputValue}`
      );
      return;
    }

    Page.changeToValid(Page.$.emailInput, "");
    return;
  },
  showCountryState() {
    if (Validate.inputIsEmpty(Page.$.countryInput)) {
      Page.changeToInvalid(
        Page.$.countryInput,
        "Must input the country you reside in."
      );
      return;
    }

    Page.changeToValid(Page.$.countryInput, "");
    return;
  },
  showZipPostalState() {
    if (Validate.inputIsEmpty(Page.$.zipPostalInput)) {
      Page.changeToInvalid(
        Page.$.zipPostalInput,
        "Must input your current zip/postal code."
      );
      return;
    }

    Page.changeToValid(Page.$.zipPostalInput, "");
  },
  showPasswordState() {
    Page.showConfirmPasswordState();

    const firstPassword = Page.$.passwordInput.value;

    if (!Validate.passwordConditionsMet(firstPassword)) {
      Page.changeToInvalid(
        Page.$.passwordInput,
        "Must contain at least one uppercase, lowercase, and number character."
      );
      return;
    }

    if (Validate.belowMinLength(Page.$.passwordInput)) {
      Page.changeToInvalid(
        Page.$.passwordInput,
        `Must contain at least 6 characters of any type. You entered ${firstPassword.length}.`
      );
      return;
    }

    Page.changeToValid(Page.$.passwordInput, "");
    return;
  },
  showConfirmPasswordState() {
    const firstPassword = Page.$.passwordInput.value;
    const finalPassword = Page.$.confirmPasswordInput.value;

    if (Validate.inputIsEmpty(Page.$.confirmPasswordInput)) {
      Page.changeToInvalid(
        Page.$.confirmPasswordInput,
        "Must confirm your password."
      );
      return;
    }

    if (Validate.passwordMatch(firstPassword, finalPassword)) {
      Page.changeToValid(
        Page.$.confirmPasswordInput,
        "Password successfully matches.",
        true
      );
      return;
    }

    Page.changeToInvalid(
      Page.$.confirmPasswordInput,
      "Password does not match previous password."
    );
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

    Page.$.nameInput.addEventListener("input", Page.showNameState);
    Page.$.emailInput.addEventListener("input", Page.showEmailState);
    Page.$.countryInput.addEventListener("input", Page.showCountryState);
    Page.$.zipPostalInput.addEventListener("input", Page.showZipPostalState);

    Page.$.passwordInput.addEventListener("input", Page.showPasswordState);
    Page.$.confirmPasswordInput.addEventListener(
      "input",
      Page.showConfirmPasswordState
    );
  },
};

Page.init();
