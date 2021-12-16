import Popup from './popupHandler'
import SelectionToys from './selectionToy'
import { containerLikeCards } from './selectionToy'


class LikeCards {
    closeBtn:Popup
    openCards:Popup

    constructor(){
        
        this.closeBtn=new Popup
        this.openCards=new Popup
    }
    openLikeCards(){
        const countSelect=document.querySelector('.count-select')
        countSelect!.addEventListener('click',(e)=>{
            e.preventDefault()
            e.stopPropagation()

            // this.openPopup.openPopup()
            console.log('this.likeToys',containerLikeCards)
            this.openCards.openCards(containerLikeCards, 'Нет избранных игрушек')
            this.closeBtn.closeBtn()
        })
    }

}
export default LikeCards