import Filters from '../toys/filters';
import SelectionToys from '../toys/selectionToy';
import ResetFilters from '../toys/resetFilters';
import LocalMemory from '../toys/resetLocalStorage';
import Lang from '../toys/toggleLang';
import UserToys from '../tree/userToys';
import SettingsTree from '../tree/createSettingsTree';
import UserSettings from '../tree/getUserSettings';
import Snow from '../tree/getSnow';

class App {
    public start(): void {
        //toys
        new Lang().translateApplication();
        this.toggleMainPage();

        new Filters().filterCards();

        new ResetFilters().getEmptyFilters();
        //btn reset memory
        new LocalMemory().cleanMemory();

        new SelectionToys().toggleSelectionCards();

        //tree
        
        new UserToys().createToysContainer()
        new SettingsTree().buildSettingsTree()
        new UserSettings().getUserSettings()
        new Snow().getSnow()

    }

    toggleMainPage(): void {
        const headerContainer = document.querySelector('.header__container') as HTMLElement
        const navSearch = document.querySelector('.nav__search') as HTMLInputElement;
        const sections=(document.querySelectorAll('section')as NodeListOf<HTMLElement>)
        const switchTree= document.querySelector('.switch-tree' )as HTMLElement
        const switchToy=document.querySelector('.switch-toy')as HTMLElement
        const treePage=(document.querySelector('.tree-page')as HTMLElement )
        const toysPage= document.querySelector('.toys-page')as HTMLElement
        const mainPage=document.querySelector('.main-page') as HTMLElement
        const navContainer=document.querySelector('.nav__container') as HTMLElement

        headerContainer.addEventListener('click',(e):void=>{          
            if((e.target as HTMLElement).closest('.nav__logo')){
                sections.forEach(section=>{
                    section.classList.add('hidden');
                });
                navContainer.classList.add('hidden');
                mainPage.classList.remove('hidden');
                
            }
            if((e.target as HTMLElement).closest('.switch-tree')){
                sections.forEach(section=>{
                    section.classList.add('hidden');
                });
                (e.target as HTMLElement).closest('.switch-tree')!.classList.add('switch-tree_active');
                if( switchToy.classList.contains('switch-toy_active')){
                    switchToy.classList.remove('switch-toy_active');
                }                
                treePage.classList.remove('hidden')
                navSearch.focus();
            }
            if((e.target as HTMLElement).closest('.switch-toy')){
                sections.forEach(section=>{
                    section.classList.add('hidden');
                });
                (e.target as HTMLElement).closest('.switch-toy')!.classList.add('switch-toy_active');
                if(switchTree.classList.contains('switch-tree_active')){
                    switchTree.classList.remove('switch-tree_active');
                }
                
                toysPage.classList.remove('hidden');
                navSearch.focus();
            }

        });
        (document.querySelector('.main-page__button') as HTMLElement).addEventListener('click', (): void => {
            mainPage.classList.add('hidden');
            navContainer.classList.remove('hidden');
            toysPage.classList.remove('hidden');
            navSearch.focus();
        });

       
        navSearch.addEventListener('focus', (): void => {
            navSearch.classList.add('nav__search_active');
        });
        navSearch.addEventListener('blur', (): void => {
            navSearch.classList.remove('nav__search_active');
        });
    }
}
export default App;
