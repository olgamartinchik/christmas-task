import Popup from './popupHandler';
import { containerLikeCards } from './selectionToy';

class LikeCards {
    closeBtn: Popup;

    openCards: Popup;

    constructor() {
        this.closeBtn = new Popup();
        this.openCards = new Popup();
    }

    openLikeCards() {
        const countSelect = document.querySelector('.count-select');
        countSelect!.addEventListener('click', () => {
            // console.log('this.likeToys',containerLikeCards)
            this.openCards.openCards(containerLikeCards, 'Нет избранных игрушек');
            this.closeBtn.closeBtn();
        });
    }
}
export default LikeCards;
