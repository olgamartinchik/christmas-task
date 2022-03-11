import ToysCard from './toysCards';
import Popup from './popupHandler';
import LikeCards from './likeCardsHandler';
import { isRu } from './toggleLang';
import UserToys from '../tree/userToys';

export let containerLikeCards: string[] = [];
if (localStorage.getItem('containerLikeCards')) {
    containerLikeCards = JSON.parse(localStorage.getItem('containerLikeCards')!);
}

export let numLikeCards: string[] = [];
if (localStorage.getItem('numLikeCards')) {
    numLikeCards = JSON.parse(localStorage.getItem('numLikeCards')!);
}
export let countToy = 0;
if (localStorage.getItem('countToy')) {
    countToy = JSON.parse(localStorage.getItem('countToy')!);
}

class SelectionToys {
    public data: ToysCard;

    public closePopup: Popup;

    public openPopup: Popup;

    constructor() {
        this.data = new ToysCard();
        this.closePopup = new Popup();
        this.openPopup = new Popup();
    }

    public toggleSelectionCards(): void {
        new LikeCards().openLikeCards();
        const toysContainer = document.querySelector('.toys-container') as HTMLElement;
        const countSelectionCards = document.querySelector('.count-select') as HTMLElement;
        if (localStorage.getItem('countToy')) {
            countSelectionCards.textContent = JSON.parse(localStorage.getItem('countToy')!);
        }

        toysContainer!.addEventListener('click', (e): void => {
            if ((e.target as HTMLElement).closest('.toy-card')) {
                const card = (e.target as HTMLElement).closest('.toy-card') as HTMLElement;
                if (card!.classList.contains('toy-card') && !card!.classList.contains('active')) {
                    card!.classList.add('active');

                    numLikeCards.indexOf(card.getAttribute('data-num-toy')!);
                    countToy++;
                    localStorage.setItem('countToy', JSON.stringify(countToy));

                    if (countToy >= 21) {
                        countToy = 20;
                        localStorage.setItem('countToy', JSON.stringify(countToy));
                        card!.className = 'toy-card';
                        card!.classList.value = 'toy-card';
                        const message = isRu ? 'Извините, все слоты заполнены' : 'Sorry, all slots are full';
                        this.openPopup.openPopup(message);
                        this.closePopup.closePopup();
                    } else {
                        countSelectionCards!.textContent = countToy.toString();
                        numLikeCards!.push(card.getAttribute('data-num-toy')!);
                        containerLikeCards.push((card!.cloneNode(true) as HTMLElement).outerHTML);

                        localStorage.setItem('numLikeCards', JSON.stringify(numLikeCards));
                        localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards));
                    }
                } else if (card!.classList.contains('active')) {
                    const cloneCard = (card!.cloneNode(true) as HTMLElement).outerHTML;
                    countToy--;
                    localStorage.setItem('countToy', JSON.stringify(countToy));
                    countSelectionCards!.textContent = countToy.toString();

                    if (numLikeCards.includes(card.getAttribute('data-num-toy')!)) {
                        const ind = numLikeCards.indexOf(card.getAttribute('data-num-toy')!);
                        numLikeCards.splice(ind, 1);
                    }

                    if (containerLikeCards.includes(cloneCard)) {
                        const ind = containerLikeCards.indexOf(cloneCard);
                        containerLikeCards.splice(ind, 1);
                        localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards));
                    } else {
                        const ind = containerLikeCards.indexOf(cloneCard);
                        containerLikeCards.splice(ind, 1);
                        localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards));
                    }

                    localStorage.setItem('numLikeCards', JSON.stringify(numLikeCards));

                    card!.classList.remove('active');
                }
            }
            new UserToys().createToysContainer();
        });
    }

    public resetCount(): void {
        countToy = 0;
        const countSelectionCards = document.querySelector('.count-select') as HTMLElement;
        countSelectionCards.textContent = countToy.toString();
    }
}
export default SelectionToys;
