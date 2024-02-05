const clock = document.querySelector("h1#clock");

function getClock() {
  const day = new Date();

  const hour = String(day.getHours()).padStart(2, "0");
  const min = String(day.getMinutes()).padStart(2, "0");
  //const sec = String(day.getSeconds()).padStart(2, "0");

  clock.innerText = `${hour}:${min} `;
}

getClock();
setInterval(getClock, 1000);
