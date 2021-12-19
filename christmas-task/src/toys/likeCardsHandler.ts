import Popup from './popupHandler';
import { containerLikeCards } from './selectionToy';
import {isRu} from './toggleLang'

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
            let message=isRu?'Нет избранных игрушек':'No favorite toys'
            this.openCards.openCards(containerLikeCards, message);
            this.closeBtn.closeBtn();
        });
    }
}
export default LikeCards;
