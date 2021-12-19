import Filters from '../toys/filters';
import SelectionToys from '../toys/selectionToy';
import ResetFilters from '../toys/resetFilters';
import LocalMemory from '../toys/resetLocalStorage';
import Lang from '../toys/toggleLang';

class App {
    public start(): void {
        new Lang().translateApplication()
        this.toggleMainPage()

        new Filters().filterCards();

        new ResetFilters().getEmptyFilters();

        new LocalMemory().cleanMemory();
        new SelectionToys().toggleSelectionCards();
        //    if((document.querySelector('.popup-wrapper')as HTMLElement).classList.contains('active')){
        //         (document.querySelector('.popup-wrapper')as HTMLElement).classList.remove('active')
        //     }
    }

    toggleMainPage():void{
        (document.querySelector('.main-page__button') as HTMLElement).addEventListener('click', (): void => {
            (document.querySelector('.main-page') as HTMLElement).classList.add('hidden');
            (document.querySelector('.nav__container') as HTMLElement).classList.remove('hidden');
            (document.querySelector('.toys-page') as HTMLElement).classList.remove('hidden');
            (document.querySelector('.nav__search') as HTMLInputElement).focus();
        });

        (document.querySelector('.nav__logo') as HTMLElement).addEventListener('click', (): void => {
            (document.querySelector('.main-page') as HTMLElement).classList.remove('hidden');
            (document.querySelector('.nav__container') as HTMLElement).classList.add('hidden');
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
