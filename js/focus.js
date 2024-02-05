document.addEventListener("DOMContentLoaded", () => {
    const focusInput = document.querySelector("#focus-form input");
    const focusContainer = document.getElementById("focus-container");
    const focusPlaceholder = "What is your focus today?";

    // Load focus item from localStorage
    let savedFocusItem = JSON.parse(localStorage.getItem("focusItem"));

    // Render focus item from localStorage
    if (savedFocusItem) {
        renderFocusItem(savedFocusItem);
        updatePlaceholder(savedFocusItem.text);
    }

    focusInput.addEventListener("focus", () => {
        if (focusInput.value.trim() === "") {
            updatePlaceholder("");
        }
    });

    focusInput.addEventListener("blur", () => {
        if (focusInput.value.trim() === "") {
            updatePlaceholder(focusPlaceholder);
        }
    });

    document.getElementById("focus-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const inputValue = focusInput.value.trim();

        if (inputValue !== "") {
            // Create a new focus item
            const focusItem = { text: inputValue, id: Date.now() };

            // Render and replace the focus item
            renderFocusItem(focusItem);
            updatePlaceholder("");

            // Save focus item to localStorage
            localStorage.setItem("focusItem", JSON.stringify(focusItem));

            // Clear the input field
            focusInput.value = "";
        }
    });

    function renderFocusItem(item) {
        // Clear existing focus item
        focusContainer.innerHTML = "";

        const focusItem = document.createElement("div");
        focusItem.textContent = item.text;
        focusItem.classList.add("focus-item");
        focusContainer.appendChild(focusItem);
    }

    function updatePlaceholder(text) {
        focusInput.placeholder = text || focusPlaceholder;
    }

    // Reset placeholder on page load
    window.addEventListener("load", () => {
        updatePlaceholder(focusPlaceholder);
    });
});
