let previousOperator = null;
let totalNumber = 0;
let screenNumber = '0';
let operatorIsActive = false;

const screen = document.querySelector('.screen');

function buttonClick(value) {
	if (isNaN(value)) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}

	screen.innerText = screenNumber;
}

function handleNumber(value) {
	if (screenNumber === '0') {
		screenNumber = '';
	}

	if (operatorIsActive) {
		operatorIsActive = false;
		screenNumber = value;
	} else {
		screenNumber += value;
		screenNumber = screenNumber.slice(0, 9);
		if (screenNumber.length > 6) {
			screen.style.fontSize = '56px';
		}
	}
}


function handleSymbol(symbol) {
	switch (symbol) {
		case 'C':
			screenNumber = '0';
			totalNumber = 0;
			break;
		case '⌫':
			if (screenNumber.length === 1) {
				screenNumber = '0';
			} else {
				screenNumber = screenNumber.slice(0, -1);
				if (screenNumber.length < 7) {
					screen.style.fontSize = '88px';
				}
			}
			break;
		case '=':
			if (previousOperator === null) {
				return
			}
			calc(parseInt(screenNumber));
			previousOperator = null;
			screenNumber = +totalNumber;
			totalNumber = 0;
			break;
		case '+':
		case '−':
		case '÷':
		case '×':
			handleMath(symbol);
			break;
	}
}

function handleMath(symbol) {
	if (screenNumber === '0') {
		return;
	}

	const intScreenNumber = parseInt(screenNumber);
	if (totalNumber === 0) {
		totalNumber = intScreenNumber;
	} else {
		calc(intScreenNumber);
	}

	previousOperator = symbol;
	operatorIsActive = true;
}

function calc(intScreenNumber) {
	if (previousOperator === '+') {
		totalNumber += intScreenNumber;
	} else if (previousOperator === '−') {
		totalNumber -= intScreenNumber;
	} else if (previousOperator === '÷') {
		totalNumber /= intScreenNumber;
	} else {
		totalNumber *= intScreenNumber;
	}
	totalNumber = totalNumber.toFixed(5);
}

document.querySelector('.calc-buttons')
	.addEventListener('click', function (event) {
		buttonClick(event.target.innerText);
	})


