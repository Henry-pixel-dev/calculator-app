const scrollBall = document.querySelector('#scrolls');
const scrollBg = document.querySelector('#scrollBg');
let currentTheme = 1;


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



