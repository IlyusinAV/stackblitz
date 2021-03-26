// Import stylesheets
import "./style.css";

// Write Javascript code!
const API_URL = "https://api.exchangeratesapi.io";
const BASE_CURR = "RUB";

const dateNow = new Date();
const dateArray = new Array(7).fill(dateNow);
for (let i = 1; i < 7; i++) {
  let date = new Date();
  date.setDate(dateNow.getDate() - i);
  dateArray[i] = date;
}

const cr_model = {
  rate_date: "",
  rate_base: "",
  rates: [{ rate: "", value: "" }]
};

const adjustNumber2 = n => (n + 100).toString().slice(-2);
const dateToString = date =>
  `${date.getFullYear()}-${adjustNumber2(date.getMonth() + 1)}-${adjustNumber2(
    date.getDate()
  )}`;

const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>Currency rates</h1>`;
const controls = document.createElement("div");
appDiv.appendChild(controls);

const dateButton = document.createElement("button");
dateButton.setAttribute("class", "app__button");
const buttonName = dateToString(dateArray[0]);
dateButton.innerHTML = buttonName;
controls.appendChild(dateButton);
