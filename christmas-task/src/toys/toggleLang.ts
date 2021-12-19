import GeneratorCards from './generateCards'
import Filters from './filters'
import ControlsPanel from './buildControlsPanel'
import LocalMemory from './resetLocalStorage'

const lang=document.querySelector('.lang') as HTMLElement
const popupBtn=document.querySelector('.popup-btn') as HTMLElement
const switchToy=document.querySelector('.switch-toy') as HTMLElement
const switchTree=document.querySelector('.switch-tree') as HTMLElement
const navSearch=document.querySelector('.nav__search') as HTMLInputElement
const mainPageTitle=document.querySelector('.main-page__title') as HTMLElement
const mainPageButton=document.querySelector('.main-page__button') as HTMLElement
 
export let isRu:boolean=true
if(localStorage.getItem('isRu')){  
    isRu=localStorage.getItem('isRu')==='true'?true:false
}


class Lang{
    sortData:Filters
    constructor(){
        this.sortData=new Filters()
    }
    translateApplication(){
        console.log('isRu',isRu)
        this.getDataLangFromLocalStorage()       
        this.toggleLang()
    }

    toggleLang(){
       
        lang!.addEventListener('click',()=>{
            console.log('isRu',isRu)
            if(isRu===true){
                 isRu=false
                 this.translateToEng()   
                 localStorage.setItem('isRu',JSON.stringify(isRu) )
            }else{
                isRu=true
                this.translateToRu()
                localStorage.setItem('isRu',JSON.stringify(isRu) )
            }
            this.buildWithLang()
            new LocalMemory().cleanLocalStorage()
        })
    }
    translateToEng(){
        lang.textContent='en';
        popupBtn.textContent='close'  ;    
        switchToy.textContent='Toys';
        switchTree.textContent='Christmas tree'
        navSearch.placeholder='Search toy'
        mainPageTitle!.innerHTML=`New Year's game <span>"Dress up the tree"</span>`
        mainPageButton.textContent='Start'
    }
    translateToRu(){        
        lang.textContent='ru';                
        popupBtn.textContent='закрыть';
        switchToy.textContent='Игрушки';
        switchTree.textContent='Елка';
        navSearch.placeholder='Найти игрушку'
        mainPageTitle!.innerHTML=` Новогодняя игра
        <span>«Наряди ёлку»</span>`
        mainPageButton.textContent='Начать'

    }
    buildWithLang(){
        new ControlsPanel().buildControls();
        new Filters().getAllFilters();
        new GeneratorCards().generateCard(this.sortData.sortData)
        new LocalMemory().cleanLocalStorage()
    }
    getDataLangFromLocalStorage(){
        isRu?this.translateToRu():this.translateToEng()
    }

}

export default Lang