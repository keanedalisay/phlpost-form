const Page = {
  $: {
    formInputs: document.querySelectorAll(".form-input"),
  },
  liftLabel(e) {
    const input = e.target;
    const inputId = input.getAttribute("id");
    const label = document.querySelector(`[for=${inputId}]`);
    label.classList.toggle("liftLabel");
  },
  init() {
    Page.$.formInputs.forEach((formInput) => {
      formInput.addEventListener("focus", Page.liftLabel);
      formInput.addEventListener("blur", Page.liftLabel);
    });
  },
};

Page.init();
