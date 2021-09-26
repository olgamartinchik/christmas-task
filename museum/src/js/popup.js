let btnTicket = document.querySelector(".form_btn");
let popup = document.querySelector(".popup");
let popupBtn = document.querySelector(".close_btn");
let popupContainer = document.querySelector(".popup_container");

btnTicket.addEventListener("click", (e) => {
  popup.style.display = "block";
//   if ((popup.style.display = "block")) {
//     popupContainer.classList.remove("close");
//   }
});
popupBtn.addEventListener("click", (e) => {
 
  popup.style.display = "none";
//   if( popup.style.display = "none"){
//     popupContainer.classList.add("close");
//   }
});
window.addEventListener("click", (e) => {
  if (e.target === popup) {
   
    popup.style.display = "none";
    // if( popup.style.display = "none"){
    //     popupContainer.classList.add("close");
    //   }
  }
});
