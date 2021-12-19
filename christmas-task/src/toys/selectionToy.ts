import ToysCard from './toysCards';
import Popup from './popupHandler';
import LikeCards from './likeCardsHandler';
import {isRu} from './toggleLang'


export let containerLikeCards: string[] = [];
if (localStorage.getItem('containerLikeCards')) {
    containerLikeCards = JSON.parse(localStorage.getItem('containerLikeCards')!);
}

export let numLikeCards: string[] = [];
if (localStorage.getItem('numLikeCards')) {
    numLikeCards = JSON.parse(localStorage.getItem('numLikeCards')!);
}
export let countToy = 0;
class SelectionToys {
    data: ToysCard;

    closeBtn: Popup;

    openPopup: Popup;

    constructor() {
        if (localStorage.getItem('numLikeCards')) {
            countToy = JSON.parse(localStorage.getItem('numLikeCards')!).length;
        }
        this.data = new ToysCard();
        this.closeBtn = new Popup();
        this.openPopup = new Popup();
    }

    toggleSelectionCards():void {
        new LikeCards().openLikeCards();

        const toysContainer = document.querySelector('.toys-container') as HTMLElement;

        const countSelectionCards = document.querySelector('.count-select') as HTMLElement;
        if (localStorage.getItem('numLikeCards')) {
            countSelectionCards.textContent = JSON.parse(localStorage.getItem('numLikeCards')!).length;
        }

        toysContainer!.addEventListener('click', (e):void => {
            console.log('numLikeCards', numLikeCards);
            // console.log('containerLikeCards',containerLikeCards)

            if ((e.target as HTMLElement).closest('.toy-card')) {
                const card = (e.target as HTMLElement).closest('.toy-card') as HTMLElement;
                //  console.log('true', card);
                if (card!.classList.contains('toy-card') && !card!.classList.contains('active')) {
                    card!.classList.add('active');

                    numLikeCards.indexOf(card.getAttribute('data-num-toy')!);
                    countToy++;
                    countSelectionCards!.textContent = countToy.toString();
                    if (countToy <= 19) {
                        containerLikeCards.push((card!.cloneNode(true) as HTMLElement).outerHTML);

                        numLikeCards!.push(card.getAttribute('data-num-toy')!);

                        // console.log('numLikeCards',numLikeCards)
                        localStorage.setItem('numLikeCards', JSON.stringify(numLikeCards));

                        localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards));
                        //  console.log('containerLikeCards',containerLikeCards)
                    }

                    if (countToy >= 20) {
                        countToy = 19;
                        card!.classList.value = 'toy-card';
                        let message=isRu?'Извините, все слоты заполнены':'Sorry, all slots are full'
                        this.openPopup.openPopup(message);
                        this.closeBtn.closeBtn();
                    }
                } else if (card!.classList.contains('active')) {
                    countToy--;
                    countSelectionCards!.textContent = countToy.toString();
                    console.log('numLikeCards', numLikeCards);
                    console.log('containerLikeCards', containerLikeCards);

                    if (numLikeCards.includes(card.getAttribute('data-num-toy')!)) {
                        const ind = numLikeCards.indexOf(card.getAttribute('data-num-toy')!);
                        numLikeCards.splice(ind, 1);
                    }

                    if (containerLikeCards.includes(card!.outerHTML)) {
                        const ind = containerLikeCards.indexOf(card!.outerHTML);
                        containerLikeCards.splice(ind, 1);
                    }
                    localStorage.setItem('numLikeCards', JSON.stringify(numLikeCards));
                    localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards));
                    card!.classList.remove('active');
                }
            }
        });
    }

    resetCount():void {
        countToy = 0;
        const countSelectionCards = document.querySelector('.count-select') as HTMLElement;
        countSelectionCards.textContent = countToy.toString();
    }
}
export default SelectionToys;
