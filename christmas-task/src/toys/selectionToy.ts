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
if(localStorage.getItem('countToy')){
    countToy=JSON.parse(localStorage.getItem('countToy')!)
}
class SelectionToys {
    data: ToysCard;

    closePopup: Popup;

    openPopup: Popup;

    constructor() {
        
        this.data = new ToysCard();
        this.closePopup = new Popup();
        this.openPopup = new Popup();
    }

    toggleSelectionCards():void {
        

        // if (localStorage.getItem('containerLikeCards')) {
        //     containerLikeCards = JSON.parse(localStorage.getItem('containerLikeCards')!);
        // }

        new LikeCards().openLikeCards();

        const toysContainer = document.querySelector('.toys-container') as HTMLElement;

        const countSelectionCards = document.querySelector('.count-select') as HTMLElement;
        if (localStorage.getItem('countToy')) {
            countSelectionCards.textContent = JSON.parse(localStorage.getItem('countToy')!);
        }
        console.log('containerLikeCards!!!!!',containerLikeCards)

        toysContainer!.addEventListener('click', (e):void => {
            // console.log('numLikeCards', numLikeCards);
            // console.log('containerLikeCards',containerLikeCards)

            if ((e.target as HTMLElement).closest('.toy-card')) {
                const card = (e.target as HTMLElement).closest('.toy-card') as HTMLElement;
                //  console.log('card', card);
                if (card!.classList.contains('toy-card') && !card!.classList.contains('active')) {
                    card!.classList.add('active');

                    numLikeCards.indexOf(card.getAttribute('data-num-toy')!);
                    countToy++;                   
                    localStorage.setItem('countToy', JSON.stringify(countToy));
                    
                    if(countToy>=21){
                        countToy = 20;
                        localStorage.setItem('countToy', JSON.stringify(countToy));
                        card!.className = 'toy-card'
                          card!.classList.value = 'toy-card';
                        let message=isRu?'Извините, все слоты заполнены':'Sorry, all slots are full'
                        this.openPopup.openPopup(message);
                        this.closePopup.closePopup();

                        
                    }else{
                        countSelectionCards!.textContent = countToy.toString();
                        numLikeCards!.push(card.getAttribute('data-num-toy')!);
                        console.log('card', card,(card!.cloneNode(true) as HTMLElement).outerHTML);
                         containerLikeCards.push((card!.cloneNode(true) as HTMLElement).outerHTML);
                        console.log('containerLikeCards push',containerLikeCards)

                        console.log('numLikeCards',numLikeCards)
                        localStorage.setItem('numLikeCards', JSON.stringify(numLikeCards));
                        localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards));
                    }
                    
                    console.log('countToy',countToy)                   
                   
                   
                  
                } else if (card!.classList.contains('active')) {
                    let cloneCard=(card!.cloneNode(true) as HTMLElement).outerHTML
                    console.log('yes')
                    countToy--;
                    localStorage.setItem('countToy', JSON.stringify(countToy));
                    // console.log('countToy',countToy)
                    countSelectionCards!.textContent = countToy.toString();
                    // console.log('numLikeCards', numLikeCards);
                    console.log('containerLikeCards', containerLikeCards);

                    if (numLikeCards.includes(card.getAttribute('data-num-toy')!)) {
                        const ind = numLikeCards.indexOf(card.getAttribute('data-num-toy')!);
                        numLikeCards.splice(ind, 1);
                        // console.log('numLikeCards', numLikeCards);
                    }
                    
                    if (containerLikeCards.includes(cloneCard)) {
                        console.log('true',card,cloneCard)
                        
                        const ind = containerLikeCards.indexOf(cloneCard);
                        console.log('containerLikeCards ind',ind)
                        containerLikeCards.splice(ind, 1);
                        console.log('containerLikeCards splice',containerLikeCards)
                        localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards));
                        
                    }else{
                        console.log('false',card,cloneCard)
                        const ind = containerLikeCards.indexOf(cloneCard);
                        console.log('containerLikeCards ind',ind)
                        containerLikeCards.splice(ind, 1);
                        console.log('containerLikeCards splice',containerLikeCards)
                        localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards));
                    }
                   
                    localStorage.setItem('numLikeCards', JSON.stringify(numLikeCards), );
                   
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
