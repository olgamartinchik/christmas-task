let btnTicket = document.querySelector(".form_btn");
let popup = document.querySelector(".popup");
let popupBtn = document.querySelector(".close_btn");
let popupContainer = document.querySelector(".popup_container");

let showPopup = () => {
  if (btnTicket) {
    btnTicket.addEventListener("click", (e) => {
      console.log("click", popup);
      popup.classList.add("active");
      popupContainer.classList.add("active");
      // popupContainer.classList.remove("close");
    });
  }

  if (popupBtn) {
    popupBtn.addEventListener("click", (e) => {
      popup.classList.remove("active");
      popupContainer.classList.remove("active");
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
      popupContainer.classList.remove("active");
    }
  });
};

showPopup();
