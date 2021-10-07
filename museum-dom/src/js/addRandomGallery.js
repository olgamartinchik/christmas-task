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
    image.classList.add("gallery_img");
    image.src = `src/assets/img/galery/${img}`;
    image.alt = `${img}`;
    galeryContainer.append(image);
  });
};

addRandomGallery();
