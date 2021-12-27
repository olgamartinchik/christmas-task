import Popup from './popupHandler';
import { containerLikeCards } from './selectionToy';
import { isRu } from './toggleLang';

class LikeCards {
    public closePopup: Popup;

    public openCards: Popup;

    constructor() {
        this.closePopup = new Popup();
        this.openCards = new Popup();
    }

    public openLikeCards(): void {
        const countSelect = document.querySelector('.count-select');
        countSelect!.addEventListener('click', (): void => {
            const message = isRu ? 'Нет избранных игрушек' : 'No favorite toys';
            this.openCards.openCards(containerLikeCards, message);
            this.closePopup.closePopup();
        });
    }
}
export default LikeCards;
