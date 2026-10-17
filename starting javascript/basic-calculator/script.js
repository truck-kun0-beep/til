
const currentEl = document.getElementById("current");
const previousEl = document.getElementById("previous");
const buttons = document.getElementById("buttons");

let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldReset = false; 

const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };

function updateDisplay() {
  currentEl.textContent = currentValue;

  if (operator) {
    previousEl.textContent = previousValue + " " + symbols[operator];
  } else {
    previousEl.textContent = "";
  }
}

function appendNumber(digit) {
  if (currentValue === "0" || shouldReset) {
    currentValue = digit;
    shouldReset = false;
  } else {
    currentValue = currentValue + digit;
  }
}

function appendDecimal() {
  if (shouldReset) {
    currentValue = "0.";
    shouldReset = false;
    return;
  }

  if (currentValue.includes(".")) {
    return;
  }
  currentValue = currentValue + ".";
}

function chooseOperator(newOperator) {
  if (operator !== null && !shouldReset) {
    compute();
    if (currentValue === "Error") {
      return;
    }
  }

  previousValue = currentValue; 
  operator = newOperator;
  shouldReset = true;
}

function compute() {
  const a = parseFloat(previousValue);
  const b = parseFloat(currentValue);
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        currentValue = "Error";
        previousValue = "";
        operator = null;
        return;
      }
      result = a / b;
      break;
    default:
      return;
  }

  currentValue = String(parseFloat(result.toFixed(10)));
}

function calculateResult() {
  if (operator === null || shouldReset) {
    return;
  }
  compute();
  previousValue = "";
  operator = null;
  shouldReset = true;
}

function clearAll() {
  currentValue = "0";
  previousValue = "";
  operator = null;
  shouldReset = false;
}

function deleteLast() {
  if (shouldReset) {
    return;
  }
  currentValue = currentValue.slice(0, -1);
  if (currentValue === "" || currentValue === "-") {
    currentValue = "0";
  }
}

buttons.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  if (currentValue === "Error") {
    clearAll();
  }

  if (button.dataset.number !== undefined) {
    appendNumber(button.dataset.number);
  } else if (button.dataset.operator !== undefined) {
    chooseOperator(button.dataset.operator);
  } else if (button.dataset.action === "decimal") {
    appendDecimal();
  } else if (button.dataset.action === "equals") {
    calculateResult();
  } else if (button.dataset.action === "clear") {
    clearAll();
  } else if (button.dataset.action === "delete") {
    deleteLast();
  }

  updateDisplay();
});

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (currentValue === "Error") {
    clearAll();
  }

  // Digits 0-9
  if (key >= "0" && key <= "9") {
    appendNumber(key);
  } else if (key === ".") {
    appendDecimal();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperator(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearAll();
  } else {
    return;
  }
  updateDisplay();
});

updateDisplay();