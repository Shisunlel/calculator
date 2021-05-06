const allButton = document.querySelectorAll("section button");
const multiplyButton = document.querySelector("#multiply");
const digits = document.querySelectorAll(".digit__button");
const ops = document.querySelectorAll(".op__button");
const resetButton = document.querySelector("#reset");
const currentResult = document.querySelector("#current__result");
const previousButton = document.querySelector("#previous__operation");
const backButton = document.querySelector("#backspace");
const dot = document.querySelector("#dot");

let first = "";
let second = "";
let operator = "";
let key = "";
let resultExist = false;

digits.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    inputNumber(e);
  });
});

//loop through operator except equal
for (let i = 0; i < ops.length - 1; i++) {
  ops[i].addEventListener("click", (e) => {
    inputOperator(e);
  });
}

//equal button
ops[4].addEventListener("click", () => {
  if (first && operator && second) {
    //update current operation here
    displayPreviousOperation();
    //continue
    calculate();
    clear();
  }
});

dot.onclick = addDot;

resetButton.onclick = reset;

backButton.onclick = backspace;

window.addEventListener("keydown", (e) => {
  keyboardPressed(e);
});

function returnKeyPress(e) {
  return e.key;
}

function keyboardPressed(e) {
  key = returnKeyPress(e);
  allButton.forEach((button) => {
    if (key === button.innerText) {
      applyClickAndFocusOnButton(button);
    }
  });
  if (key === "*") {
    applyClickAndFocusOnButton(multiplyButton);
  }
  if (key === "Backspace") {
    applyClickAndFocusOnButton(backButton);
  }
  if (key === "Enter") {
    applyClickAndFocusOnButton(ops[4]);
  }
  if (key === "Escape") {
    applyClickAndFocusOnButton(resetButton);
  }
}

function inputNumber(e) {
  if (currentResult.innerText === "0" || second === null) {
    currentResult.innerText = "";
  }

  if (operator) {
    if (resultExist) {
      currentResult.innerText = "";
      resultExist = false;
    }
    appendToResult(e);
    second = currentResult.innerText;
  } else {
    appendToResult(e);
  }
}

function inputOperator(e) {
  if (parseFloat(currentResult.innerText)) {
    if (second && operator) {
      calculate();
      resultExist = true;
      operator = e.target.innerText;
      //update previous operation
      displayPreviousOperation();
      second = "";
      return (first = currentResult.innerText);
    }

    //update first value and display
    first = currentResult.innerText;
    operator = e.target.innerText;
    currentResult.innerText = "";
  }
}

function applyClickAndFocusOnButton(button) {
  button.click();
  button.focus();
  setTimeout(() => {
    button.blur();
  }, 1000);
}

function appendToResult(e) {
  currentResult.innerText += e.target.innerText;
  currentResult.scrollLeft +=
    currentResult.offsetWidth + currentResult.offsetLeft;
}

function addDot() {
  if (currentResult.innerText.includes(".")) return;
  currentResult.innerText += ".";
}

function reset() {
  first = "";
  second = "";
  operator = "";
  previousButton.innerText = 0;
  resultExist = false;
  currentResult.innerText = 0;
}

function clear() {
  first = "";
  operator = "";
  second = "";
}

function backspace() {
  if (currentResult.innerText.length <= 0) return;
  if (currentResult.innerText.length == 1) return (currentResult.innerText = 0);
  currentResult.innerText = currentResult.innerText.slice(0, -1);
  second = currentResult.innerText;
}

function displayPreviousOperation() {
  previousButton.innerText = `${first} ${operator} ${second}`;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function execute(first, op, second) {
  first = Number(first);
  second = Number(second);
  switch (op) {
    case "+":
      return new Function(`return ${add(first, second)}`);
    case "-":
      return new Function(`return ${subtract(first, second)}`);
    case "×":
      return new Function(`return ${multiply(first, second)}`);
    case "/":
      if (second === 0) {
        second = null;
        return (currentResult.innerText = "Cannot divide by 0");
      }
      return new Function(`return ${divide(first, second)}`);
    default:
      return "Invalid symbol";
  }
}

function calculate() {
  const result = execute(first, operator, second);
  currentResult.innerText = Math.round(result() * 1000) / 1000;
}
