const quotesApi = "https://api.breakingbadquotes.xyz/v1/quotes";

// Function to handle adding quotes
const addQuote = () => {
    const quotesDiv = document.getElementById("quotes");
    quotesDiv.contentEditable = "true"; // Make the quotes div editable
    quotesDiv.focus(); // Focus on the quotes div to allow editing
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(quotesDiv);
    selection.removeAllRanges();
    selection.addRange(range);
};

// Function to save edited quote to local storage
const saveEditedQuote = () => {
    const quotesDiv = document.getElementById("quotes");
    const editedQuote = quotesDiv.innerText;
    let customQuotes = JSON.parse(localStorage.getItem("customQuotes")) || []; // Retrieve existing quotes or initialize an empty array
    customQuotes.push(editedQuote); // Add the edited quote to the array of custom quotes
    localStorage.setItem("customQuotes", JSON.stringify(customQuotes)); // Save the updated array back to local storage
    quotesDiv.blur(); // Remove focus from the editable quote
};


// Event listener for the plus button
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Event listener to save edited quote when Enter key is pressed
document.getElementById("quotes").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default behavior (adding line break)
        saveEditedQuote();
    }
});

// Function to display quotes (including custom ones)
const displayQuotes = function () {
    let allQuotes = [];

    // Fetch Breaking bad quote
    fetch(quotesApi)
        .then(response => {
            return response.json();
        })
        .then(data => {
            allQuotes.push(data[0].quote);

            // Retrieve custom quotes from local storage
            const customQuotes = JSON.parse(localStorage.getItem("customQuotes")) || [];
            allQuotes = allQuotes.concat(customQuotes);

            // Display a random quote from all quotes
            const randomIndex = Math.floor(Math.random() * allQuotes.length);
            document.querySelector("#quotes").innerHTML = `"${allQuotes[randomIndex]}"`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
};

// Display quotes when the page loads and every minute
window.addEventListener('load', displayQuotes);
setInterval(displayQuotes, 5000);
