

// math functions
function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b)   { 
  if (b === 0) throw new Error("Can't divide by zero!");
  return a / b;
}


function operate(operator, a, b) {
    switch (operator) {
      case "+": return add(a, b);
      case "-": return subtract(a, b);
      case "×": return multiply(a, b);
      case "÷": return divide(a, b);
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }

console.log( operate("+", 7, 3) ); // 10