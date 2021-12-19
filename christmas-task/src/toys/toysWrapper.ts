import { isArrowDown } from "./toysCards"
 let toysWrapper=document.querySelector('.toys-wrapper') as HTMLElement
 let toysContainer=document.querySelector('.toys-container') as HTMLElement

class ToyWrapper{

    hiddenArrowDown(){       
        !isArrowDown?toysWrapper.classList.add('no-arrow'):toysWrapper.classList.remove('no-arrow')
    }
    getScrollTopToyContainer(){
        
       
        console.log('toysContainer.scrollHeight',toysContainer.scrollHeight,toysContainer.offsetHeight)
        toysContainer.addEventListener('scroll',()=>{
            console.log('toysContainer.scrollHeight',toysContainer.scrollHeight,toysContainer.offsetHeight)
            
            if(toysContainer.scrollHeight ===Math.round(toysContainer.scrollTop +toysContainer.clientHeight)){
                toysWrapper.classList.add('no-arrow')
            }else{
                toysWrapper.classList.remove('no-arrow') 
            }
        })
    }
    hiddenArrowDownWithSort(){
        let toysWrapper=document.querySelector('.toys-wrapper') as HTMLElement
        let toysContainer=document.querySelector('.toys-container') as HTMLElement
        if(Math.round(toysContainer.scrollHeight)===Math.round(toysContainer.offsetHeight) ){
                toysWrapper.classList.add('no-arrow')
            }else{
                toysWrapper.classList.remove('no-arrow')
        }
    }
}
export default ToyWrapper