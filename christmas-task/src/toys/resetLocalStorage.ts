import UserToys from '../tree/userToys';
import Filters from './filters';
import SelectionToys, { containerLikeCards, numLikeCards } from './selectionToy';

class LocalMemory {
    public resetCount: SelectionToys;

    constructor() {
        this.resetCount = new SelectionToys();
    }

    public cleanMemory(): void {
        const controlsPanel = document.querySelector('.toys-page__controls') as HTMLElement;
        controlsPanel!.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest<Element>('.memory-button')) {
                this.cleanLocalStorage();
                new Filters().filterCards();
                this.resetCountToys();
                new UserToys().createToysContainer();
            }
        });
    }

    public cleanLocalStorage(): void {
        if (localStorage.getItem('sortData')) {
            localStorage.removeItem('sortData');
        }
        if (localStorage.getItem('numLikeCards')) {
            localStorage.removeItem('numLikeCards');
        }
        if (localStorage.getItem('containerLikeCards')) {
            localStorage.removeItem('containerLikeCards');
        }
        if (localStorage.getItem('countToy')) {
            localStorage.removeItem('countToy');
        }
    }

    public resetCountToys(): void {
        this.resetCount.resetCount();
        containerLikeCards.length = 0;
        numLikeCards.length = 0;
    }
}
export default LocalMemory;
