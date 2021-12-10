import App from "./ts/app";
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

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

 
    const sliderItems=document.querySelector('#slider-items')  as    noUiSlider.target
    const inputItem1=document.querySelector('#input-item1')  as HTMLInputElement
    const inputItem2=document.querySelector('#input-item2')  as HTMLInputElement

    const sliderYears=document.querySelector('#slider-years')  as     noUiSlider.target
    const inputYear1=document.querySelector('#input-year1')  as HTMLInputElement
    const inputYear2=document.querySelector('#input-year2')  as HTMLInputElement
    // TargetElement.noUiSlider?: noUiSlider.API | undefined

    if(sliderItems){
       noUiSlider.create(sliderItems,{
        start: [1, 12],
        connect: true,
        step:1,
        range: {
            'min': [1],
            'max': [12]
        }
    });
    const inputItems=[inputItem1,inputItem2];
    (sliderItems as noUiSlider.target).noUiSlider.on('update',(values:(number|string)[],handle):void=>{
      inputItems[handle.toString()].value=Math.round(values[handle.toString()])
    })
    }
    if(sliderYears){
      noUiSlider.create(sliderYears,{
      start: [1940, 2020],
      connect: true,
      step:10,
        range: {
          'min': [1940],
          'max': [2020]
        }
      });
      const inputYears=[inputYear1,inputYear2];
    (sliderYears as noUiSlider.target).noUiSlider.on('update',(values:(number|string)[],handle):void=>{
      inputYears[handle.toString()].value=Math.round(values[handle.toString()])
    })
    }
    