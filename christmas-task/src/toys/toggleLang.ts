import GeneratorCards from './generateCards';
import Filters from './filters';
import ControlsPanel from './buildControlsPanel';
import LocalMemory from './resetLocalStorage';

const lang = document.querySelector('.lang') as HTMLElement;
const popupBtn = document.querySelector('.popup-btn') as HTMLElement;
const switchToy = document.querySelector('.switch-toy') as HTMLElement;
const switchTree = document.querySelector('.switch-tree') as HTMLElement;
const navSearch = document.querySelector('.nav__search') as HTMLInputElement;
const mainPageTitle = document.querySelector('.main-page__title') as HTMLElement;
const mainPageButton = document.querySelector('.main-page__button') as HTMLElement;

export let isRu = true;
if (localStorage.getItem('isRu')) {
    isRu = localStorage.getItem('isRu') === 'true' ? true : false;
}

class Lang {
    public sortData: Filters;

    constructor() {
        this.sortData = new Filters();
    }

    public   translateApplication(): void {
        this.getDataLangFromLocalStorage();
        this.toggleLang();
    }

    public  toggleLang(): void {
        lang!.addEventListener('click', () => {
            new LocalMemory().cleanLocalStorage();
            if (isRu === true) {
                isRu = false;
                this.translateToEng();
                localStorage.setItem('isRu', JSON.stringify(isRu));
            } else {
                isRu = true;
                this.translateToRu();
                localStorage.setItem('isRu', JSON.stringify(isRu));
            }
            this.buildWithLang();
        });
    }

    public translateToEng(): void {
        lang.textContent = 'en';
        popupBtn.textContent = 'close';
        switchToy.textContent = 'Toys';
        switchTree.textContent='Christmas tree';
        navSearch.placeholder = 'Search toy';
        mainPageTitle!.innerHTML = `New Year's game <span>"Dress up the tree"</span>`;
        mainPageButton.textContent = 'Start';
    }

    public  translateToRu(): void {
        lang.textContent = 'ru';
        popupBtn.textContent = 'закрыть';
        switchToy.textContent = 'Игрушки';
        switchTree.textContent='Елка';
        navSearch.placeholder = 'Найти игрушку';
        mainPageTitle!.innerHTML = ` Новогодняя игра
        <span>«Наряди ёлку»</span>`;
        mainPageButton.textContent = 'Начать';
    }

    public  buildWithLang(): void {
        new ControlsPanel().buildControls();
        new Filters().getAllFilters();
        new GeneratorCards().generateCard(this.sortData.sortData);
        new LocalMemory().cleanLocalStorage();
        new LocalMemory().resetCountToys();
    }

   private getDataLangFromLocalStorage(): void {
        if (isRu) {
            this.translateToRu();
        } else {
            this.translateToEng();
        }
    }
}

export default Lang;
