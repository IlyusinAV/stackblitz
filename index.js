// Import stylesheets
import "./style.css";

const API_URL = "https://api.exchangeratesapi.io";
const BASE_CURR = "RUB";

const adjustNumber2 = n => (n + 100).toString().slice(-2);
const dateToString = date =>
  `${date.getFullYear()}-${adjustNumber2(date.getMonth() + 1)}-${adjustNumber2(
    date.getDate()
  )}`;

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
  rates: [{ code: "", value: "" }]
};

const cr_view = `
    Base: ${cr_model.rate_base}<br />
    Date: ${cr_model.rate_date}<br />
    <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      ${cr_model.rates
        .map(
          rate => `
            <tr>
              <td>${rate.code}</td>
              <td>${rate.value}</td>
            </tr>
          `
        )
        .join("")}
    </tbody>
    </table>
  `;

const cr_controls = dateArray
  .reverse()
  .map(date => {
    `<button rate-date='${dateToString(date)}'>${dateToString(date)}</button>`;
  })
  .join("");

const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>Currency rates</h1>`;
const controls = document.createElement("div");
appDiv.appendChild(controls);
controls.innerHTML = cr_controls;
