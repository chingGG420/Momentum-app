document.addEventListener("DOMContentLoaded", function() {
  const newTodoInput = document.getElementById("new-todo-input");
  const listContainer = document.getElementById("list-container");
  const addTodoText = document.getElementById("addTodoText");
  const todoContainer = document.getElementById("todo-container");
  const todoSpan = document.getElementById("todo");
  todoSpan.addEventListener("click", toggleTodoContainer);

  loadTodos();

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
      event.preventDefault();
      addNewTodo();
    }
  });

  function addNewTodo() {
    const todoText = newTodoInput.value.trim();
    if (todoText !== "") {
      const todoItem = createTodoElement(todoText);

      listContainer.appendChild(todoItem);

      saveTodos();
      newTodoInput.value = "";
      addTodoText.style.display = "none";
    }
  }

  function createTodoElement(todoText) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todos");
  
    const todoSpan = document.createElement("span");
    todoSpan.textContent = todoText;
    todoItem.appendChild(todoSpan);
  
    // Check if delete button already exists before appending
    if (todoItem.querySelector(".delete-todo") === null) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-todo");
      deleteButton.textContent = "❌";
      deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();
        const todoToRemove = event.target.parentElement;
        listContainer.removeChild(todoToRemove);
        saveTodos();
        if (listContainer.querySelector(".todos") === null) {
          addTodoText.style.display = "block";
        }
      });
      todoItem.appendChild(deleteButton);
    }
  
    return todoItem;
  }
  
  function saveTodos() {
    const todos = [];
    listContainer.querySelectorAll(".todos span").forEach(todo => {
      todos.push(todo.textContent);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  

  function loadTodos() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      listContainer.innerHTML = "";
      const todos = JSON.parse(savedTodos);
      todos.forEach(todoText => {
        const todoItem = createTodoElement(todoText);
        listContainer.appendChild(todoItem);
      });
      addTodoText.style.display = listContainer.querySelector(".todos") === null ? "block" : "none";
    }
  }

  // Add delete all todos button functionality
  const deleteAllButton = document.createElement("button");
  deleteAllButton.textContent = "🗑️";
  deleteAllButton.addEventListener("click", function() {
    listContainer.innerHTML = ""; // Clear the list
    saveTodos(); // Update localStorage
    addTodoText.style.display = "block"; // Show the add todo text if list is empty
  });
  todoContainer.appendChild(deleteAllButton);
});

function toggleTodoContainer() {
  const todoContainer = document.getElementById("todo-container");
  todoContainer.style.display = todoContainer.style.display === "none" ? "grid" : "none";
}
