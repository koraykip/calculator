// script.js

// Basic math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) {
    return "\u{1F914}";
  }
  return a / b;
}

// Dispatcher
function operate(op, a, b) {
  switch (op) {
    case '+': return add(a, b);
    case '-':
    case '−': // handle Unicode minus
      return subtract(a, b);
    case '×': case '*': return multiply(a, b);
    case '÷': case '/': return divide(a, b);
    case '%': return a % b;
    default: return null;
  }
}

// State
let firstOperand = null;
let operator = null;
let waitingForSecond = false;
let displayValue = '';
let latestResult = null;
let lastExpression = '';

// Elements
const inputDisplay = document.getElementById('input-display');
const outputDisplay = document.getElementById('output-display');
const allButtons = document.querySelectorAll('button');

function buildExpression() {
  if (firstOperand !== null) {
    let expr = String(firstOperand);
    if (operator) {
      expr += ' ' + operator;
      if (displayValue) expr += ' ' + displayValue;
    }
    return expr;
  }
  return displayValue;
}

function updateDisplays() {
  // Input display: show lastExpression after equals, else build current expression
  if (latestResult !== null) {
    inputDisplay.textContent = lastExpression;
  } else {
    inputDisplay.textContent = buildExpression() || '';
  }
  // Output display: show result only after equals
  outputDisplay.textContent = latestResult !== null ? String(latestResult) : '';
}

allButtons.forEach(button => {
  button.addEventListener('click', () => {
    const { id, textContent } = button;

    if (id.startsWith('digit-') || id === 'period') {
      // Input digits or decimal
      if (waitingForSecond) {
        displayValue = id === 'period' ? '0.' : textContent;
        waitingForSecond = false;
      } else {
        if (id === 'period') {
          if (!displayValue.includes('.')) {
            displayValue = displayValue || '0';
            displayValue += '.';
          }
        } else {
          displayValue = displayValue === '' ? textContent : displayValue + textContent;
        }
      }
      // Reset result and lastExpression while typing
      latestResult = null;
      lastExpression = '';

    } else if (id === 'clear') {
      // Clear all
      displayValue = '';
      firstOperand = null;
      operator = null;
      waitingForSecond = false;
      latestResult = null;
      lastExpression = '';

    } else if (id === 'backspace') {
      // Remove last char
      if (!waitingForSecond) {
        displayValue = displayValue.slice(0, -1);
      }

    } else if (id === 'equals') {
      // Compute result
      if (operator && firstOperand !== null && !waitingForSecond) {
        // Save full expression
        lastExpression = buildExpression();
        const secondOperand = parseFloat(displayValue);
        const result = operate(operator, firstOperand, secondOperand);
        // Round floats
        latestResult = typeof result === 'number'
          ? Math.round(result * 1e12) / 1e12
          : result;
        // Reset state but preserve lastExpression
        displayValue = '';
        firstOperand = null;
        operator = null;
        waitingForSecond = false;
      }

    } else {
      // Operator pressed
      const inputNum = parseFloat(displayValue);
      if (!isNaN(inputNum)) {
        if (operator && !waitingForSecond) {
          // chain calculation
          const interim = operate(operator, firstOperand, inputNum);
          firstOperand = typeof interim === 'number'
            ? Math.round(interim * 1e12) / 1e12
            : interim;
        } else {
          firstOperand = inputNum;
        }
        operator = textContent;
        waitingForSecond = true;
        displayValue = '';
        // Clear result and lastExpression when new operation
        latestResult = null;
        lastExpression = '';
      }
    }

    updateDisplays();
  });
});

// Initialize
typeof buildExpression; // ensure usage
// inputDisplay.textContent = '';
// updateDisplays();
