
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
        console.log('222222222',document.querySelector('.toys-container'))
        if(toysContainer){
                 console.log("scrollHeight==='clientHeight'",toysContainer.scrollHeight ===Math.round(toysContainer.scrollTop +toysContainer.clientHeight) )
        console.log("scrollHeight==='clientHeight'",toysContainer.scrollHeight,toysContainer.offsetHeight )
        }
          
       
  
       
    }
}
export default ToyWrapper


