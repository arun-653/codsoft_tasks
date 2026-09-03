let currentNumber = "";
let previousNumber = "";

let operator = null;


/* Get display elements */

const currentDisplay =
    document.getElementById("current");

const previousDisplay =
    document.getElementById("previous");


/* Add number */

function appendNumber(number) {

    // Prevent multiple decimal points

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    // Prevent multiple zeros at beginning

    if (currentNumber === "0" && number !== ".") {
        currentNumber = "";
    }

    currentNumber += number;

    updateDisplay();
}


/* Select operator */

function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    // Change operator

    if (currentNumber === "" && previousNumber !== "") {
        operator = selectedOperator;
        updateDisplay();
        return;
    }

    // Calculate previous operation

    if (previousNumber !== "") {
        calculate();
    }

    previousNumber = currentNumber;

    currentNumber = "";

    operator = selectedOperator;

    updateDisplay();
}


/* Calculate */

function calculate() {

    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === null
    ) {
        return;
    }

    let previous = parseFloat(previousNumber);

    let current = parseFloat(currentNumber);

    let result;


    switch (operator) {

        case "+":

            result = previous + current;

            break;


        case "-":

            result = previous - current;

            break;


        case "*":

            result = previous * current;

            break;


        case "/":

            if (current === 0) {

                currentNumber = "Error";

                previousNumber = "";

                operator = null;

                updateDisplay();

                return;
            }

            result = previous / current;

            break;
    }


    // Remove unnecessary decimal digits

    result = parseFloat(result.toFixed(10));

    currentNumber = result.toString();

    previousNumber = "";

    operator = null;

    updateDisplay();
}


/* Clear everything */

function clearDisplay() {

    currentNumber = "";

    previousNumber = "";

    operator = null;

    updateDisplay();
}


/* Delete last number */

function deleteNumber() {

    currentNumber =
        currentNumber.slice(0, -1);

    updateDisplay();
}


/* Percentage */

function percentage() {

    if (currentNumber === "") {
        return;
    }

    currentNumber =
        (parseFloat(currentNumber) / 100).toString();

    updateDisplay();
}


/* Update display */

function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";

    previousDisplay.textContent =
        previousNumber +
        (operator ? " " + operator : "");
}


/* Keyboard support */

document.addEventListener("keydown", function(event) {

    const key = event.key;


    // Numbers

    if (!isNaN(key)) {

        appendNumber(key);

    }


    // Decimal

    else if (key === ".") {

        appendNumber(".");

    }


    // Operators

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        chooseOperator(key);

    }


    // Enter

    else if (
        key === "Enter" ||
        key === "="
    ) {

        calculate();

    }


    // Backspace

    else if (key === "Backspace") {

        deleteNumber();

    }


    // Escape

    else if (key === "Escape") {

        clearDisplay();

    }


    // Percentage

    else if (key === "%") {

        percentage();

    }

});