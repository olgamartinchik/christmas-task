
import Filters from "./filters";
import SelectionToys, { containerLikeCards,numLikeCards, countToy } from './selectionToy'


class LocalMemory {
    resetCount:SelectionToys;
      constructor(){
            this.resetCount=new SelectionToys
        }

    cleanMemory():void{
        const controlsPanel=document.querySelector('.toys-page__controls') as HTMLElement
        controlsPanel!.addEventListener('click', (e)=>{
            if(((e.target as HTMLElement).closest )('.memory-button')){
                console.log('click')
                this.cleanLocalStorage() 
                new Filters().filterCards()
                this.resetCountToys()

            }
        })
       
    }
    cleanLocalStorage(){
        if(localStorage.getItem('sortData')){
            localStorage.removeItem('sortData')
        }
        if(localStorage.getItem('numLikeCards')){
            localStorage.removeItem('numLikeCards')
        }
        if(localStorage.getItem('containerLikeCards')){
            localStorage.removeItem('containerLikeCards')
        }
    }
    resetCountToys(){
        console.log('this.countToy',countToy)
        let countSelectionCards= document.querySelector('.count-select') as HTMLElement
        this.resetCount.resetCount()
        //  countToy=0
        containerLikeCards.length=0
        numLikeCards.length=0
        countSelectionCards.textContent=(countToy).toString()
        console.log('this.countToy',countToy)
    }

}
export default LocalMemory