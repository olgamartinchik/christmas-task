import FiltersControls from "./filtersSettings";
// import ToysCard from './toysCards'
import Filters from "./filters";
import LikeCards from './likeCardsHandler';
import SelectionToys from "./selectionToy";
class App {

    public start(): void {
        (document.querySelector('.main-page__button') as HTMLElement).addEventListener('click', (): void => {
            (document.querySelector('.main-page') as HTMLElement).classList.add('hidden');
            (document.querySelector('.nav__container') as HTMLElement).classList.remove('hidden');
            (document.querySelector('.toys-page')as HTMLElement).classList.remove('hidden');
        });

        (document.querySelector('.nav__logo') as HTMLElement).addEventListener('click',():void=>{
            (document.querySelector('.main-page') as HTMLElement).classList.remove('hidden');
            (document.querySelector('.nav__container')as HTMLElement).classList.add('hidden');
            (document.querySelector('.toys-page')as HTMLElement).classList.add('hidden');
          });
        let navSearch =(document.querySelector('.nav__search')as HTMLInputElement)
        navSearch.addEventListener('focus',():void=>{ 
            navSearch.classList.add('nav__search_active')
        })
        navSearch.addEventListener('blur',():void=>{    
            navSearch.classList.remove('nav__search_active')    
         })
         const toysPageControls=document.querySelector('.toys-page__controls') as HTMLElement
         toysPageControls.innerHTML=''
         new FiltersControls().buildControlsContainer(toysPageControls)
      

        //  new LikeCards().openLikeCards()


        //  const toysContainer=document.querySelector('.toys-container') as HTMLElement
        //  toysContainer.innerHTML=''
        //  new ToysCard().buildCards(toysContainer)
        new Filters().filterCards()
        new SelectionToys().toggleSelectionCards()
         
    }
}
export default App;
