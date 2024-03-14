let allButtons = document.querySelectorAll("button");
let displayResult = document.querySelector(".result");
let displayHistory = document.querySelector(".history");
var siteWidth = 1280;
var scale = screen.width / siteWidth;

document
  .querySelector('meta[name="viewport"]')
  .setAttribute("content", "width=" + siteWidth + ", initial-scale=" + scale + "");
class Display {
  constructor() {
    this.result = displayResult;
    this.history = displayHistory;
    this.pendingOperation = "";
    this.firstNumber = "";
    this.secondNumber = "";
  }
  updateResult(value) {
    this.result.textContent = value;
  }
  updateHistory(value) {
    this.history.textContent = value;
  }
  addResult(value) {
    this.result.textContent += value;
  }
  removeDigit() {
    if (this.result.textContent.length > 1) {
      this.result.textContent = this.result.textContent.slice(0, this.result.textContent.length - 1);
      this.firstNumber = this.firstNumber.slice(0, this.firstNumber.length - 1);
      this.history.textContent = this.history.textContent.slice(0, this.history.textContent.length - 1);
    } else if (this.result.textContent.length == 1) {
      this.history.textContent = this.history.textContent.slice(0, this.history.textContent.length - 1);
      this.result.textContent = "0";
      this.firstNumber = "";
    }
  }
  addHistory(value) {
    if ((this.history.textContent + value).length > 60) {
      this.history.textContent =
        this.history.textContent.slice(
          (this.history.textContent + value).length - 60,
          this.history.textContent.length
        ) + value;
    }
    this.history.textContent += value;
  }
  clearResult() {
    if (this.pendingOperation === "") this.firstNumber = "";
    else this.secondNumber = "";
    this.history.textContent = this.history.textContent.slice(0, parseInt(this.result.textContent.length * -1));
    this.result.textContent = "0";
  }
  clearCalculator() {
    this.result.textContent = "0";
    this.history.textContent = "";
    this.pendingOperation = "";
    this.firstNumber = "";
    this.secondNumber = "";
  }
  addOperation(operation) {
    if (this.history.textContent.slice(-1) === "=") {
      this.updateHistory(this.result.textContent);
      this.firstNumber = this.result.textContent;
      this.secondNumber = "";
    }
    if (this.history.textContent === "") {
      this.clearCalculator();
    } else if (this.pendingOperation === "") {
      this.pendingOperation = operation;
      this.addHistory(operation);
    } else if (this.pendingOperation !== operation && this.secondNumber == "") {
      this.pendingOperation = operation;
      this.updateHistory(this.history.textContent.slice(0, -1) + operation);
    } else if (this.pendingOperation === operation && this.secondNumber === "") {
      this.addHistory(this.firstNumber);
      this.firstNumber = this.operate(
        this.pendingOperation,
        parseFloat(this.firstNumber),
        parseFloat(this.firstNumber)
      );
    } else {
      console.log("help");
      console.log(this.firstNumber);
      console.log(this.secondNumber);
      this.firstNumber = this.operate(
        this.pendingOperation,
        parseFloat(this.firstNumber),
        parseFloat(this.secondNumber)
      );
      console.log(this.firstNumber);
      this.updateResult(this.firstNumber);
      this.addHistory(operation);
      this.pendingOperation = operation;
      this.secondNumber = "";
    }
  }
  addNumber(number) {
    if (this.history.textContent.slice(-1) === "=") {
      this.clearCalculator();
      this.firstNumber += number;
      this.updateHistory(this.firstNumber);
      this.updateResult(number);
    } else if (this.result.textContent === "0" && this.history.textContent === "") {
      this.firstNumber += number;
      this.updateHistory(this.firstNumber);
      this.updateResult(number);
    } else if (this.pendingOperation === "") {
      if ((this.firstNumber[0] === "-" && this.firstNumber.length > 15) || this.firstNumber.length > 14) {
        this.firstNumber = this.firstNumber.slice(1, this.firstNumber.length) + number;
        this.history.textContent = this.history.textContent.slice(1, this.history.textContent.length) + number;
      } else {
        this.firstNumber += number;
        this.addHistory(number);
      }
      this.updateResult(this.firstNumber);
    } else {
      if ((this.secondNumber[0] === "-" && this.secondNumber.length > 15) || this.secondNumber.length > 14) {
        this.secondNumber = this.secondNumber.slice(1, this.secondNumber.length) + number;
        this.history.textContent = this.history.textContent.slice(1, this.history.textContent.length) + number;
      } else {
        this.secondNumber += number;
        this.addHistory(number);
      }
      this.updateResult(this.secondNumber);
    }
  }
  operate(operation, firstNumber, secondNumber) {
    let result = firstNumber;
    switch (operation) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
    }
    result = Number.isInteger(result) ? result : result.toFixed(2);
    result = Math.max(Number.MIN_SAFE_INTEGER, Math.min(Number.MAX_SAFE_INTEGER, result));
    this.result.textContent = result;
    this.pendingOperation = "";
    return result;
  }
}
let display = new Display();

allButtons.forEach((button) => {
  switch (button.value) {
    case "DEL":
      button.addEventListener("click", (e) => {
        display.clearResult();
      });
      break;
    case "AC":
      button.addEventListener("click", (e) => {
        display.clearCalculator();
      });
      break;
    case "X":
      button.addEventListener("click", (e) => {
        display.addOperation("*");
      });
      break;
    case "/":
      button.addEventListener("click", (e) => {
        display.addOperation("/");
      });
      break;
    case "=":
      button.addEventListener("click", (e) => {
        if (display.history.textContent.slice(-1) !== "=") {
          display.operate(display.pendingOperation, parseFloat(display.firstNumber), parseFloat(display.secondNumber));
          display.addHistory("=");
        }
      });
      break;
    case "+":
      button.addEventListener("click", (e) => {
        display.addOperation("+");
      });
      break;
    case "-":
      button.addEventListener("click", (e) => {
        display.addOperation("-");
      });
      break;
    case "backspace":
      button.addEventListener("click", (e) => {
        display.removeDigit();
      });
      break;
    default:
      button.addEventListener("click", (e) => {
        display.addNumber(e.target.value);
      });
      break;
  }
});
