import { SortType } from './filters';
import { isRu } from './toggleLang';

// let optionsValue: object = isRu?{
//     'name': 'Сортировать по',
//     'name-max': 'По названию от «А» до «Я»',
//     'name-mim': 'По названию от «Я» до «А»',
//     'count-max': 'По количеству по возрастанию',
//     'count-min': 'По количеству по убыванию',
// }:{
//     'name': 'Sort by',
//     'name-max': 'By name from «A» to «Z»',
//     'name-mim': 'By name from «Z» до «А»',
//     'count-max': 'By quantity ascending',
//     'count-min': 'By quantity descending',
// };
// let formToys: object = isRu?{
//      'шар': 'ball',
//      'колокольчик': 'bell',
//      'шишка': 'cone',
//      'снежинка': 'snowflake',
//      'фигурка': 'toy'
//     }:{
//         'ball': 'ball',
//         'bell': 'bell',
//         'bump': 'cone',
//         'snowflake': 'snowflake',
//         'figure': 'toy'
//        };
// let colorsArray: string[] =isRu? ['белый', 'желтый', 'красный', 'синий', 'зелёный']:
// ['white', 'yellow', 'red', 'blue', 'green'];
// let sizeArray: string[] = isRu? ['большой', 'средний', 'малый']:['large', 'medium', 'small'];

class FiltersControls {
    containerControls: HTMLDivElement[] = [];

    localSortData: SortType;

    optionsValue: object;

    formToys: object;

    colorsArray: string[];

    sizeArray: string[];

    constructor() {
        this.containerControls = [];
        this.localSortData = {};
        if (localStorage.getItem('sortData')) {
            const localSortData = JSON.parse(localStorage.getItem('sortData')!) as SortType;
            this.localSortData.minMaxSort = localSortData!.minMaxSort;
            this.localSortData.minNum = localSortData!.minNum;
            this.localSortData.maxNum = localSortData!.maxNum;
            this.localSortData.minYear = localSortData!.minYear;
            this.localSortData.maxYear = localSortData!.maxYear;
            this.localSortData.name = localSortData!.name;
            this.localSortData.shape = localSortData!.shape;
            this.localSortData.color = localSortData!.color;
            this.localSortData.size = localSortData!.size;
            this.localSortData.favorite = localSortData!.favorite;
        }
        this.optionsValue = isRu
            ? {
                  name: 'Сортировать по',
                  'name-max': 'По названию от «А» до «Я»',
                  'name-mim': 'По названию от «Я» до «А»',
                  'count-max': 'По количеству по возрастанию',
                  'count-min': 'По количеству по убыванию',
              }
            : {
                  name: 'Sort by',
                  'name-max': 'By name from «A» to «Z»',
                  'name-mim': 'By name from «Z» до «А»',
                  'count-max': 'By quantity ascending',
                  'count-min': 'By quantity descending',
              };

        this.formToys = isRu
            ? {
                  шар: 'ball',
                  колокольчик: 'bell',
                  шишка: 'cone',
                  снежинка: 'snowflake',
                  фигурка: 'toy',
              }
            : {
                  ball: 'ball',
                  bell: 'bell',
                  bump: 'cone',
                  snowflake: 'snowflake',
                  figure: 'toy',
              };

        this.colorsArray = isRu
            ? ['белый', 'желтый', 'красный', 'синий', 'зелёный']
            : ['white', 'yellow', 'red', 'blue', 'green'];
        this.sizeArray = isRu ? ['большой', 'средний', 'малый'] : ['large', 'medium', 'small'];
    }

    setAttributes(el: HTMLElement, attribute: object): void {
        for (const key in attribute) {
            el.setAttribute(key, attribute[key]);
        }
    }

    buildControlsSort(): HTMLDivElement {
        const controlsSort = document.createElement('div');
        controlsSort.classList.add('controls', 'controls__sort');
        const titleSort = document.createElement('h2');
        titleSort.classList.add('title');
        titleSort.textContent = `${isRu ? 'Сортировать:' : 'Sort:'}`;
        const select = document.createElement('select');
        select.classList.add('sort');
        select.setAttribute('name', 'sort');
        for (const name in this.optionsValue) {
            const option = document.createElement('option');
            if (this.localSortData.minMaxSort && this.localSortData.minMaxSort === name) {
                option.selected = true;
            }
            option.setAttribute('value', `${name}`);
            option.textContent = `${this.optionsValue[name]}`;
            select.appendChild(option);
        }
        controlsSort.appendChild(titleSort);
        controlsSort.appendChild(select);
        this.containerControls.push(controlsSort);

        return controlsSort;
    }

