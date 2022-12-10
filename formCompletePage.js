const formCompletePage = (() => {
  const header = document.querySelector("[data-slctr=header]");

  const load = () => {
    replaceHeaderContent();
    removeExistingSections();
    addGreetingSection();
  };

  const replaceHeaderContent = () => {
    const headerLogo = document.querySelector("[data-slctr=headerLogo]");
    const headerTitle = document.createElement("span");
    const headerSubtitle = document.querySelector(
      "[data-slctr=headerSubtitle]"
    );

    headerLogo.classList.add("elem-hide");
    headerTitle.classList.add("header-title");
    headerTitle.textContent = "🎉 Well done!";
    headerSubtitle.textContent =
      "You successfully “submitted” the form without errors.";

    header.insertAdjacentElement("afterbegin", headerTitle);
  };

  const removeExistingSections = () => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => section.remove());
  };

  const addGreetingSection = () => {
    const greetingSection = document.createElement("section");
    greetingSection.classList.add("section");
    greetingSection.classList.add("section--greeting");

    const highFiveIcon = document.createElement("object");
    highFiveIcon.classList.add("icon");
    highFiveIcon.classList.add("icon--highFive");
    highFiveIcon.setAttribute("data", "assets/svgs/high-five-icon.svg");
    highFiveIcon.setAttribute("type", "text/svg+xml");

    greetingSection.appendChild(highFiveIcon);

    header.appendChild(greetingSection);
  };

  return { load };
})();

export default formCompletePage;
