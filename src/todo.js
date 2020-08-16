const todoform = document.querySelector(".js-Todo"),
  todoinput = todoform.querySelector("input"),
  todolist = document.querySelector(".todolist");

const TODOS_LS = "todos";

let todos = [];

function deletetodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todolist.removeChild(li);
  const cleantodos = todos.filter(function (todo) {
    return todo.id !== parseInt(li.id, 10);
  });
  todos = cleantodos;
  savetodo();
}

function savetodo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function painttodo(text) {
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  const span = document.createElement("span");
  const newid = todos.length + 1;
  delbtn.innerText = "❌";
  delbtn.addEventListener("click", deletetodo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delbtn);
  li.id = newid;
  todolist.appendChild(li);
  const todoObj = {
    id: newid,
    text: text
  };
  todos.push(todoObj);
  savetodo();
}

function handlesubmit(event) {
  event.preventDefault();
  const currentValue = todoinput.value;
  painttodo(currentValue);
  todoinput.value = "";
}

function loadtodos() {
  const loadedtodos = localStorage.getItem(TODOS_LS);
  if (loadedtodos !== null) {
    const parsedtodos = JSON.parse(loadedtodos);
    parsedtodos.forEach(function (todo) {
      painttodo(todo.text);
    });
  }
}

function init() {
  loadtodos();
  todoform.addEventListener("submit", handlesubmit);
}

init();
