document.addEventListener("DOMContentLoaded", function() {
  const newTodoInput = document.getElementById("new-todo-input");
  const listContainer = document.getElementById("list-container");
  const addTodoText = document.getElementById("addTodoText");
  const todoContainer = document.getElementById("todo-container");

  // Load todo items from local storage
  loadTodos();

  // Add event listener to hide todo-container when clicking outside of it
  document.body.addEventListener("click", function(event) {
      if (!todoContainer.contains(event.target) && event.target.id !== "todo") {
          todoContainer.style.display = "none";
      }
  });

  newTodoInput.addEventListener("input", function(event) {
      const todoText = newTodoInput.value.trim();
      const hasTodos = listContainer.querySelector(".todos") !== null;
      addTodoText.style.display = todoText !== "" || hasTodos ? "none" : "block";
  });

  newTodoInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
          event.preventDefault(); // Prevent the default form submission behavior
          addNewTodo();
      }
  });

  function addNewTodo() {
      const todoText = newTodoInput.value.trim();
      if (todoText !== "") {
          const todoItem = document.createElement("div");
          todoItem.classList.add("todos");
          todoItem.textContent = todoText;

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "❌";
          deleteButton.classList.add("delete-todo");
          deleteButton.addEventListener("click", function(event) {
              event.stopPropagation(); // Stop the event from bubbling up
              const todoToRemove = event.target.parentElement;
              listContainer.removeChild(todoToRemove);
              saveTodos(); // Save todos after deleting one
              if (listContainer.querySelector(".todos") === null) {
                  addTodoText.style.display = "block"; // Show the "Add a todo to start" message if no todos left
              }
          });

          todoItem.appendChild(deleteButton);
          listContainer.appendChild(todoItem);
          saveTodos(); // Save todos after adding one

          newTodoInput.value = ""; // Clear the input field after adding the todo
          addTodoText.style.display = "none"; // Hide the "Add a todo to start" message after adding the todo
      }
  }

  // Function to save todos to local storage
  function saveTodos() {
      const todos = [];
      listContainer.querySelectorAll(".todos").forEach(todo => {
          todos.push(todo.textContent);
      });
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Function to load todos from local storage
  function loadTodos() {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
          listContainer.innerHTML = ""; // Clear the list container
          const todos = JSON.parse(savedTodos);
          todos.forEach(todoText => {
              const todoItem = document.createElement("div");
              todoItem.classList.add("todos");
              todoItem.textContent = todoText;

              const deleteButton = document.createElement("button");
              deleteButton.textContent = "❌";
              deleteButton.classList.add("delete-todo");
              deleteButton.addEventListener("click", function(event) {
                  event.stopPropagation(); // Stop the event from bubbling up
                  const todoToRemove = event.target.parentElement;
                  listContainer.removeChild(todoToRemove);
                  saveTodos(); // Save todos after deleting one
                  if (listContainer.querySelector(".todos") === null) {
                      addTodoText.style.display = "block"; // Show the "Add a todo to start" message if no todos left
                  }
              });

              todoItem.appendChild(deleteButton);
              listContainer.appendChild(todoItem);
          });
          addTodoText.style.display = listContainer.querySelector(".todos") === null ? "block" : "none";
      }
  }
});

function toggleTodoContainer() {
  const todoContainer = document.getElementById("todo-container");
  todoContainer.style.display = todoContainer.style.display === "none" ? "grid" : "none";
}
