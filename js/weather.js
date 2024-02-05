const API_KEY = "c2737ca1f7fbd51284b32191753b892e";

function geoSuccess(posititon) {
  const lat = posititon.coords.latitude;
  const long = posititon.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      weather.innerText = ` ${data.main.temp}° `;
      city.innerText = `${data.name} , `;
    });
}

function geoFail() {
  alert("Can't Find You. Where Are You?? ");
}

navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
