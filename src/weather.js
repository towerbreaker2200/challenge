const API_KEY = "0fcb2504b3a443d9492a99c2e49c4ebe";
const weatherapikey:${{secrets.WEATHER_API_KEY}};
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

console.log(weatherapikey);

function getweather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function savecoords(coordsobj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsobj));
}

function handlegeosuc(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsobj = {
    latitude,
    longitude
  };
  savecoords(coordsobj);
  getweather(latitude, longitude);
}

function handlegeoerr() {}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handlegeosuc, handlegeoerr);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedcoords = JSON.parse(loadedCoords);
    getweather(parsedcoords.latitude, parsedcoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
