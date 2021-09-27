let btnTicket = document.querySelector(".form_btn");
let popup = document.querySelector(".popup");
let popupBtn = document.querySelector(".close_btn");
let popupContainer = document.querySelector(".popup_container");
let showPopup=()=>{

  btnTicket.addEventListener("click", (e) => {
  popup.style.display = "block";
  // popupContainer.classList.add("close");
    popupContainer.classList.remove("close");
 

});
popupBtn.addEventListener("click", (e) => { 
  popup.style.display = "none";
  // if (popup.classList.contains("none")) {
    popupContainer.classList.add("close");
  // }
});
window.addEventListener("click", (e) => {
  if (e.target === popup) {   
    popup.style.display = "none";    
  }
});


}
showPopup()