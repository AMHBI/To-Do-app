const taskInput = document.getElementById("to-do-name");
const dateInput = document.getElementById("to-do-date");
const addButton = document.getElementById("add-button");
const deleteAll = document.getElementById("delete-all-button");
const alertContainer = document.getElementById("alert");
const alertTag = alertContainer.children[0];
const todosBody = document.querySelector("tbody");

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
const showTodos = () => {
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found</td></tr>";
  }
  todos.forEach((todo) => {
    todosBody.innerHTML += `
        <tr>
            <td>${todo.task}</td>
            <td>${todo.date || "No Date Seted"}</td>
            <td>${todo.isCompleted ? "Completed" : "Pending"}</td>
            <td>
            <button onclick='editHandler(${todo.id})'>Edit</button>
            <button onclick='completeStatusHandler(${todo.id})'>
                ${todo.isCompleted ? "Undo" : "Do"}
            </button>
            <button onclick='deleteTodoHandler(${todo.id})'>Delete</button>
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
    id: generateId(),
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
const completeStatusHandler = (id) =>{
    const todo = todos.find((todo)=> todo.id === id);
    todo.isCompleted = !todo.isCompleted
    saveToLocalStorage()
    showTodos()
    showAlert("Status Changed Successfully","success")
}
window.addEventListener("load", showTodos);
addButton.addEventListener("click", addHandler);
deleteAll.addEventListener("click", deleteAllHandler);
