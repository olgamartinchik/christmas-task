class Popup{
    closeBtn():void{
        const popupBtn=document.querySelector('.popup-btn')
        popupBtn!.addEventListener('click',()=>{
            let popup=document.querySelector('.popup-wrapper')
            popup!.classList.remove('active')
        })
    }
    openPopup(message:string):void{
        let popup=document.querySelector('.popup-wrapper')
        popup!.classList.add('active')
        let popupTitle=document.querySelector('.popup-title')
        popupTitle!.textContent=message
    }
}
export default Popup