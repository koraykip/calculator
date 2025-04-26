const inputDisplay  = document.querySelector('#input-display');
const outputDisplay = document.querySelector('#output-display');
const allButtons    = document.querySelectorAll('button');

let digit    = null;
let period   = false;
let sign     = false;
let operator = null;

let operand1 = '';
let operand1true = true;
let operates = '';
let operand2 = '';
let inputDisplayValue = '';
let outputDisplayValue = '= ';


function log(){
	console.log('operand1: ', operand1);
	console.log('operand1true: ', operand1true);
	console.log('operator: ', operator);
	console.log('operates: ', operates);
	console.log('operand2: ', operand2);
	console.log('inputDisplayValue: ', inputDisplayValue);
	console.log('outputDisplayValue: ', outputDisplayValue);
	console.log('digit: ', digit);
	console.log('period: ', period);
	console.log('sign: ', sign);
	console.log('----------------------------------');
}

// Basic math functions
function add(a, b)     { operates ='+'; return Number(a) + Number(b); }
function subtract(a, b){ operates ='-'; return a - b; }
function multiply(a, b){ operates ='×'; return a * b; }
function divide(a, b) {operates ='÷'; return b === 0 ? "\u{1F914}" : a / b;}
function modulus(a, b){operates ='mod'; return b === 0 ? "\u{1F914}" : a % b;}
 

function operate(op, a, b) {
	console.log('operate()');
	operand1true = false; 
	switch (op) {
	  case ' + ': return add(a, b);
	  case ' - ': return subtract(a, b);
	  case ' × ': return multiply(a, b);
	  case ' ÷ ': return divide(a, b);
	  case ' mod ': return modulus(a, b);
	  default : return null;
	}

}

function clearKeyInput() {
	console.log('clearKeyInput()');
	digit    = null;
	period   = false;
	sign     = false;
	operator = null;
}
function clear(){
	console.log('clear()');
	clearKeyInput();
	operand1 = '';
	operand1true = true;
	operand2 = '';
	operates = '';
	inputDisplayValue = '';
	outputDisplayValue = '= ';
	updateInputDisplay(inputDisplayValue);
	updateOutputDisplay(outputDisplayValue)
	log();
}

function backspace() {  
	console.log('backspace()');
	if (inputDisplayValue === '') return;  // Nichts zu löschen
	
	if (operates && inputDisplayValue.endsWith(operates)) {
		inputDisplayValue = inputDisplayValue.slice(0, -operates.length);
		operand1true = true;
		operand2 = '';
		operates = '';
	}
	else {
		inputDisplayValue = inputDisplayValue.slice(0, -1);
		if  (operand1true) { operand1 = operand1.slice(0, -1); }
		else 			   { operand2 = operand2.slice(0, -1); }
	}
    updateInputDisplay(inputDisplayValue);
	log();
}

function equals() {  
	outputDisplayValue = '= ';
	console.log('calculate()');	
	outputDisplayValue += operate(operates, operand1, operand2); 
	updateOutputDisplay(outputDisplayValue); 	
	log();
}

function updateInputDisplay(inputDisplayValue) {
	inputDisplay.textContent = inputDisplayValue;}
function updateOutputDisplay(outputDisplayValue) {
	outputDisplay.textContent = outputDisplayValue;}

function processInput() {
	console.log('processInput()');
	if (digit !== null) {
		// add digit and track operand1/2
		operand1true ? operand1 += digit : operand2 += digit
		inputDisplayValue += digit;
		updateInputDisplay(inputDisplayValue);
	} else if (period) {
		// add period only if isn't in operand1/2 yet
		if (operand1true && !operand1.includes('.')) {
			operand1 += '.'; inputDisplayValue += '.';
		} else if (!operand1true && !operand2.includes('.')) {
			operand2 += '.'; inputDisplayValue += '.';
		}
		updateInputDisplay(inputDisplayValue);
	} else if (operator!== null) {
		operand1true = false; 
		operates = operator;
		inputDisplayValue += operates;
		updateInputDisplay(inputDisplayValue);
		log();
	} else if (sign) {		
		operand1true ? operand1*= -1 : operand2*= -1;
		inputDisplayValue = `${operand1} ${operates} ${operand2}`;
		updateInputDisplay(inputDisplayValue);
	}

	log();
}


allButtons.forEach(button => {
	button.addEventListener('click', () => {
		console.log('addEventListener');
		const {id} = button;
		clearKeyInput();
		switch (id) {
			case 'digit-1'  : digit    = '1'  ; break;
			case 'digit-2'  : digit    = '2'  ; break;
			case 'digit-3'  : digit    = '3'  ; break;
			case 'digit-4'  : digit    = '4'  ; break;
			case 'digit-5'  : digit    = '5'  ; break;
			case 'digit-6'  : digit    = '6'  ; break;
			case 'digit-7'  : digit    = '7'  ; break;
			case 'digit-8'  : digit    = '8'  ; break;
			case 'digit-9'  : digit    = '9'  ; break;
			case 'digit-0'  : digit    = '0'  ; break;
			case 'period'   : period   = true ; break;		
			case 'sign'     : sign     = true ; break;
			case 'plus'     : operator = ' + '  ; break;
			case 'minus'    : operator = ' - '  ; break;
			case 'multiply' : operator = ' × '  ; break;
			case 'divide'   : operator = ' ÷ '  ; break;
			case 'mod'      : operator = ' mod '; break;
			case 'clear'    : clear() 	  ; break;
			case 'backspace': backspace() ; break;
			case 'equals'   : equals() 	  ; break;
		}  
		processInput();
	});
});



