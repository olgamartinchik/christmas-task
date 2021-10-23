const link = document.querySelector(".link");
const linkWrapper = document.querySelector(".link_wrapper");
const linkContainer = document.querySelector(".link_container");

const selectBtns = document.querySelectorAll(".select_btn");
const btnNewLink = document.querySelector(".btn_new_link");
const createLink = document.querySelector(".create_link");
const closeBtn = document.querySelector(".close_btn");
///
const edits = document.querySelectorAll(".edit");
const deleteLinks = document.querySelectorAll(".delete");
///
const btnEdits = document.querySelectorAll(".btn_edit");
const createBtn = document.querySelector(".create_btn");

const userLinks = document.querySelectorAll(".user_link");
const nameError = document.querySelector(".name_error");
const linkError = document.querySelector(".link_error");
const nameLink = document.querySelector(".name_link");
const userNewLink = document.querySelector(".user_new_link");

let localLinks;

link.addEventListener("click", () => {
  linkWrapper.classList.add("active");
});

window.addEventListener("click", (e) => {
  if (e.target === linkWrapper) {
    linkWrapper.classList.remove("active");
  }
});
// create new link
createBtn.addEventListener("click", addNewLink);
function addNewLink() {
  const newLinks = document.querySelector(".new_links");
  const nameLink = document.querySelector(".name_link");
  const userNewLink = document.querySelector(".user_new_link");
  if (nameLink.value === "") {
    nameError.textContent = "fill in the field";
  }
  if (userNewLink.value === "") {
    linkError.textContent = "fill in the field";
  }
  const li = document.createElement("li");
  li.classList.add("user_link");
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

btnEdits.forEach((btn, ind) => {
  btn.addEventListener("click", (e) => {
    console.log("click");
    if (e.target === selectBtns[ind]) {
      selectBtns[ind].classList.toggle("active");
    }
  });
});

deleteLinks.forEach((btn, ind) => {
  btn.addEventListener("click", () => {
    userLinks[ind].remove();
    toLocal();
  });
});

edits.forEach((edit, ind) => {
  edit.addEventListener("click", (e) => {
    createLink.classList.add("active");
  });
});

//open form create link

btnNewLink.addEventListener("click", () => {
  createLink.classList.add("active");
});
function addCloseBtn() {
  createLink.classList.remove("active");
  nameError.innerHTML = "";
  linkError.innerHTML = "";
  selectBtns.forEach((el) => {
    if (el.classList.contains("active")) el.classList.remove("active");
  });
}
closeBtn.addEventListener("click", addCloseBtn);

if (createLink.classList.contains("active")) {
  // selectBtns.forEach((el) => {
  //   if (el.classList.contains("active")) el.classList.remove("active");
  // });
}

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
