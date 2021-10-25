const link = document.querySelector(".link");
const linkWrapper = document.querySelector(".link_wrapper");
const linkContainer = document.querySelector(".link_container");

const selectBtns = document.querySelectorAll(".select_btn");
const btnNewLink = document.querySelector(".btn_new_link");
const createLink = document.querySelector(".create_link");
const closeBtn = document.querySelector(".close_btn");

const edits = document.querySelectorAll(".edit");
const deleteLinks = document.querySelectorAll(".delete");

const btnEdits = document.querySelectorAll(".btn_edit");
const createBtn = document.querySelector(".create_btn");
const createBtn2 = document.querySelector(".create_btn2");

const userLinks = document.querySelectorAll(".user_link");
const nameError = document.querySelector(".name_error");
const linkError = document.querySelector(".link_error");
const nameLink = document.querySelector(".name_link");
const userNewLink = document.querySelector(".user_new_link");
/// translate popup links
const titleNameLink = document.querySelector(".title_name_link");
const titleNewLink = document.querySelector(".title_new_link");
const titleBtnNewLink = document.querySelector(".title_btn_new_link");
const en = document.querySelector(".en");
const newLinks = document.querySelector(".new_links");

let localLinks;

link.addEventListener("click", () => {
  linkWrapper.classList.add("active");
});

window.addEventListener("click", (e) => {
  if (e.target === linkWrapper) {
    linkWrapper.classList.remove("active");
  }
});
function getActionEdit(e) {
  console.log("click");
  if (e.target.classList.contains("delete")) {
    e.target.parentNode.parentNode.parentNode.remove();
  }
  if (e.target.classList.contains("edit")) {
    createLink.classList.add("active");
    createBtn2.classList.add("active");
    console.log("indParent", e.target.parentNode.parentNode.parentNode);
    let parent = e.target.parentNode.parentNode.parentNode;
    let ind = e.target.parentNode.parentNode.parentNode.id;
    console.log("child", ind);
    nameLink.value = parent.querySelector("p").textContent;
    userNewLink.value = parent.querySelector("a").href;
    createBtn2.addEventListener("click", (e) => {
      const selectBtns = document.querySelectorAll(".select_btn");

      if (parent) {
        let a = parent.querySelector("a");
        let img = parent.querySelector("img");
        let p = parent.querySelector("p");
        a.href = parent.value;
        img.src = `http://www.google.com/s2/favicons?domain=${userNewLink.value}`;
        p.textContent = nameLink.value;
        console.log("ind", ind);
      }
      if (selectBtns[ind].classList.contains("active")) {
        selectBtns[ind].classList.remove("active");
      }
      toLocal();
      createLink.classList.remove("active");
      createBtn2.classList.remove("active");
    });
  }
}
newLinks.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn_edit")) {
    // let li = e.target.parentNode;
    // li.remove();
    e.target.childNodes[0].classList.toggle("active");

    e.target.childNodes[0].addEventListener("click", getActionEdit);
  }
});

// create new link
let i = 0;
createBtn.addEventListener("click", addNewLink);
function addNewLink() {
  const newLinks = document.querySelector(".new_links");
  const nameLink = document.querySelector(".name_link");
  const userNewLink = document.querySelector(".user_new_link");

  if (nameLink.value === "") {
    if (en.classList.contains("ru")) {
      nameError.textContent = "заполните поле";
    } else {
      nameError.textContent = "fill in the field";
    }
  }
  if (userNewLink.value === "") {
    if (en.classList.contains("ru")) {
      linkError.textContent = "заполните поле";
    } else {
      linkError.textContent = "fill in the field";
    }
  }
  const li = document.createElement("li");
  li.classList.add("user_link");
  li.id = i++;
  const a = document.createElement("a");
  a.href = userNewLink.value;
  const img = document.createElement("img");
  img.src = `http://www.google.com/s2/favicons?domain=${userNewLink.value}`;
  img.alt = "icon";
  const p = document.createElement("p");
  p.textContent = nameLink.value;
  a.append(img);
  a.append(p);
  const divContainer = document.createElement("div");
  divContainer.classList.add("btn_edit");
  const div = document.createElement("div");
  div.classList.add("select_btn");
  const spanEdit = document.createElement("span");
  spanEdit.classList.add("edit");
  spanEdit.textContent = "edit";
  const spanDelete = document.createElement("span");
  spanDelete.classList.add("delete");
  spanDelete.textContent = "delete";
  div.append(spanEdit);
  div.append(spanDelete);
  divContainer.append(div);

  li.append(a);
  li.append(divContainer);
  toLocal();
  if (nameLink.value !== "" && userNewLink.value !== "") {
    createLink.classList.remove("active");
    newLinks.append(li);
    toLocal();
  }
  nameLink.value = "";
  userNewLink.value = "";
}

// btnEdits.forEach((btn, ind) => {
//   btn.addEventListener("click", (e) => {
//     console.log("click");
//     if (e.target === selectBtns[ind]) {
//       selectBtns[ind].classList.toggle("active");
//     }
//   });
// });

// deleteLinks.forEach((btn, ind) => {
//   btn.addEventListener("click", () => {
//     userLinks[ind].remove();
//     toLocal();
//   });
// });

// edits.forEach((edit, ind) => {
//   edit.addEventListener("click", (e) => {
//     createLink.classList.add("active");
//   });
// });

//open form create link
btnNewLink.addEventListener("click", () => {
  nameLink.value = "";
  userNewLink.value = "";
  createLink.classList.add("active");
});
function addCloseBtn() {
  nameLink.value = "";
  userNewLink.value = "";
  const selectBtns = document.querySelectorAll(".select_btn");
  createLink.classList.remove("active");
  nameError.innerHTML = "";
  linkError.innerHTML = "";
  selectBtns.forEach((el) => {
    if (el.classList.contains("active")) el.classList.remove("active");
  });
}
closeBtn.addEventListener("click", addCloseBtn);

nameLink.addEventListener("focus", () => {
  nameError.innerHTML = "";
});

userNewLink.addEventListener("focus", () => {
  linkError.innerHTML = "";
});

function toLocal() {
  const newLinks = document.querySelector(".new_links");
  localLinks = newLinks.innerHTML;
  localStorage.setItem("localLinks", localLinks);
}
window.addEventListener("beforeunload", toLocal);
function getLocalLinks() {
  const newLinks = document.querySelector(".new_links");
  if (localStorage.getItem("localLinks")) {
    newLinks.innerHTML = localStorage.getItem("localLinks");
  }
}

window.addEventListener("load", getLocalLinks);

/// translate popup links
const stateLinks = [
  {
    language: "en",
    titleBtnNewLink: "New Link",
    titleNameLink: "name",
    titleNewLink: "link",
    createBtn: "Create",
  },
  {
    language: "ru",
    titleBtnNewLink: "Новая ссылка",
    titleNameLink: "имя",
    titleNewLink: "ссылка",
    createBtn: "Создать",
  },
];

export function getTranslateLinkPopup() {
  let ind = 0;
  if (en.classList.contains("ru")) {
    ind = 1;
  }
  titleBtnNewLink.textContent = stateLinks[ind].titleBtnNewLink;
  titleNameLink.textContent = stateLinks[ind].titleNameLink;
  titleNewLink.textContent = stateLinks[ind].titleNewLink;
  createBtn.textContent = stateLinks[ind].createBtn;
}
getTranslateLinkPopup();
