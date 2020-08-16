const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-title").querySelector("h1");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handlesubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintgreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handlesubmit);
}

function paintgreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.innerText = `Welcome back, ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintgreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
