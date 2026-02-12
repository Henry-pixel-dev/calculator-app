const scrollBall = document.querySelector('#scrolls');
const scrollBg = document.querySelector('#scrollBg');
const buttons = document.querySelectorAll('button');
const display = document.querySelector('#updateDisplay')
let currentTheme = 1;
let currentInput = '';
let previousInput = '';
let operator = null;
let calcResult = ''
let isFirstNumber = true;


scrollBg.addEventListener('click', () => {
    console.log('clicked')
    if (currentTheme === 1){
        scrollBall.classList.remove('scroll1', 'scroll2', 'scroll3');  
        scrollBall.classList.add('scroll2')
        document.body.classList.remove('theme-purple', 'theme-light');
        document.body.classList.add('theme-light');
        currentTheme = 2
    } else if (currentTheme === 2){
        scrollBall.classList.remove('scroll1', 'scroll2', 'scroll3');  
        scrollBall.classList.add('scroll3')
        
        document.body.classList.remove('theme-light', 'theme-purple');
        document.body.classList.add('theme-purple');
        currentTheme = 3
    } else {
        scrollBall.classList.remove('scroll1', 'scroll2', 'scroll3'); 
        scrollBall.classList.add('scroll1')
        document.body.classList.remove('theme-light', 'theme-purple');
        currentTheme = 1
    }    
})


buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        let type = this.dataset.type;
        let value = this.dataset.value;
        
        if (type === 'Number'){
            inputNum(value)
            console.log(currentInput)
        }

        if (type === 'Operator') {
            inputOp(value)
            console.log(operator)
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
    if (isFirstNumber){
        currentInput += values;
        display.textContent = currentInput
    } else {
        previousInput += values;
        display.textContent = `${currentInput} ${operator} ${previousInput}`
    }
}

function inputOp(op) {
    if (currentInput != '') {
        isFirstNumber = false;
        operator = op;
        display.textContent = `${currentInput} ${operator}`;
    }

    if (previousInput != '' && currentInput != '') {
        operator = op;
        let sum = `${currentInput} ${operator} ${previousInput}`;
        currentInput = sum;
        previousInput = '';
        isFirstNumber = false;
        display.textContent = `${sum} ${operator}`;
    }
        
}

function sumMaths() {
    let sum = `${currentInput} ${operator} ${previousInput}`;
    display.textContent = eval(sum);
    console.log(sum)
    currentInput = ''
    previousInput = '';
    operator = ''
    
    if (operator != '') {
        currentInput = sum;
    }
}