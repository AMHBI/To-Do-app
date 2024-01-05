const taskInput = document.getElementById("to-do-name");
const dateInput = document.getElementById("to-do-date");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const deleteAll = document.getElementById("delete-all-button");
const alertContainer = document.getElementById("alert");
const filterButtons = document.querySelectorAll(".filter-buttons");
const alertTag = alertContainer.children[0];
const todosBody = document.querySelector("tbody");
filterButtons.forEach((item) => console.log(item));
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const generateId = () => {
  return Math.round(Math.random() * Math.random() * Math.pow(10, 15));
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const showAlert = (message, type) => {
  alertTag.innerText = "";
  alertTag.classList = "";
  alertContainer.classList.add(`alert-${type}`);
  alertTag.innerText = message;
  setTimeout(() => {
    alertContainer.classList.remove(`alert-${type}`);
    alertTag.innerText = "";
  }, 3000);
};
const showTodos = (data) => {
  const todoList = data || todos;
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found</td></tr>";
  }
  todoList.forEach((todo) => {
    todosBody.innerHTML += `
        <tr>
            <td>${todo.task}</td>
            <td>${todo.date || "No Date Seted"}</td>
            <td>${todo.isCompleted ? "Completed" : "Pending"}</td>
            <td>
            <button onclick='editTodoHandler(${todo.id})'>Edit
            <img src="./assets/icons/edit.svg" />
            </button>
            <button onclick='completeStatusHandler(${todo.id})'>
                ${
                  todo.isCompleted
                    ? "Undo <img src='./assets/icons/undo.svg' />"
                    : "Do <img src='./assets/icons/checked.svg'/>"
                }
            </button>
            <button onclick='deleteTodoHandler(${todo.id})'>Delete
            <img src='./assets/icons/delete.svg' />
            </button>
            </td>
        </tr>
        `;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  showTodos();
  const todo = {
    id: +generateId(),
    task,
    date,
    isCompleted: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    showTodos();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Task added successfully", "success");
  } else {
    showAlert("Enter valid task", "error");
  }
};
const deleteAllHandler = () => {
  todos = [];
  saveToLocalStorage();
  showTodos();
  showAlert("All tasks deleted Successfully", "success");
};
const completeStatusHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  todo.isCompleted = !todo.isCompleted;
  saveToLocalStorage();
  showTodos();
  showAlert("Status Changed Successfully", "success");
};
const deleteTodoHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id != id);
  todos = newTodos;
  saveToLocalStorage();
  showTodos();
  showAlert(`Task with ID ${id} Deleted`, "warning");
};
const editTodoHandler = (id) => {
  editButton.style.display = "inline-block";
  addButton.style.display = "none";
  const todo = todos.find((todo) => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  editButton.dataset.id = id;
};
const editButtonHandler = (event) => {
  const id = event.target.dataset.id;
  const todo = todos.find((todo) => todo.id == id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  editButton.style.display = "none";
  addButton.style.display = "inline-block";
  saveToLocalStorage();
  showTodos();
  showAlert("Task Updated successfully", "success");
};
const filterHandler = (event) => {
  let filteredTodos = null;
  const filter = event.target.dataset.filter;
  switch (filter) {
    case "pending":
      filteredTodos = todos.filter((todo) => todo.isCompleted == false);
      break;
    case "completed":
      filteredTodos = todos.filter((todo) => todo.isCompleted == true);
      break;

    default:
      filteredTodos = todos;
      break;
  }

  showTodos(filteredTodos);
};
window.addEventListener("load", () => showTodos());
addButton.addEventListener("click", addHandler);
deleteAll.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", editButtonHandler);
filterButtons.forEach((btn) => {
  btn.addEventListener("click", filterHandler);
});
taskInput.addEventListener("keypress",e=>{
  if(e.code === "Enter" || e.code ==="NumpadEnter"){
    addHandler()
  }
})