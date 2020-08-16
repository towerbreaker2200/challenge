const body = document.querySelector("body");

const IMAGE_NUMBER = 6;

function paintImage(imgnumber) {
  const image = new Image();
  image.src = `/images/${imgnumber + 1}.jpg`;
  image.classList.add("bgimage");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMAGE_NUMBER);
  return number;
}

function init() {
  const randomnumber = genRandom();
  paintImage(randomnumber);
}

init();
