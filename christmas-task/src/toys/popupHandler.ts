class Popup {
    closeBtn() {
        const popupBtn = document.querySelector('.popup-btn');
        popupBtn!.addEventListener('click', () => {
            const popup = document.querySelector('.popup-wrapper');
            popup!.classList.remove('active');
        });
    }

    openPopup(message: string) {
        const popup = document.querySelector('.popup-wrapper');
        popup!.classList.add('active');
        const popupTitle = document.querySelector('.popup-title');
        popupTitle!.innerHTML = '';
        popupTitle!.textContent = message;
    }

    openCards(arrayCards: string[], message: string) {
        const popup = document.querySelector('.popup-wrapper');
        const cardsContainer = document.querySelector('.cards-container');
        popup!.classList.add('active');
        cardsContainer!.innerHTML = '';

        if (arrayCards.length === 0) {
            cardsContainer!.innerHTML = message;
        } else {
            arrayCards.forEach((el) => {
                cardsContainer!.innerHTML += `${el}`;
            });
        }
    }
}
export default Popup;
