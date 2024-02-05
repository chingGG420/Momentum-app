const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greetings");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const usernameLocalStorage = localStorage.getItem(USERNAME_KEY);

function handleSubmitBtnClick(event) {
  event.preventDefault();

  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  loginForm.classList.add(HIDDEN_CLASSNAME);
  greetingAction(username);
}

function greetingAction(username) {
  const currentTime = new Date().getHours();
  let greetingMessage;

  if (currentTime >= 5 && currentTime < 12) {
    greetingMessage = "Good Morning";
  } else if (currentTime >= 12 && currentTime < 18) {
    greetingMessage = "Good Afternoon";
  } else {
    greetingMessage = "Good Evening";
  }

  greeting.innerHTML = `${greetingMessage}, ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

if (usernameLocalStorage === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", handleSubmitBtnClick);
} else {
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greetingAction(usernameLocalStorage);
}