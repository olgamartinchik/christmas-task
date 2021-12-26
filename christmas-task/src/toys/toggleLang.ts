import GeneratorCards from './generateCards';
import Filters from './filters';
import ControlsPanel from './buildControlsPanel';
import LocalMemory from './resetLocalStorage';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
//Toys
const lang = document.querySelector('.lang') as HTMLElement;
const popupBtn = document.querySelector('.popup-btn') as HTMLElement;
const switchToy = document.querySelector('.switch-toy') as HTMLElement;
const switchTree = document.querySelector('.switch-tree') as HTMLElement;
const navSearch = document.querySelector('.nav__search') as HTMLInputElement;
const mainPageTitle = document.querySelector('.main-page__title') as HTMLElement;
const mainPageButton = document.querySelector('.main-page__button') as HTMLElement;
//Tree
const titleSelectTree=document.querySelector('.title-select-tree')as HTMLElement;
const titleSelectBg=document.querySelector('.title-select-bg')as HTMLElement;
const titleSelectGarland=document.querySelector('.title-select-garland')as HTMLElement;
const saveBtn=document.querySelector('.save-btn')as HTMLElement;
const resetTreeBtn=document.querySelector('.reset-treeBtn')as HTMLElement;
const titleUserToy=document.querySelector('.title-user-toy')as HTMLElement;
const titleSaveTree=document.querySelector('.title-save-tree')as HTMLElement;

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
        switchTree.textContent='Tree';
        navSearch.placeholder = 'Search toy';
        mainPageTitle!.innerHTML = `New Year's game <span>"Dress up the tree"</span>`;
        mainPageButton.textContent = 'Start';
        titleSelectTree.textContent='Choose a tree:'
        titleSelectBg!.textContent='Choose background:'
        titleSelectGarland.textContent='Garland:'
        saveBtn!.textContent='Save'
        resetTreeBtn!.textContent='Reset settings'
        titleUserToy!.textContent='Toys:'
        titleSaveTree!.textContent='You dressed up:'
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
        titleSelectTree.textContent='Выберите елку:'
        titleSelectBg!.textContent='Выберите фон:'
        titleSelectGarland.textContent='Гирляда:'
        saveBtn!.textContent='Сохранить'
        resetTreeBtn!.textContent='Сброс настроек'
        titleUserToy!.textContent='Игрушки:'
        titleSaveTree!.textContent='Вы нарядили:'
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
