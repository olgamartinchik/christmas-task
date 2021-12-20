import Filters from '../toys/filters';
import SelectionToys from '../toys/selectionToy';
import ResetFilters from '../toys/resetFilters';
import LocalMemory from '../toys/resetLocalStorage';
import Lang from '../toys/toggleLang';
import ToyWrapper from '../toys/toysContainerScroll';

let rememberPage:string|null=null
class App {
    public start(): void {
        new Lang().translateApplication()
        this.toggleMainPage()

        new Filters().filterCards();

        new ResetFilters().getEmptyFilters();
        //btn reset memory
        new LocalMemory().cleanMemory()

        new SelectionToys().toggleSelectionCards();
        // console.log('222222222',document.querySelector('.toys-container'))
        new ToyWrapper().hiddenArrowDownWithScroll()
        // new ToyWrapper().hiddenArrowDownWithSort()
        
    }

    toggleMainPage():void{
        (document.querySelector('.main-page__button') as HTMLElement).addEventListener('click', (): void => {
            (document.querySelector('.main-page') as HTMLElement).classList.add('hidden');
            rememberPage='.main-page';
            (document.querySelector('.nav__container') as HTMLElement).classList.remove('hidden');
            (document.querySelector('.toys-page') as HTMLElement).classList.remove('hidden');
            (document.querySelector('.nav__search') as HTMLInputElement).focus();
        });

        (document.querySelector('.nav__logo') as HTMLElement).addEventListener('click', (): void => {
            (document.querySelector('.main-page') as HTMLElement).classList.remove('hidden');
            (document.querySelector('.nav__container') as HTMLElement).classList.add('hidden');
            rememberPage='.nav__container';
            (document.querySelector('.toys-page') as HTMLElement).classList.add('hidden');
         
        });
        const navSearch = document.querySelector('.nav__search') as HTMLInputElement;
        navSearch.addEventListener('focus', (): void => {
            navSearch.classList.add('nav__search_active');
        });
        navSearch.addEventListener('blur', (): void => {
            navSearch.classList.remove('nav__search_active');
        });
    }
}
export default App;
