export let shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

export let addRandomGallery = () => {
  // console.log("hello");
  let dataImagesGallery = [
    "galery1.jpeg",
    "galery2.jpeg",
    "galery3.jpeg",
    "galery4.jpeg",
    "galery5.jpeg",
    "galery6.jpeg",
    "galery7.jpeg",
    "galery8.jpeg",
    "galery9.jpeg",
    "galery10.jpeg",
    "galery11.jpeg",
    "galery12.jpeg",
    "galery13.jpeg",
    "galery14.jpeg",
    "galery15.jpeg",
  ];

  shuffle(dataImagesGallery);

  let galeryContainer = document.querySelector(".gallery_inner_container");
  // console.log(galeryContainer);
  dataImagesGallery.map((img) => {
    // console.log(typeof img);
    let image = document.createElement("img");
    image.classList.add("gallery_img", "animate_img");
    image.src = `src/assets/img/galery/${img}`;
    image.alt = `${img}`;
    galeryContainer.append(image);
  });
};

addRandomGallery();

// animation
const animateImages = document.querySelectorAll(".animate_img");

if (animateImages.length > 0) {
  window.addEventListener("scroll", animateOnScroll);
  function animateOnScroll() {
    for (let i = 0; i < animateImages.length; i++) {
      const animateImg = animateImages[i];
      const animateHeight = animateImg.offsetHeight;
      const animateOffset = offset(animateImg).top;
      const animateStart = 5;
      let animItemPoint = window.innerHeight - animateHeight / animateStart;
      if (animateHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animateStart;
      }
      if (
        scrollY > animateOffset - animItemPoint &&
        scrollY < animateOffset + animateHeight
      ) {
        animateImg.classList.add("active");
      } else {
        animateImg.classList.remove("active");
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animateOnScroll();
  }, 300);
}
