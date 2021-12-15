import { target } from 'nouislider';
import ToysCard from "./toysCards"
import Popup from './popupHandler'


class SelectionToys{
    countToy:number
    data:ToysCard
    closeBtn:Popup
    openPopup:Popup
    constructor(){
        this.countToy=0
        this.data=new ToysCard()
        this.closeBtn=new Popup
        this.openPopup=new Popup
    }

async toggleSelectionCards(){
    // await this.data.getData()
    const toysContainer=document.querySelector('.toys-container') as HTMLElement
    let countSelectionCards= document.querySelector('.count-select') as HTMLElement
    toysContainer!.addEventListener('click',(e)=>{
        let target=(e.target as HTMLElement).parentNode  as HTMLDivElement 
        // let target=(e.target as HTMLElement)
        console.log('e.target',target!.closest('.toy-card'));
    if((target!.closest('.toy-card'))){
        console.log('target',target);
       target!.classList.add('active')
        
       if(this.countToy>=20){
        this.countToy=19
        target.classList.value='toy-card'

        this.openPopup.openPopup('Свободных слотов больше нет') 
       this.closeBtn.closeBtn()
    }
    this.countToy++
    countSelectionCards!.textContent=(this.countToy).toString()
    }else if(target.closest('active')){
        target.classList.remove('active')
        this.countToy--
        countSelectionCards!.textContent=(this.countToy).toString()
    }    
    })
    const toysCards=document.querySelectorAll('.toy-card') 
    // let countSelectionCards= document.querySelector('.count-select') as HTMLElement
    // console.log('toysCards',toysCards)
    // toysCards.forEach((card,ind)=>{
    //     card!.addEventListener('click',(e)=>{
    //         if(card.classList.value==='toy-card'){
    //             card.classList.add('active')                
                
    //             if(this.countToy>=20){
    //                 this.countToy=19
    //                 card.classList.value='toy-card'

    //                 this.openPopup.openPopup('Свободных слотов больше нет') 
    //                this.closeBtn.closeBtn()
    //             }
    //             this.countToy++
    //             countSelectionCards!.textContent=(this.countToy).toString()
    //         }else if(card.classList.contains('active')){
    //             card.classList.remove('active')
    //             this.countToy--
    //             countSelectionCards!.textContent=(this.countToy).toString()
    //         }        
    //     console.log('click')      
        
    // })
    // })
   
}

}
export default SelectionToys