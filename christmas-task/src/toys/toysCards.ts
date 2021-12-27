import FiltersControls from './controlsContainer';
import { SortType } from './filters';
import Popup from './popupHandler';
import { isRu } from './toggleLang';
import ToyWrapper from './toysContainerScroll';

export let isArrowDown = true;
if (localStorage.getItem('isArrowDown')) {
    isArrowDown = Boolean(localStorage.getItem('isArrowDown'));
}

export interface ICard {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
}
export type IData = [card: ICard];
type DescriptionToy = {
    [key: string]: boolean | string | undefined;
};

class ToysCard {
    public setAttributes: FiltersControls;

    public descriptionArray: DescriptionToy | null;

    public closeBtn: Popup;

    public openPopup: Popup;

    constructor() {
        this.descriptionArray = null;
        this.setAttributes = new FiltersControls();
        this.closeBtn = new Popup();
        this.openPopup = new Popup();
    }

    public async getData(): Promise<IData> {
        let url: string | null = null;
        if (isRu) {
            url = '../data.json';
        } else {
            url = '../dataEn.json';
        }

        const res = await fetch(url);
        const data = await res.json();
        return data;
    }

    private createCards(card: ICard): HTMLDivElement {
        let numLikeCards: string[] | null = null;
        if (localStorage.getItem('numLikeCards')) {
            numLikeCards = JSON.parse(localStorage.getItem('numLikeCards')!);
        }

        this.descriptionArray = isRu
            ? {
                  'Количество:': `${card.count}`,
                  'Год покупки:': `${card.year}`,
                  'Форма:': `${card.shape}`,
                  'Цвет:': `${card.color}`,
                  'Размер:': `${card.size}`,
                  'Любимая:': `${card.favorite === false ? 'нет' : 'да'}`,
              }
            : {
                  'Number:': `${card.count}`,
                  'Year:': `${card.year}`,
                  'Shape:': `${card.shape}`,
                  'Color:': `${card.color}`,
                  'Size:': `${card.size}`,
                  'Favorite:': `${card.favorite === false ? 'no' : 'yes'}`,
              };

        const toyCard = document.createElement('div');
        this.setAttributes.setAttributes(toyCard, {
            class: ` animate__animated animate__fadeInDown toy-card ${
                numLikeCards?.includes(card.num) ? 'active' : ''
            }`,
            'data-num-toy': `${card.num}`,
        });
        const h2 = document.createElement('h2');
        h2.classList.add('toy-card__title');
        h2.textContent = `${card.name}`;
        const img = document.createElement('img') as HTMLElement;
        this.setAttributes.setAttributes(img, {
            class: 'toy-card__image',
            src: `./assets/toys/${card.num}.png`,
            alt: 'toy',
        });
        const ul = document.createElement('ul');
        ul.classList.add('toy-card__description');
        for (const description in this.descriptionArray) {
            const li = document.createElement('li');
            li.textContent = `${description} ${this.descriptionArray[description]!}`;
            ul.appendChild(li);
        }
        const toyCardLike = document.createElement('div');
        toyCardLike.classList.add('toy-card__like');
        toyCard.append(h2, img, ul, toyCardLike);

        return toyCard;
    }

    public async buildCards(selector: HTMLElement, filterData: SortType): Promise<HTMLElement> {
        const data = await this.getData();
        let toyCard: HTMLDivElement;
        if (filterData.minMaxSort) {
            if (filterData.minMaxSort === 'name-max') {
                data.sort((a, b) => a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0));
            }
            if (filterData.minMaxSort === 'name-mim') {
                data.sort((a, b) => b.name.toLowerCase().charCodeAt(0) - a.name.toLowerCase().charCodeAt(0));
            }
            if (filterData.minMaxSort === 'count-max') {
                data.sort((a, b) => +a.count - +b.count);
            }
            if (filterData.minMaxSort === 'count-min') {
                data.sort((a, b) => +b.count - +a.count);
            }
        }

        data.forEach((card) => {
            if (
                !filterData.favorite &&
                !filterData.shape &&
                !filterData.color &&
                !filterData.size &&
                !filterData.name
            ) {
                toyCard = this.createCards(card);
                selector.appendChild(toyCard);
            } else {
                if (
                    (filterData.favorite!.length === 0 || filterData.favorite!.includes(card.favorite)) &&
                    (filterData.shape!.length === 0 || filterData.shape!.includes(card.shape)) &&
                    (filterData.color!.length === 0 || filterData.color!.includes(card.color)) &&
                    (filterData.size!.length === 0 || filterData.size!.includes(card.size)) &&
                    (!filterData.name || card.name.toLowerCase().includes(filterData.name)) &&
                    +card.count >= +filterData.minNum! &&
                    +card.count <= +filterData.maxNum! &&
                    +card.year >= +filterData.minYear! &&
                    +card.year <= +filterData.maxYear!
                ) {
                    toyCard = this.createCards(card);
                    selector.appendChild(toyCard);
                }
            }
        });
        if (selector.innerHTML === '') {
            selector.innerHTML = `<div class="animate__animated animate__fadeInDown popup-title cards-container">${
                isRu ? 'Извините, совпадений не обнаружено' : 'Sorry, no matches found'
            }</div>`;
            isArrowDown = false;
            localStorage.setItem('isArrowDown', JSON.stringify(isArrowDown));
            new ToyWrapper().hiddenArrowDown();
            if (document.hasFocus() as boolean) {
                (document.querySelector('.nav__search') as HTMLInputElement).blur();
            }
        } else {
            isArrowDown = true;
            localStorage.setItem('isArrowDown', JSON.stringify(isArrowDown));
            new ToyWrapper().hiddenArrowDown();
        }
        return selector;
    }
}

export default ToysCard;
