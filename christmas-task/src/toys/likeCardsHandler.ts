import Popup from './popupHandler';
import { containerLikeCards } from './selectionToy';

class LikeCards {
    closeBtn: Popup;

    openCards: Popup;

    constructor() {
        this.closeBtn = new Popup();
        this.openCards = new Popup();
    }

    openLikeCards():void {
        const countSelect = document.querySelector('.count-select');
        countSelect!.addEventListener('click', ():void => {
            // console.log('this.likeToys',containerLikeCards)
            this.openCards.openCards(containerLikeCards, 'Нет избранных игрушек');
            this.closeBtn.closeBtn();
        });
    }
}
export default LikeCards;
