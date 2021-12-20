import GeneratorCards from './generateCards';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import ControlsPanel from './buildControlsPanel';
import ToyWrapper from './toysContainerScroll';

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
    generatorCards: GeneratorCards;

    sortData: SortType;

    dataAttribute: string | null;

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

    private sort(selector: NodeListOf<Element>, object: ObjectData, dataAttribute: string | null):void {
        selector.forEach((filter) => {
            filter.addEventListener('click', ():void => {
                filter.classList.toggle('active');
                if (filter.classList.contains('active')) {
                    object!.push(filter.getAttribute(`${dataAttribute}`));
                    console.log('object', object);
                    console.log('this.sortData', this.sortData);
                    this.generatorCards.generateCard(this.sortData);

                    localStorage.setItem('sortData', JSON.stringify(this.sortData));
                } else {
                    const ind = object!.indexOf(filter.getAttribute(`${dataAttribute}`));
                    object!.splice(ind, 1);
                    console.log('object', object);
                    console.log('this.sortData', this.sortData);
                    this.generatorCards.generateCard(this.sortData);

                    localStorage.setItem('sortData', JSON.stringify(this.sortData));
                }
            });
        });
    }

    sortByShape():void {
        const shapeFilter = document.querySelectorAll('[data-shape]');

        this.dataAttribute = 'data-shape';
        this.sort(shapeFilter, this.sortData.shape, this.dataAttribute);
    }

    sortByColor():void {
        const colorFilter = document.querySelectorAll('[data-color]');

        this.dataAttribute = 'data-color';
        this.sort(colorFilter, this.sortData.color, this.dataAttribute);
    }

    sortBySize():void {
        const colorFilter = document.querySelectorAll('[data-size]');

        this.dataAttribute = 'data-size';
        this.sort(colorFilter, this.sortData.size, this.dataAttribute);
    }

    sortByFavorite():void {
        const favoriteToy = document.querySelector('#favorite') as HTMLInputElement;
        favoriteToy!.addEventListener('change', (): void => {
            if (favoriteToy.checked === true) {
                this.sortData.favorite!.push(true);
                this.generatorCards.generateCard(this.sortData);
                console.log('this.sortData.favorite', this.sortData.favorite);

                localStorage.setItem('sortData', JSON.stringify(this.sortData));
            } else {
                const ind = this.sortData.favorite!.indexOf(true);
                this.sortData.favorite!.splice(ind, 1);
                this.generatorCards.generateCard(this.sortData);
                console.log('this.sortData.favorite', this.sortData.favorite);

                localStorage.setItem('sortData', JSON.stringify(this.sortData));
            }
        });
    }

    searchToy():void {
        const navSearch = document.querySelector('.nav__search') as HTMLInputElement;
        navSearch!.addEventListener('input', ():void => {
            console.log('search', navSearch!.value);
            this.sortData.name = navSearch!.value.toLowerCase().trim();
            console.log('search111', this.sortData.name);
            this.generatorCards.generateCard(this.sortData);

            localStorage.setItem('sortData', JSON.stringify(this.sortData));
        });
    }

    filterMaxMin():void {
        const sort = document.querySelector('.sort') as HTMLInputElement;
        // console.log('sort', sort)
        (sort! as HTMLInputElement).addEventListener('change', (e):void => {
            console.log('target', (e.currentTarget! as HTMLInputElement).value);
            const valueSelect = (e.currentTarget! as HTMLInputElement).value;
            this.sortData.minMaxSort = valueSelect;
            // console.log('this.sortData.minMaxSort',this.sortData.minMaxSort)
            this.generatorCards.generateCard(this.sortData);

            localStorage.setItem('sortData', JSON.stringify(this.sortData));
        });
    }

    filterByNum():void {
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

                console.log('inputItems', inputItems[0].value, inputItems[1].value, Math.round(+values[0]).toString());

                this.sortData.minNum = Math.round(+values[0]).toString();
                this.sortData.maxNum = Math.round(+values[1]).toString();

                this.generatorCards.generateCard(this.sortData);
                localStorage.setItem('sortData', JSON.stringify(this.sortData));
            });
        }
    }

    filterByYear():void {
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

                console.log('inputYears', inputYears[0].value, inputYears[1].value, values);

                this.sortData.minYear = Math.round(+values[0]).toString();
                this.sortData.maxYear = Math.round(+values[1]).toString();

                this.generatorCards.generateCard(this.sortData);

                localStorage.setItem('sortData', JSON.stringify(this.sortData));
            });
        }
    }

    getAllFilters():void {
        this.sortByFavorite();
        this.sortByShape();
        this.sortByColor();
        this.sortBySize();
        this.searchToy();
        this.filterMaxMin();
        this.filterByNum();
        this.filterByYear();
    }

    filterCards(): void {
        new ControlsPanel().buildControls();
        this.getAllFilters();
        
        this.generatorCards.generateCard(this.sortData);
        // console.log('333333',document.querySelector('.toys-container'))
    //   new ToyWrapper().hiddenArrowDownWithScroll()
    //   new ToyWrapper().hiddenArrowDownWithSort()
    }
}

export default Filters;
