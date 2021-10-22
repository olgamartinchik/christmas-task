const link = document.querySelector(".link");
const linkWrapper = document.querySelector(".link_wrapper");
const linkContainer = document.querySelector(".link_container");
const btnEdits = document.querySelectorAll(".btn_edit");
const selectBtns = document.querySelectorAll(".select_btn");
const btnNewLink = document.querySelector(".btn_new_link");
const createLink = document.querySelector(".create_link");
const closeBtn = document.querySelector(".close_btn");
const edits = document.querySelectorAll(".edit");

link.addEventListener("click", () => {
  linkWrapper.classList.add("active");
});

window.addEventListener("click", (e) => {
  if (e.target === linkWrapper) {
    linkWrapper.classList.remove("active");
  }
});
btnEdits.forEach((btn, ind) => {
  btn.addEventListener("click", (e) => {
    selectBtns.forEach((el) => {
      el.classList.remove("active");
    });
    selectBtns[ind].classList.toggle("active");
  });
});

//open form create link
btnNewLink.addEventListener("click", () => {
  createLink.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  createLink.classList.remove("active");
});
edits.forEach((edit, ind) => {
  edit.addEventListener("click", (e) => {
    createLink.classList.add("active");
    selectBtns.forEach((el) => {
      el.classList.remove("active");
    });
    // selectBtns[ind].classList.remove("active");
  });
});
