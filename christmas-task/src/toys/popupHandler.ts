class Popup{
    closeBtn(){
        const popupBtn=document.querySelector('.popup-btn')
        popupBtn!.addEventListener('click',()=>{
            let popup=document.querySelector('.popup-wrapper')
            popup!.classList.remove('active')
        })
    }
    openPopup(message:string){
        let popup=document.querySelector('.popup-wrapper')
        popup!.classList.add('active')
        let popupTitle=document.querySelector('.popup-title')
        popupTitle!.innerHTML=''
        popupTitle!.textContent=message
    }
    openCards(odj:HTMLElement[]){
        let popup=document.querySelector('.popup-wrapper')
        let cardsContainer=document.querySelector('.cards-container')
        popup!.classList.add('active')
        cardsContainer!.innerHTML=''
        odj.forEach(el=>{
            cardsContainer!.append(el)
        })
    }
}
export default Popup