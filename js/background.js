const imgs = ["Morning BG.jpg", "Noon BG.jpg", "Night BG.jpg"];

function setBackground() {
  const currentTime = new Date().getHours();
  let chosenImg;

  if (currentTime >= 5 && currentTime < 12) {
    chosenImg = imgs[0]; // Morning
  } else if (currentTime >= 12 && currentTime < 18) {
    chosenImg = imgs[1]; // Noon
  } else {
    chosenImg = imgs[2]; // Night
  }

  const bgImg = document.createElement("img");
  bgImg.src = `bg/${chosenImg}`;

  // Remove existing background images before adding new ones
  document.querySelectorAll("img.bg").forEach(img => img.remove());

  bgImg.classList.add("bg");
  document.body.appendChild(bgImg);
}

// Initial background setup
setBackground();

// Update background every hour
setInterval(setBackground, 3600000); // 3600000 milliseconds = 1 hour
