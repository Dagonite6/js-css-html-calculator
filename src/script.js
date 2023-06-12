let scr = document.getElementById("number");
let bufferNum = 0;
let operNum = 0;
let currentState = "Clear";
let newState = "Clear";
let resolved = false;
let isDecimal = false;
let decimal = 0;
let decimalBuff = 0;

function clear() {
    scr.innerText = 0;
    bufferNum = 0;
    operNum = 0;
    isDecimal = false;
    decimal = 0;
    resolved = false;
    currentState = "Clear";
    newState = "Clear";
    bounce();
}
function isNumber(n) {
    let isNum = /^\d+$/.test(n);
    return isNum;
}
function bounce() {
    scr.classList.remove("anim");
    void scr.offsetWidth;
    scr.classList.add("anim");
}
function clearHold() {
    Array.from(document.querySelectorAll('.current-op')).forEach((el) => el.classList.remove('current-op'));
}
function handleOperation(chr) {
    switch (chr) {
        case "=": {
            clearHold();
            switch (currentState) {
                case "+":
                case "-":
                case "×": {
                    if (!resolved) {
                        operNum = Number(scr.innerText);
                        resolved = true;
                    }
                    console.log(currentState)
                    if (currentState == "×") {
                        bufferNum = (eval(bufferNum + "*" + operNum));
                    } else {
                        bufferNum = (eval(bufferNum + currentState + operNum));
                    }
                    isDecimal = false;
                    scr.innerText = bufferNum.toFixed(Math.max(decimal, decimalBuff));
                    bounce();
                    break;
                }
            }
            break;
        }
        case "+":
        case "-":
        case "×": {
            bufferNum = Number(scr.innerText);
            if (resolved) {
                currentState = "Clear";
                resolved = false;
            }
            isDecimal = false;
            decimalBuff = decimal
            decimal = 0;
            newState = chr;
            console.log(newState)
            break;
        }

        case ".": {
            scr.innerText = scr.innerText + ".";
            bounce();
            clearHold();
            isDecimal = true;
            break;
        }
    }
}
function handleClick(target) {

    let chr = target.innerText;
    
    if (isNumber(chr) && newState == currentState) {
        let number = scr.innerText
        if (number == 0 && !isDecimal) {
            scr.innerText = chr;
            bounce();
        }
        else {
            if (isDecimal) {
                decimal++;
            }
            scr.innerText = (scr.innerText + chr);
            bounce();

        };
    }
    else if (isNumber(chr)) {
        scr.innerText = chr;
        bounce();
        currentState = newState;
    }
    else if (chr.length <= 1) {
        target.classList.add("current-op");
        handleOperation(chr);
    }
}

let calcBtn = document.querySelector(".calc-buttons");
calcBtn.addEventListener("click", event => {
    handleClick(event.target);
});

