import Filters from './filters';
import SelectionToys, { containerLikeCards, numLikeCards, countToy } from './selectionToy';

class LocalMemory {
    resetCount: SelectionToys;

    constructor() {
        this.resetCount = new SelectionToys();
    }

    cleanMemory(): void {
        const controlsPanel = document.querySelector('.toys-page__controls') as HTMLElement;
        controlsPanel!.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest<Element>('.memory-button')) {
                console.log('click');
                this.cleanLocalStorage();
                new Filters().filterCards();
                this.resetCountToys();
            }
        });
    }

    cleanLocalStorage():void {
        if (localStorage.getItem('sortData')) {
            localStorage.removeItem('sortData');
        }
        if (localStorage.getItem('numLikeCards')) {
            localStorage.removeItem('numLikeCards');
        }
        if (localStorage.getItem('containerLikeCards')) {
            localStorage.removeItem('containerLikeCards');
        }
        if(localStorage.getItem('countToy')){
            localStorage.removeItem('countToy')
        }
    }

    resetCountToys():void {
        console.log('this.countToy', countToy);
        this.resetCount.resetCount();
        containerLikeCards.length = 0;
        numLikeCards.length = 0;
        console.log('this.countToy', countToy);
    }
}
export default LocalMemory;
