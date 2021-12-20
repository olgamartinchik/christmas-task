class Popup {
    closePopup(): void {
        const popup = document.querySelector('.popup-wrapper') as HTMLElement;
        const popupBtn = document.querySelector('.popup-btn') as HTMLElement;
        popupBtn!.addEventListener('click', () => {
            popup!.classList.remove('active');
        });
        document.addEventListener('mousedown', function (e) {
            if ((e.target as HTMLElement).closest<Element>('.popup-container') === null) {
                popup!.classList.remove('active');
            }
        });
    }

    openPopup(message: string): void {
        const popup = document.querySelector('.popup-wrapper') as HTMLElement;
        popup!.classList.add('active');
        const popupTitle = document.querySelector('.popup-title') as HTMLElement;
        popupTitle!.innerHTML = '';
        popupTitle!.textContent = message;
    }

    openCards(arrayCards: string[], message: string): void {
        const popup = document.querySelector('.popup-wrapper') as HTMLElement;
        const cardsContainer = document.querySelector('.cards-container') as HTMLElement;
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
