document.getElementById("answer").readOnly = true; //set this attribute in Html file
let screen = document.getElementById("answer");
buttons = document.querySelectorAll("button");

//Factorial function:
let f = [];
function Factorial (z) {
    //If the number is not an integer, use Stirling's approximation of the gamma function:
    if (!Number.isInteger(z)){
        z += 1;
        return Math.sqrt(2 * Math.PI / z) * Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z);
    }
    //If the number is an integer, use this recursive factorial function:
    else {
        if (z === 0 || z === 1)
            return 1;
        if (f[z] > 0)
            return f[z];
        return f[z] = Factorial(z-1) * z;
    }
}

//Detemines the function based on what button is pressed
let screenValue = "";
for (item of buttons) {
    item.addEventListener("click", (e) => {
        buttonText = e.target.innerText;
        if (buttonText === "X") {
            buttonText = "*";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "x") {
            buttonText = "*";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "÷") {
            buttonText = "/";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "π") {
            buttonText = "π";
            screenValue += Math.PI;
            screen.value = screenValue;
        } else if (buttonText === "√x") {
            buttonText = "**0.5";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "x2") {
            buttonText = "**2";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "x3") {
            buttonText = "**3";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "xy") {
            buttonText = "**";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "!") {
            buttonText = "Factorial(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "abs") {
            buttonText = "Math.abs(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "e") {
            buttonText = Math.E;
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "ln") {
            buttonText = "Math.log(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "log10") {
            buttonText = "Math.log10(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "log2") {
            buttonText = "Math.log2(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "floor") {
            buttonText = "Math.floor(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "ceiling") {
            buttonText = "Math.ceil(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "round") {
            buttonText = "Math.round(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "sin") {
            buttonText = "Math.sin(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "cos") {
            buttonText = "Math.cos(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "tan") {
            buttonText = "Math.tan(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "arcsin") {
            buttonText = "Math.asin(";
            screenValue += buttonText;
            screen.value = screenValue;
            } else if (buttonText === "arccos") {
            buttonText = "Math.acos(";
            screenValue += buttonText;
            screen.value = screenValue;
            } else if (buttonText === "arctan") {
            buttonText = "Math.atan(";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "+") {
            buttonText = "+";
            screenValue += buttonText;
            screen.value = screenValue;
        } else if (buttonText === "C") {
            screenValue = "";
            screen.value = screenValue;
        } else if (buttonText === "=") {
            checkForBracketMulti(); // automatically evaluates if no brackets
        } else {
            screenValue += buttonText;
            screen.value = screenValue;
        }
    });
}

//Allows entering certain keys (e.g. (, %)) when typing with shift
document.addEventListener("keydown", function (event) {
    console.log(event.which);
    if (event.shiftKey === 57) {
        event.key = "(";
    } else if (event.shiftKey === 48) {
        event.key = ")";
    } else if (event.shiftKey === 53) {
        event.key = "%";
    }
    if (event.keyCode === 88) {
        screenValue += "*";
        screen.value = screenValue;
    }
    if (
        event.key <= 9 ||
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "." ||
        event.key === "/" ||
        event.key === "%" ||
        event.key === "(" ||
        event.key === ")"
    ) {
        screenValue += event.key;
        screen.value = screenValue;
    }
    if (event.keyCode === 13 || event.keyCode === 187) {
        checkForBracketMulti(); // automatically evaluates if no brackets
    } else if (event.keyCode === 46) {
        screenValue = "";
        screen.value = screenValue;
        console.clear();
    } else if (event.keyCode === 107) {
        screenValue = "+";
        screen.value = screenValue;
        console.clear();
    } else if (event.keyCode === 187) {
        screenValue = "+";
        screen.value = screenValue;
        console.clear();
    } else if (
        event.keyCode === 8) {
        screenValue = screenValue.slice(0, -1);
        screen.value = screenValue;
    } else if (event.keyCode === 67) {
        screenValue = "";
        screen.value = screenValue;
        console.clear();
    } else if (event.keyCode === 82) {
        location.reload();
    }
});

window.onerror = function () {
    alert("PLEASE INPUT VALID EXPRESSION");
    screenValue = "";
    screen.value = screenValue;
    console.clear();
};

//Allows multiplication with brackets, without typing "*", by automatically adding multiplication
window.onBracketMultiplication = function () {
    //Doesn't automatically add "*" if using logarithm functiosn
    if (buttonText !== "Math.log2(" && buttonText !== "Math.log10("){
        screenValue = addStr(screen.value, screen.value.indexOf("("), "*");
    }
    screen.value = eval(screenValue);
};

function addStr(str, index, stringToAdd) {
    return (
        str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
}

function checkForBracketMulti() {
    // Check if there's a number directly in-front of a bracket
    if (
        screen.value.includes("(") &&
        !isNaN(screen.value.charAt(screen.value.indexOf("(") - 1))
    ) {
        window.onBracketMultiplication();
    } else {
        screen.value = eval(screenValue);
    }
}