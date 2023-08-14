// Calculator functionality
let displayValue = '0';
let firstOperand = null;
let operator = null;
let awaitingNextOperand = false;

const display = document.getElementById('display');

function inputDigit(digit) {
  if (awaitingNextOperand) {
    displayValue = digit;
    awaitingNextOperand = false;
  } else {
    displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);
  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation();
    displayValue = String(result);
    firstOperand = result;
  }
  operator = nextOperator;
  awaitingNextOperand = true;
}

function performCalculation() {
  const inputValue = parseFloat(displayValue);
  if (operator === '+') {
    return firstOperand + inputValue;
  } else if (operator === '-') {
    return firstOperand - inputValue;
  } else if (operator === '*') {
    return firstOperand * inputValue;
  } else if (operator === '/') {
    return firstOperand / inputValue;
  }
  return inputValue;
}

function resetCalculator() {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  awaitingNextOperand = false;
}

// Event listeners for buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;
    if (/\d/.test(buttonValue)) {
      inputDigit(buttonValue);
      display.textContent = displayValue;
    } else if (buttonValue === '.') {
      inputDecimal();
      display.textContent = displayValue;
    } else if (/[+\-*/]/.test(buttonValue)) {
      handleOperator(buttonValue);
    } else if (buttonValue === '=') {
      if (operator !== null) {
        const result = performCalculation();
        displayValue = String(result);
        display.textContent = displayValue;
        operator = null;
        awaitingNextOperand = true;
      }
    } else if (buttonValue === 'C') {
      resetCalculator();
      display.textContent = displayValue;
    } else if (buttonValue === '⌫') {
      displayValue = displayValue.slice(0, -1);
      if (displayValue === '') {
        displayValue = '0';
      }
      display.textContent = displayValue;
    }
  });
});
