import App from "./ts/app";

const app = new App;
app.start();

(document.querySelector('.nav__logo') as HTMLElement).addEventListener('click',():void=>{
  (document.querySelector('.main-page') as HTMLElement).classList.remove('hidden');
  (document.querySelector('.nav__container')as HTMLElement).classList.add('hidden');
})

let navSearch =(document.querySelector('.nav__search')as HTMLInputElement)
navSearch.addEventListener('focus',()=>{ 
navSearch.classList.add('nav__search_active')
})
navSearch.addEventListener('blur',()=>{    
        navSearch.classList.remove('nav__search_active')    
    })
