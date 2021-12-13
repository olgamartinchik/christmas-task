import App from "./toys/app";
// import './toys/toysCards';
import './toys/filters'

import * as noUiSlider from 'nouislider';
import './toys/filtersSettings'
import 'nouislider/dist/nouislider.css';

const app = new App;
app.start();




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
    sliderItems.noUiSlider.on('update',(values:(number|string)[],handle):void=>{
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
    sliderYears!.noUiSlider.on('update',(values:(number|string)[],handle):void=>{
      inputYears[handle.toString()].value=Math.round(values[handle.toString()])
    })
    }
    