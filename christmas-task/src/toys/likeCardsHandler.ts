import Popup from './popupHandler';
import { containerLikeCards } from './selectionToy';
import {isRu} from './toggleLang'

class LikeCards {
    closePopup: Popup;

    openCards: Popup;

    constructor() {
        this.closePopup = new Popup();
        this.openCards = new Popup();
    }

    openLikeCards():void {
        const countSelect = document.querySelector('.count-select');
        countSelect!.addEventListener('click', ():void => {
          
            let message=isRu?'Нет избранных игрушек':'No favorite toys'
            this.openCards.openCards(containerLikeCards, message);
            this.closePopup.closePopup();
        });
    }
}
export default LikeCards;
