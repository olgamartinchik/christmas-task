export let shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

export let addRandomGallery = () => {
  // console.log("hello");
  let dataImagesGallery = [
    "galery1.jpg",
    "galery2.jpg",
    "galery3.jpg",
    "galery4.jpg",
    "galery5.jpg",
    "galery6.jpg",
    "galery7.jpg",
    "galery8.jpg",
    "galery9.jpg",
    "galery10.jpg",
    "galery11.jpg",
    "galery12.jpg",
    "galery13.jpg",
    "galery14.jpg",
    "galery15.jpg",
  ];

  shuffle(dataImagesGallery);

  let galeryContainer = document.querySelector(".gallery_inner_container");
  // console.log(galeryContainer);
  dataImagesGallery.map((img) => {
    // console.log(typeof img);
    let image = document.createElement("img");
    image.classList.add("gallery_img");
    image.src = `src/assets/img/galery/${img}`;
    image.alt = `${img}`;
    galeryContainer.append(image);
  });
};

addRandomGallery();
