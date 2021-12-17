import { target } from 'nouislider';
import ToysCard from "./toysCards"
import Popup from './popupHandler'
import LikeCards from './likeCardsHandler';
//  let containerLikeCards:HTMLElement[]=[]

export let containerLikeCards:string[]=[]
if(localStorage.getItem("containerLikeCards")){
    containerLikeCards=JSON.parse(localStorage.getItem("containerLikeCards")!)
}

export let numLikeCards:string[]=[]
if(localStorage.getItem("numLikeCards")){
    numLikeCards=JSON.parse(localStorage.getItem("numLikeCards")!)
}

class SelectionToys{
    countToy:number
    data:ToysCard
    closeBtn:Popup
    openPopup:Popup


    constructor(){
        this.countToy=0
        if(localStorage.getItem("numLikeCards")){
            this.countToy=JSON.parse(localStorage.getItem("numLikeCards")!).length
        }
        this.data=new ToysCard()
        this.closeBtn=new Popup
        this.openPopup=new Popup
    }

 toggleSelectionCards(){
   new LikeCards().openLikeCards()

    const toysContainer=document.querySelector('.toys-container') as HTMLElement
    
    let countSelectionCards= document.querySelector('.count-select') as HTMLElement
    // if(localStorage.getItem("numLikeCards")){
    //     countSelectionCards.textContent=JSON.parse(localStorage.getItem("numLikeCards")!).length
    // }
    // countSelectionCards.textContent=(this.countToy).toString()
    toysContainer!.addEventListener('click',(e)=>{
console.log('this.countToy',this.countToy)
   
       
     if((e.target as HTMLElement).closest('.toy-card')){
         let card =(e.target as HTMLElement).closest('.toy-card') as HTMLElement
        //  console.log('true', card);
         if(card!.classList.contains('toy-card')&&!card!.classList.contains('active')){
            card!.classList.add('active')
            this.countToy++
            countSelectionCards!.textContent=(this.countToy).toString()
            if(this.countToy<=19){
                containerLikeCards.push((card!.cloneNode(true) as HTMLElement).outerHTML)

                numLikeCards!.push(card.getAttribute('data-num-toy')!)

                // console.log('numLikeCards',numLikeCards)
                localStorage.setItem('numLikeCards', JSON.stringify(numLikeCards))
                
                localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards))
                //  console.log('containerLikeCards',containerLikeCards)
            }
            
            if(this.countToy>=20){
                this.countToy=19
                card!.classList.value='toy-card'
            
                this.openPopup.openPopup('Извините, все слоты заполнены') 
                this.closeBtn.closeBtn()
            }
            
           

         }else if(card!.classList.contains('active')){
            this.countToy--
            countSelectionCards!.textContent=(this.countToy).toString()

                if(numLikeCards.includes(card.getAttribute('data-num-toy')!)){
                    numLikeCards.splice(numLikeCards.indexOf(card.getAttribute('data-num-toy')!,1))
                   
                    // console.log('numLikeCards!!!!',numLikeCards)
                }
                
           
            if(containerLikeCards.includes(card!.outerHTML)){
                let ind=containerLikeCards.indexOf(card!.outerHTML)
                // this.likeToys.splice(ind,1)
                // console.log('containerLikeCards',containerLikeCards)
                containerLikeCards.splice(ind,1);
                
            }
            localStorage.setItem('numLikeCards', JSON.stringify(numLikeCards))
            localStorage.setItem('containerLikeCards', JSON.stringify(containerLikeCards))
            card!.classList.remove('active')
          
         }
     }

    })
   
}

}
export default SelectionToys