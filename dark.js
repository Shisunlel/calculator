let darkMode = sessionStorage.getItem("darkMode");
let mainBg = getComputedStyle(document.body).getPropertyValue("--main-bg");
const container = document.querySelector("#container");
const digitSection = document.querySelector("#digit__section");
const buttonBackground = document.querySelectorAll("section > button");
const numberButton = document.querySelectorAll(
  "section > button:not(.op__button):not(.misc__button)"
);
const darkModeToggler = document.querySelector("#toggler");

const setLightColor = () => {
  document.body.style.setProperty("--main-bg", "#f9f9f9");
  document.body.style.setProperty("--result", "#111");
  container.style.setProperty("--main-shadow", "#e8ae61");
  container.style.setProperty("--secondary-shadow", "#65bdbd");
  digitSection.style.setProperty("--digit-section", "#f2f2f2");
  buttonBackground.forEach((e) => {
    e.style.setProperty("--button-bg", "#efefef");
  });
  numberButton.forEach((e) => {
    e.style.setProperty("--number-button", "#5b5b5b");
  });
};

const setDarkColor = () => {
  document.body.style.setProperty("--main-bg", "#1a1a1a");
  document.body.style.setProperty("--result", "#fff");
  container.style.setProperty("--main-shadow", "#65bdbd");
  container.style.setProperty("--secondary-shadow", "#e8ae61");
  digitSection.style.setProperty("--digit-section", "#1e1e1e");
  buttonBackground.forEach((e) => {
    e.style.setProperty("--button-bg", "#2c2c2c");
  });
  numberButton.forEach((e) => {
    e.style.setProperty("--number-button", "#e2e2e2");
  });
};

const disableDarkMode = () => {
  if (mainBg.trim() === "#1a1a1a") {
    setLightColor();
    sessionStorage.setItem("darkMode", 1);
  }
};

const enableDarkMode = () => {
  if (mainBg.trim() !== "#1a1a1a") {
    setDarkColor();
    sessionStorage.setItem("darkMode", null);
  }
};

if (darkMode == null || darkMode == 'null') {
  enableDarkMode();
}else{
  disableDarkMode();
}

darkModeToggler.addEventListener("click", () => {
  mainBg = getComputedStyle(document.body).getPropertyValue("--main-bg");
  darkMode = sessionStorage.getItem("darkMode");
  if (darkMode == 1) {
    enableDarkMode();
    return;
  }
  disableDarkMode();
});
