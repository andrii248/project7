const themeBtn = document.querySelector('.theme_toggle');
const iconSunny = document.querySelector('.icon--sunny');
const iconMoon = document.querySelector('.icon--moon');
themeBtn.addEventListener("click", switchTheme);

function addDark() { if (localStorage.getItem('theme') === 'dark') {
    //  document.querySelector('.films__title').classList.add('dark');
     document.querySelector('html').classList.add('dark');
    iconMoon.classList.add('visually-hidden');
    iconSunny.classList.remove('visually-hidden');
    setTimeout(() => {
         const changeText = document.querySelectorAll('.films__title');         
         for (let title of changeText) {
             title.classList.add('dark');
  }
},500)
} 
else {
    document.querySelector('html').classList.remove('dark');
    iconSunny.classList.add('visually-hidden');
    iconMoon.classList.remove('visually-hidden'); setTimeout(() => {
         const changeText = document.querySelectorAll('.films__title');         
         for (let title of changeText) {
             title.classList.remove('dark');
  }
},500)
}}




function switchTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.removeItem('theme');
        
    
} else {
        localStorage.setItem('theme', 'dark');
  
    }
    addDark();
}
addDark();