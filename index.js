const Page = {
  $: {
    formInputs: document.querySelectorAll(".form-input"),
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
  },
};

Page.init();
