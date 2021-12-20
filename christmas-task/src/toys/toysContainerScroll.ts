
import { isArrowDown } from "./toysCards"

 let toysWrapper=document.querySelector('.toys-wrapper') as HTMLElement
 let toysContainer=document.querySelector('.toys-container') as HTMLElement

class ToyWrapper{

    hiddenArrowDown(){       
        !isArrowDown?toysWrapper.classList.add('no-arrow'):toysWrapper.classList.remove('no-arrow')
    }
    hiddenArrowDownWithScroll(){       
       
        toysContainer.addEventListener('scroll',()=>{
            if(toysContainer.scrollHeight ===Math.round(toysContainer.scrollTop +toysContainer.clientHeight)){
                toysWrapper.classList.add('no-arrow')
            }else{
                toysWrapper.classList.remove('no-arrow') 
            }
           
            // this.hiddenArrowDownWithSort()
        })
    }
    hiddenArrowDownWithSort(){
        let toysWrapper=document.querySelector('.toys-wrapper') as HTMLElement
        let toysContainer=document.querySelector('.toys-container') as HTMLElement
        console.log('222222222',toysContainer.childNodes.length)
        if(toysContainer){                

         if(toysContainer.childNodes.length===1||toysContainer.childNodes.length===0){
            toysWrapper.classList.add('no-arrow')
        }else{
            
            toysWrapper.classList.remove('no-arrow') 
        }

        }
          
       
  
       
    }
}
export default ToyWrapper


