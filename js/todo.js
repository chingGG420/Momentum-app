document.addEventListener("DOMContentLoaded", function() {
    const newTodoInput = document.getElementById("new-todo-input");
    const listContainer = document.getElementById("list-container");
    const addTodoText = document.getElementById("addTodoText");
    const todoContainer = document.getElementById("todo-container");
  
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
      todoItem.textContent = todoText;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-todo");
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
      return todoItem;
    }
  
    function saveTodos() {
      const todos = [];
      listContainer.querySelectorAll(".todos").forEach(todo => {
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
  });
  
  function toggleTodoContainer() {
    const todoContainer = document.getElementById("todo-container");
    todoContainer.style.display = todoContainer.style.display === "none" ? "grid" : "none";
  }
  