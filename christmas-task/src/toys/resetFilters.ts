import ControlsPanel from './buildControlsPanel';
import Filters, { SortType } from './filters';

class ResetFilters {
    sortData: Filters;

    constructor() {
        this.sortData = new Filters();
    }

    getEmptyFilters():void {
        const controlsPanel = document.querySelector('.toys-page__controls') as HTMLElement;

        controlsPanel!.addEventListener('click', (e):void => {
            if ((e.target as HTMLElement).closest<Element>('.reset-button')) {
                console.log('click');
                if (localStorage.getItem('sortData')) {
                    localStorage.removeItem('sortData');
                }
                this.resetSortData(this.sortData.sortData);
                new ControlsPanel().buildControls();
                new Filters().getAllFilters();
            }
        });
    }

    resetSortData(object: SortType):void {
        object.minMaxSort = null;
        object.minNum = '1';
        object.maxNum = '12';
        object.minYear = '1940';
        object.maxYear = '2020';
        object.name = null;
        object.shape = [];
        object.color = [];
        object.size = [];
        object.favorite = [];
    }
}

export default ResetFilters;
