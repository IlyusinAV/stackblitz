// Import stylesheets
import "./style.css";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>Currency rates</h1>`;
const dateNow = new Date();
const dateButton = document.createElement("button");
dateButton.setAttribute("class", "app__button");
const buttonName =
  dateNow.getFullYear() + "-" + dateNow.getMonth() + "-" + dateNow.getDate();
dateButton.innerHTML = buttonName;
appDiv.appendChild(dateButton);