    buildControlsForm(): HTMLDivElement {
        const controlsForm = document.createElement('div');
        controlsForm.classList.add('controls', 'controls__form');
        const titleForm = document.createElement('h2');
        titleForm.classList.add('title');
        titleForm.textContent = `${isRu ? 'Форма:' : 'Shape:'}`;
        const controlsFormToys = document.createElement('div');
        controlsFormToys.classList.add('controls__form-toys');
        for (const name in this.formToys) {
            const img = document.createElement('img');
            img.classList.add('form-toy');
            img.setAttribute(`data-shape`, `${name}`);
            if (this.localSortData.shape) {
                this.localSortData.shape.forEach((shape) => {
                    if (shape === name) {
                        img.classList.add('active');
                    }
                });
            }
            img.src = `./assets/svg/${this.formToys[name]}.svg`;
            img.alt = 'toy';
            controlsFormToys.appendChild(img);
        }
        controlsForm.appendChild(titleForm);
        controlsForm.appendChild(controlsFormToys);
        this.containerControls.push(controlsForm);
        return controlsForm;
    }

    buildControlsItems(): HTMLDivElement {
        const controlsItems = document.createElement('div');
        controlsItems.classList.add('controls', 'controls__items');
        const titleItem = document.createElement('h2');
        titleItem.classList.add('title');
        titleItem.textContent = `${isRu ? 'Количество экземпляров:' : 'Number of copies:'}`;
        const sliderItems = document.createElement('div');
        sliderItems.id = 'slider-items';
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');
        const input1 = document.createElement('input');
        if (this.localSortData.minNum) {
            input1.value = this.localSortData.minNum;
        }
        this.setAttributes(input1, {
            type: 'number',
            min: '1',
            max: '12',
            placeholder: '1',
            id: 'input-item1',
            class: 'input-range items-min',
            disabled: 'disabled',
        });
        const input2 = document.createElement('input');
        if (this.localSortData.maxNum) {
            input1.value = this.localSortData.maxNum;
        }
        this.setAttributes(input2, {
            type: 'number',
            min: '1',
            max: '12',
            placeholder: '12',
            id: 'input-item2',
            class: 'input-range items-max',
            disabled: 'disabled',
        });
        inputContainer.appendChild(input1);
        inputContainer.appendChild(input2);

        controlsItems.appendChild(titleItem);
        controlsItems.appendChild(sliderItems);
        controlsItems.appendChild(inputContainer);
        this.containerControls.push(controlsItems);
        return controlsItems;
    }

    buildControlsYears(): HTMLDivElement {
        const controlsYears = document.createElement('div');
        controlsYears.classList.add('controls', 'controls__years');
        const titleYear = document.createElement('h2');
        titleYear.classList.add('title');
        titleYear.textContent = `${isRu ? 'Год приобретения:' : 'Year of purchase:'}`;
        const sliderItems = document.createElement('div');
        sliderItems.id = 'slider-years';
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');
        const input1 = document.createElement('input');
        if (this.localSortData.minYear) {
            input1.value = this.localSortData.minYear;
        }
        this.setAttributes(input1, {
            type: 'number',
            min: '1940',
            max: '2020',
            placeholder: '1940',
            id: 'input-year1',
            class: 'input-range years-min',
            disabled: 'disabled',
        });
        const input2 = document.createElement('input');
        if (this.localSortData.maxYear) {
            input2.value = this.localSortData.maxYear;
        }
        this.setAttributes(input2, {
            type: 'number',
            min: '1940',
            max: '2020',
            placeholder: '2020',
            id: 'input-year2',
            class: 'input-range years-max',
            disabled: 'disabled',
        });
        inputContainer.appendChild(input1);
        inputContainer.appendChild(input2);

        controlsYears.appendChild(titleYear);
        controlsYears.appendChild(sliderItems);
        controlsYears.appendChild(inputContainer);
        this.containerControls.push(controlsYears);
        return controlsYears;
    }

