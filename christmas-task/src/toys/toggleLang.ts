import GeneratorCards from './generateCards'
import Filters from './filters'
import ControlsPanel from './buildControlsPanel'
import LocalMemory from './resetLocalStorage'

const popupBtn=document.querySelector('.popup-btn') as HTMLElement
const switchToy=document.querySelector('.switch-toy') as HTMLElement
const switchTree=document.querySelector('.switch-tree') as HTMLElement
const navSearch=document.querySelector('.nav__search') as HTMLInputElement
const mainPageTitle=document.querySelector('.main-page__title') as HTMLElement
const mainPageButton=document.querySelector('.main-page__button') as HTMLElement
 
export let isRu:boolean=true



class Lang{
    sortData:Filters
    constructor(){
        this.sortData=new Filters()
    }
    translateApplication(){
        this.toggleLang()

        new LocalMemory().cleanLocalStorage()
    }

    toggleLang(){
        const lang=document.querySelector('.lang') as HTMLElement
        lang!.addEventListener('click',()=>{


            if(isRu===true){
                 isRu=false
                 lang.textContent='en';
                 popupBtn.textContent='close'  ;               
                  
                 switchToy.textContent='Toys';
                 switchTree.textContent='Christmas tree'
                 navSearch.placeholder='Search toy'
                 mainPageTitle!.innerHTML=`New Year's game <span>"Dress up the tree"</span>`
                 mainPageButton.textContent='Start'

                 localStorage.setItem('isRu',JSON.stringify(isRu) )
                 

            }else{
                isRu=true
                lang.textContent='ru';
                
                popupBtn.textContent='закрыть';
                switchToy.textContent='Игрушки';
                switchTree.textContent='Елка';
                navSearch.placeholder='Найти игрушку'
                mainPageTitle!.innerHTML=` Новогодняя игра
                <span>«Наряди ёлку»</span>`
                mainPageButton.textContent='Начать'

               
                localStorage.setItem('isRu',JSON.stringify(isRu) )
            }
            new ControlsPanel().buildControls();
            new Filters().getAllFilters();

           new GeneratorCards().generateCard(this.sortData.sortData)
           new LocalMemory().cleanLocalStorage()
        })
    }
    

}

export default Lang