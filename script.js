let allButtons = document.querySelectorAll("button");
let displayResult = document.querySelector(".result");
let displayHistory = document.querySelector(".history");
let lastNumber = 0;
let currNumber = "";
let pendingOperation = "+";
let result = "";
let history = "";
function getLastNumber() {
  return (lastNumber = displayResult.textContent.includes(".")
    ? parseFloat(displayResult.textContent)
    : parseInt(displayResult.textContent));
}
function operate(operator, a, b) {
  if (b === "") return;
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
      result = a / b;
      break;
  }
  showResult(result);
}
function showResult(result) {
    displayResult.textContent = result;
    displayHistory.textContent = "";
    lastNumber = result;
    
}
allButtons.forEach((button) => {
  switch (button.value) {
    case "DEL":
      button.addEventListener("click", (e) => {
        displayResult.textContent = "0";
      });
      break;
    case "AC":
      button.addEventListener("click", (e) => {
        displayResult.textContent = "0";
        displayHistory.textContent = "";
      });
      break;
    case "X":
      button.addEventListener("click", (e) => {
        getLastNumber();
        displayHistory.textContent += "*";
      });
      break;
    case "/":
      button.addEventListener("click", (e) => {
        getLastNumber();
        displayHistory.textContent += "/";
      });
      break;
    case "=":
      button.addEventListener("click", (e) => {
        getLastNumber();
        displayHistory.textContent += "=";
        displayResult.textContent = result;
      });
      break;
    case "+":
      button.addEventListener("click", (e) => {
        getLastNumber();
        displayHistory.textContent += "+";
      });
      break;
    case "-":
      button.addEventListener("click", (e) => {
        getLastNumber();
        displayHistory.textContent += "-";
      });
    default:
      button.addEventListener("click", (e) => {
        if (displayResult.textContent === "0") {
          displayResult.textContent = e.target.value;
          displayHistory.textContent = e.target.value;
        } else {
          displayResult.textContent += e.target.value;
          displayHistory.textContent += e.target.value;
        }
      });
      break;
  }
});
