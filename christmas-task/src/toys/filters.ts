import GeneratorCards from './generateCards';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import ControlsPanel from './buildControlsPanel';

type ObjectData = (string | null | undefined)[] | undefined;
export type SortType = {
    minMaxSort?: string | null;
    minNum?: string | undefined;
    maxNum?: string | undefined;
    minYear?: string | undefined;
    maxYear?: string | undefined;
    name?: string | undefined | null;
    count?: string;
    year?: string;
    shape?: ObjectData;
    color?: ObjectData;
    size?: ObjectData;
    favorite?: boolean[];
};
class Filters {
    public generatorCards: GeneratorCards;

    public sortData: SortType;

    private dataAttribute: string | null;

    constructor() {
        this.sortData = {
            minMaxSort: null,
            minNum: '1',
            maxNum: '12',
            minYear: '1940',
            maxYear: '2020',
            name: null,
            shape: [],
            color: [],
            size: [],
            favorite: [],
        };
        if (localStorage.getItem('sortData')) {
            const localSortData = JSON.parse(localStorage.getItem('sortData')!) as SortType;
            this.sortData.minMaxSort = localSortData!.minMaxSort;
            this.sortData.minNum = localSortData!.minNum;
            this.sortData.maxNum = localSortData!.maxNum;
            this.sortData.minYear = localSortData!.minYear;
            this.sortData.maxYear = localSortData!.maxYear;
            this.sortData.name = localSortData!.name;
            this.sortData.shape = localSortData!.shape;
            this.sortData.color = localSortData!.color;
            this.sortData.size = localSortData!.size;
            this.sortData.favorite = localSortData!.favorite;
        }

        this.dataAttribute = null;
        this.generatorCards = new GeneratorCards();
    }

    private sort(selector: NodeListOf<Element>, object: ObjectData, dataAttribute: string | null): void {
        selector.forEach((filter) => {
            filter.addEventListener('click', (): void => {
                filter.classList.toggle('active');
                if (filter.classList.contains('active')) {
                    object!.push(filter.getAttribute(`${dataAttribute}`));
                    this.generatorCards.generateCard(this.sortData);

                    localStorage.setItem('sortData', JSON.stringify(this.sortData));
                } else {
                    const ind = object!.indexOf(filter.getAttribute(`${dataAttribute}`));
                    object!.splice(ind, 1);
                    this.generatorCards.generateCard(this.sortData);

                    localStorage.setItem('sortData', JSON.stringify(this.sortData));
                }
            });
        });
    }

    private sortByShape(): void {
        const shapeFilter = document.querySelectorAll('[data-shape]');

        this.dataAttribute = 'data-shape';
        this.sort(shapeFilter, this.sortData.shape, this.dataAttribute);
    }

    private sortByColor(): void {
        const colorFilter = document.querySelectorAll('[data-color]');

        this.dataAttribute = 'data-color';
        this.sort(colorFilter, this.sortData.color, this.dataAttribute);
    }

    private sortBySize(): void {
        const colorFilter = document.querySelectorAll('[data-size]');

        this.dataAttribute = 'data-size';
        this.sort(colorFilter, this.sortData.size, this.dataAttribute);
    }

    private sortByFavorite(): void {
        const favoriteToy = document.querySelector('#favorite') as HTMLInputElement;
        favoriteToy!.addEventListener('change', (): void => {
            if (favoriteToy.checked === true) {
                this.sortData.favorite!.push(true);
                this.generatorCards.generateCard(this.sortData);

                localStorage.setItem('sortData', JSON.stringify(this.sortData));
            } else {
                const ind = this.sortData.favorite!.indexOf(true);
                this.sortData.favorite!.splice(ind, 1);
                this.generatorCards.generateCard(this.sortData);

                localStorage.setItem('sortData', JSON.stringify(this.sortData));
            }
        });
    }

    private searchToy(): void {
        const navSearch = document.querySelector('.nav__search') as HTMLInputElement;
        navSearch!.addEventListener('input', (): void => {
            this.sortData.name = navSearch!.value.toLowerCase().trim();
            this.generatorCards.generateCard(this.sortData);

            localStorage.setItem('sortData', JSON.stringify(this.sortData));
        });
    }

    private filterMaxMin(): void {
        const sort = document.querySelector('.sort') as HTMLInputElement;
        (sort! as HTMLInputElement).addEventListener('change', (e): void => {
            const valueSelect = (e.currentTarget! as HTMLInputElement).value;
            this.sortData.minMaxSort = valueSelect;
            this.generatorCards.generateCard(this.sortData);

            localStorage.setItem('sortData', JSON.stringify(this.sortData));
        });
    }

    private filterByNum(): void {
        const sliderItems = document.querySelector('#slider-items') as noUiSlider.target;
        const inputItem1 = document.querySelector('#input-item1') as HTMLInputElement;
        const inputItem2 = document.querySelector('#input-item2') as HTMLInputElement;

        if (sliderItems) {
            noUiSlider.create(sliderItems, {
                start: [this.sortData.minNum!, this.sortData.maxNum!],
                connect: true,
                step: 1,
                range: {
                    min: [1],
                    max: [12],
                },
            });
            const inputItems = [inputItem1, inputItem2];
            sliderItems.noUiSlider!.on('change', (values: (number | string)[], handle): void => {
                inputItems[handle.toString()].value = Math.round(values[handle.toString()]);

                this.sortData.minNum = Math.round(+values[0]).toString();
                this.sortData.maxNum = Math.round(+values[1]).toString();

                this.generatorCards.generateCard(this.sortData);
                localStorage.setItem('sortData', JSON.stringify(this.sortData));
            });
        }
    }

    private filterByYear(): void {
        const sliderYears = document.querySelector('#slider-years') as noUiSlider.target;
        const inputYear1 = document.querySelector('#input-year1') as HTMLInputElement;
        const inputYear2 = document.querySelector('#input-year2') as HTMLInputElement;

        if (sliderYears) {
            noUiSlider.create(sliderYears, {
                start: [this.sortData.minYear!, this.sortData.maxYear!],

                connect: true,
                step: 10,
                range: {
                    min: [1940],
                    max: [2020],
                },
            });
            const inputYears = [inputYear1, inputYear2];
            sliderYears!.noUiSlider!.on('change', (values: (number | string)[], handle): void => {
                inputYears[handle.toString()].value = Math.round(values[handle.toString()]);

                this.sortData.minYear = Math.round(+values[0]).toString();
                this.sortData.maxYear = Math.round(+values[1]).toString();

                this.generatorCards.generateCard(this.sortData);

                localStorage.setItem('sortData', JSON.stringify(this.sortData));
            });
        }
    }

    public getAllFilters(): void {
        this.sortByFavorite();
        this.sortByShape();
        this.sortByColor();
        this.sortBySize();
        this.searchToy();
        this.filterMaxMin();
        this.filterByNum();
        this.filterByYear();
    }

    public filterCards(): void {
        new ControlsPanel().buildControls();
        this.getAllFilters();

        this.generatorCards.generateCard(this.sortData);
    }
}

export default Filters;