    buildControlsColor(): HTMLDivElement {
        const controlsColors = document.createElement('div');
        controlsColors.classList.add('controls', 'controls__colors');
        const titleColor = document.createElement('h2');
        titleColor.classList.add('title');
        titleColor.textContent = `${isRu ? 'Цвет:' : 'Color:'}`;
        const controlsColorContainer = document.createElement('div');
        controlsColorContainer.classList.add('controls__colors-toys');
        this.colorsArray.forEach((color) => {
            const button = document.createElement('button');
            this.setAttributes(button, { class: 'color-btn', 'data-color': `${color}` });
            if (this.localSortData.color) {
                this.localSortData.color.forEach((dataColor) => {
                    if (dataColor === color) {
                        button.classList.add('active');
                    }
                });
            }
            controlsColorContainer.appendChild(button);
        });
        controlsColors.appendChild(titleColor);
        controlsColors.appendChild(controlsColorContainer);
        this.containerControls.push(controlsColors);
        return controlsColors;
    }

    buildControlsSize(): HTMLDivElement {
        const controlsColors = document.createElement('div');
        controlsColors.classList.add('controls', 'controls__size');
        const titleSize = document.createElement('h2');
        titleSize.classList.add('title');
        titleSize.textContent = `${isRu ? 'Размер:' : 'Size:'}`;
        const controlsSizeToys = document.createElement('div');
        controlsSizeToys.classList.add('controls__size-toys');
        this.sizeArray.forEach((size) => {
            const img = document.createElement('img');
            this.setAttributes(img, {
                'data-size': `${size}`,
                class: 'toy-size',
                src: './assets/svg/ball.svg',
                alt: 'ball',
            });
            if (this.localSortData.size) {
                this.localSortData.size.forEach((dataSize) => {
                    if (dataSize === size) {
                        img.classList.add('active');
                    }
                });
            }
            controlsSizeToys.appendChild(img);
        });
        controlsColors.appendChild(titleSize);
        controlsColors.appendChild(controlsSizeToys);
        this.containerControls.push(controlsColors);
        return controlsColors;
    }

    buildControlsFavorite(): HTMLDivElement {
        const controlsFavorite = document.createElement('div');
        controlsFavorite.classList.add('controls', 'controls__favorite');
        const titleFavorite = document.createElement('h2');
        titleFavorite.classList.add('title');
        titleFavorite.textContent = `${isRu ? 'Только любимые:' : 'Only favorite:'}`;
        const input = document.createElement('input');
        this.setAttributes(input, { type: 'checkbox', id: 'favorite', class: 'favorite-toys' });
        if (this.localSortData.favorite) {
            this.localSortData.favorite?.forEach((data) => (data ? (input!.checked = true) : (input!.checked = false)));
        }

        const label = document.createElement('label');
        this.setAttributes(label, { for: 'favorite' });

        controlsFavorite.appendChild(titleFavorite);
        controlsFavorite.appendChild(input);
        controlsFavorite.appendChild(label);
        this.containerControls.push(controlsFavorite);
        return controlsFavorite;
    }

    buildButtons(): HTMLDivElement {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('controls');
        const buttonResetFilters = document.createElement('button');
        buttonResetFilters.classList.add('reset-button');
        buttonResetFilters.textContent = `${isRu ? 'Сброс фильтров' : 'Reset filters'}`;
        buttonContainer.appendChild(buttonResetFilters);
        const buttonResetMemory = document.createElement('button');
        buttonResetMemory.classList.add('memory-button');
        buttonResetMemory.textContent = `${isRu ? 'Очистить память' : 'Clear memory'}`;
        buttonContainer.appendChild(buttonResetMemory);
        this.containerControls.push(buttonContainer);
        return buttonContainer;
    }

    buildControlsContainer(selector: HTMLElement): HTMLElement {
        this.buildControlsSort();
        this.buildControlsForm();
        this.buildControlsItems();
        this.buildControlsYears();
        this.buildControlsColor();
        this.buildControlsSize();
        this.buildControlsFavorite();
        this.buildButtons();
        this.containerControls.forEach((control) => {
            selector.appendChild(control);
        });

        return selector;
    }
}

export default FiltersControls;
