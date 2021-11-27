let previousOperator = null;
let totalNumber = 0;
let screenNumber = '0';

const screen = document.querySelector('.screen');

function buttonClick(value) {
	if (isNaN(value)) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}

	screen.innerText = screenNumber;
	if (screen.innerText.length > 6) {
		screen.innerText = screen.innerText.slice(0, 7);
	}
}

function handleNumber(value) {
	if (screenNumber === '0') {
		screenNumber = value;
	} else {
		screenNumber += value;
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
			}
			break;
		case '=':
			if (previousOperator === null) {
				return
			}
			Calc(parseInt(screenNumber));
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
		Calc(intScreenNumber);
	}

	previousOperator = symbol;
	screenNumber = '0';
}

function Calc(intScreenNumber) {
	if (previousOperator === '+') {
		totalNumber += intScreenNumber;
	} else if (previousOperator === '−') {
		totalNumber -= intScreenNumber;
	} else if (previousOperator === '÷') {
		totalNumber /= intScreenNumber;
	} else {
		totalNumber *= intScreenNumber;
	}
}



document.querySelector('.calc-buttons')
	.addEventListener('click', function (event) {
		buttonClick(event.target.innerText);
	})


