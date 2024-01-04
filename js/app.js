const taskInput = document.getElementById("to-do-name");
const dateInput = document.getElementById("to-do-date");
const addButton = document.getElementById("add-button");
const alertContainer = document.getElementById("alert");
const alertTag = alertContainer.children[0];

const todos = [];
const generateId = () => {
  return Math.round(Math.random() * Math.random() * Math.pow(10, 15));
};

const saveToLocalStorage = () => {};

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

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    task,
    date,
    isCompleted: false,
  };
  console.log(todos);
  if (task) {
    todos.push(todo);
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Task added successfully", "success");
  } else {
    showAlert("Enter valid task", "error");
  }
};
addButton.addEventListener("click", addHandler);
