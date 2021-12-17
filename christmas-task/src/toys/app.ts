import Filters from './filters';
import SelectionToys from './selectionToy';
import ResetFilters from './resetFilters';
import LocalMemory from './resetLocalStorage';
class App {
    public start(): void {
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

        //  new ControlsPanel().buildControls()

        //  new LikeCards().openLikeCards()

        //  const toysContainer=document.querySelector('.toys-container') as HTMLElement
        //  toysContainer.innerHTML=''
        //  new ToysCard().buildCards(toysContainer)
        new Filters().filterCards();

        //  new LocalMemory().cleanLocalStorage()
        new ResetFilters().getEmptyFilters();

        new LocalMemory().cleanMemory();
        new SelectionToys().toggleSelectionCards();
    }
}
export default App;
