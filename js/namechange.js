const changeNameInput = document.querySelector("#change-name-input");
const greetingsForm = document.querySelector("#login-form");

// Function to set up the change name input based on local storage
function setupChangeNameInput() {
  const storedUsername = localStorage.getItem(USERNAME_KEY);
  if (storedUsername) {
    changeNameInput.style.display = "block";
  }
}

// Call the setup function when the page loads
setupChangeNameInput();

changeNameInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const newUsername = changeNameInput.value.trim();
    if (newUsername !== "") {
      localStorage.setItem(USERNAME_KEY, newUsername);
      greetingAction(newUsername);
    }
    changeNameInput.value = "";
    event.preventDefault();
  }
});

greetingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#name-input").value.trim();
  if (username !== "") {
    changeNameInput.style.display = "block";
    changeNameInput.focus();
    changeNameInput.blur(); // Blur the input to remove the cursor
  }
});
