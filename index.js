const digits = document.querySelectorAll(".digit__button");
const ops = document.querySelectorAll(".op__button");
const reset_button = document.querySelector('#reset')
const current_result = document.querySelector("#current__result");
current_result.innerText = ""
let first = "";
let second = "";
let operator = "";

digits.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    if (current_result.innerText.includes(".")) {
      document.querySelector("#dot").disabled = true;
    }
    appendToResult(e);
    if (operator) {
      second = current_result.innerText;
    }
  });
});

for (let i = 0; i < ops.length - 1; i++) {
  ops[i].addEventListener("click", (e) => {
    if (/[0-9]/.test(current_result.innerText)) {
      first = current_result.innerText.match(/[0-9.]+/).toString();
      operator = e.target.innerText;
      current_result.innerText = "";
    }
  });
}

ops[4].addEventListener("click", () => {
  const result = execute(first, operator, second)();
  current_result.innerText = result;
  first = result;
  operator = ""
  second = ""
});

function appendToResult(e) {
  current_result.innerText += e.target.innerText;
  current_result.scrollLeft +=
    current_result.offsetWidth + current_result.offsetLeft;
}

function add() {
  return "+";
}

function subtract() {
  return "-";
}

function multiply() {
  return "*";
}

function divide() {
  return "/";
}

function execute(first, op, second) {
  if (!isNaN(first && second)) {
    switch (op) {
      case "+":
        return new Function(`return ${first} ${add()} ${second}`);
      case "-":
        return new Function(`return ${first} ${subtract()} ${second}`);
      case "×":
        return new Function(`return ${first} ${multiply()} ${second}`);
      case "/":
        if (second != 0) {
          return new Function(`return ${first} ${divide()} ${second}`);
        }
        return "Cannot devided by 0";
      default:
        return "Invalid symbol";
    }
  }
  return "Enter Valid Number";
}

function reset(){
    first = "";
    second = "";
    operator = "";
    current_result.innerText = ""
}