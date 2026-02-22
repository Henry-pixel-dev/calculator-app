window.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        applyTheme(Number(savedTheme));
    } 
    else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme(3); 
        } else {
            applyTheme(1);  
        }
    }
});


const scrollBall = document.querySelector('#scrolls');
const scrollBg = document.querySelector('#scrollBg');
const buttons = document.querySelectorAll('button');
const display = document.querySelector('#updateDisplay')
let currentTheme = 1;
let currentInput = '';
let previousInput = '';
let operator = null;
let calcResult = '';
let isFirstNumber = true;
let justCalculated = false;


function applyTheme(themeNumer) {
    scrollBall.classList.remove('scroll1', 'scroll2', 'scroll3'); 
    document.body.classList.remove('theme-light', 'theme-purple');

    if (themeNumer === 1) {
        scrollBall.classList.add('scroll1');
    } else if (themeNumer === 2) {
        scrollBall.classList.add('scroll2');
        document.body.classList.add('theme-light');
    } else if (themeNumer === 3) {
        scrollBall.classList.add('scroll3');
        document.body.classList.add('theme-purple');
    }

    localStorage.setItem('theme', themeNumer.toString());
    currentTheme = themeNumer;
}

scrollBg.addEventListener('click', () => {
    let nextTheme;
    if (currentTheme === 1) nextTheme = 2;
    else if (currentTheme === 2) nextTheme = 3;
    else nextTheme = 1;
    applyTheme(nextTheme);
})


buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        let type = this.dataset.type;
        let value = this.dataset.value;
        
        if (type === 'Number'){
            inputNum(value)
        }

        if (type === 'Operator') {
            inputOp(value)
        }

        if (type === 'equal') {
            sumMaths()
        }

        if(type === 'delete'){
            deleteNum()
        }

        if(type === 'Reset') {
            resetDOm()
        }
    })
})

function inputNum(values) {
    if (justCalculated) {
        currentInput = "";
        previousInput = "";
        operator = "";
        isFirstNumber = true;
        justCalculated = false;
    }

    if (isFirstNumber){
        currentInput += values;
        display.textContent = currentInput
    } else {
        previousInput += values;
        display.textContent = `${currentInput} ${operator} ${previousInput}`
    }
}

function inputOp(op) {
    justCalculated = false


    if (currentInput != '' && previousInput === '') {
        isFirstNumber = false;
        operator = op;
        display.textContent = `${currentInput} ${operator}`;
    } else if (previousInput != '' && currentInput != '') {
        let sum = `${currentInput} ${operator} ${previousInput}`;
        currentInput = sum;
        previousInput = '';
        isFirstNumber = false;
        operator = op;
        display.textContent = `${sum} ${operator}`;
    }
        
}


function sumMaths() {
    let sum = `${currentInput} ${operator} ${previousInput}`;
    display.textContent = eval(sum);
    currentInput = sum.toString();
    previousInput = '';
    operator = '';
    justCalculated = true;
    
    if (operator != '') {
        currentInput = sum;
    }
}

function deleteNum() {
    if (isFirstNumber && currentInput.length > 0) {
       currentInput = currentInput.slice(0, -1)
       display.textContent = currentInput
    } else if (!isFirstNumber && previousInput.length > 0) {
        previousInput = previousInput.slice(0, -1)
        display.textContent = `${currentInput} ${operator} ${previousInput}`;
    } else if (!isFirstNumber && previousInput.length === 0) {
        operator = '';
        isFirstNumber = true;
        display.textContent = currentInput;
    } else if (justCalculated) {
        isFirstNumber = true;
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput;
    }
}


function resetDOm() {
    currentInput = '';
    previousInput = '';
    operator = null;
    isFirstNumber = true;
    justCalculated = false;
    display.textContent = '0';
}
