const Country = (() => {
  const countries = [
    "Philippines",
    "China",
    "United States of America",
    "Japan",
    "Indonesia",
    "India",
    "Vietnam",
    "Thailand",
    "Italy",
    "Iceland",
    "United Kingdom",
    "Portugal",
    "Poland",
    "Croatia",
    "Cambodia",
  ].sort();

  const getCountryNames = (countryInput) => {
    const countryNames = countries.filter((country) => {
      const countryRegEx = new RegExp(`${countryInput}`, "i");
      console.log(countryRegEx);
      console.log(country);
      console.log(countryRegEx.test(country));
      return countryRegEx.test(country);
    });

    return countryNames;
  };

  const createBtn = (country) => {
    const countryBtn = document.createElement("button");
    countryBtn.classList.add("autofill-btn");
    countryBtn.setAttribute("id", country);
    countryBtn.setAttribute("data-slctr", "countryBtn");

    countryBtn.textContent = country;

    return countryBtn;
  };

  return { createBtn, getCountryNames };
})();

export default Country;
