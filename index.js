const digits = document.querySelectorAll(".digit__button");
const ops = document.querySelectorAll(".op__button");
const reset_button = document.querySelector("#reset");
const current_result = document.querySelector("#current__result");
const previous_operation = document.querySelector("#previous__operation");
const dot = document.querySelector("#dot");

let first = "";
let second = "";
let operator = "";
let resultExist = false;

digits.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    if (current_result.innerText.includes(".")) {
      dot.disabled = true;
    }

    if (current_result.innerText === "0" || second === null) {
      current_result.innerText = "";
    }

    if (operator) {
      if (resultExist) {
        current_result.innerText = "";
        resultExist = false;
      }
      current_result.innerText += e.target.innerText;
      second = current_result.innerText;
    } else {
      appendToResult(e);
    }
  });
});

//loop through operator except equal
for (let i = 0; i < ops.length - 1; i++) {
  ops[i].addEventListener("click", (e) => {
    if (/[0-9]/.test(current_result.innerText)) {
      if (second && operator) {
        const result = execute(first, operator, second);
        current_result.innerText = Math.round(result() * 100) / 100;
        resultExist = true;
        second = "";
        dot.disabled = false;
        return (first = current_result.innerText);
      }

      //update first value and display
      first = current_result.innerText;
      operator = e.target.innerText;
      current_result.innerText = "";
      
    }
  });
}

//equal button
ops[4].addEventListener("click", () => {
  if (first && operator && second) {
    calculate();
  }
});

reset_button.onclick = reset;

function appendToResult(e) {
  current_result.innerText += e.target.innerText;
  current_result.scrollLeft +=
    current_result.offsetWidth + current_result.offsetLeft;
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
        return (current_result.innerText = "Cannot divide by 0");
      }
      return new Function(`return ${divide(first, second)}`);
    default:
      return "Invalid symbol";
  }
}

function reset() {
  first = "";
  second = "";
  operator = "";
  current_result.innerText = "0";
  dot.disabled = false;
}

function calculate() {
  const result = execute(first, operator, second);
  current_result.innerText = Math.round(result() * 100) / 100;
  first = current_result.innerText;
  operator = "";
  second = "";
  dot.disabled = false;
}
