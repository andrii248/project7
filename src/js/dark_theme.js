const themeBtn = document.querySelector('.theme_toggle');
const iconSunny = document.querySelector('.icon--sunny');
const iconMoon = document.querySelector('.icon--moon');

 if (localStorage.getItem('theme') === 'dark') {
    //  document.querySelector('.films__title').classList.add('dark');
     document.querySelector('html').classList.add('dark');
     iconMoon.classList.add('visually-hidden');
} 
 else {
     iconSunny.classList.add('visually-hidden');
}

themeBtn.addEventListener("click", switchTheme);

function switchTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.removeItem('theme');
        
    
} else {
        localStorage.setItem('theme', 'dark');
  
}
}
