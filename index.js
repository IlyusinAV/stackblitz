// Import stylesheets
import "./style.css";

function init() {
  const API_URL = "http://apilayer.net/api";
  const ACCESS_KEY = "6d51d7496b3fc23f218071a01cc75aad";
  const BASE_CURR = "USD";

  const adjustNumber2 = n => (n + 100).toString().slice(-2);
  const dateToString = date =>
    `${date.getFullYear()}-${adjustNumber2(
      date.getMonth() + 1
    )}-${adjustNumber2(date.getDate())}`;

  const appDiv = document.getElementById("app");
  appDiv.innerHTML = `<h1>Currency rates</h1>`;

  const dateNow = new Date();
  const dateArray = new Array(7).fill("").map((_, num) => {
    const date = new Date();
    date.setDate(dateNow.getDate() - num);
    return dateToString(date);
  });
  const cr_controls = dateArray
    .reverse()
    .map(date => `<button data-date='${date}'>${date}</button>`)
    .join("");
  const controls = document.createElement("div");
  appDiv.appendChild(controls);
  controls.innerHTML = cr_controls;

  const cr_model = new Object();
  cr_model.rate_date = dateToString(dateNow);
  cr_model.rate_base = BASE_CURR;
  cr_model.get_rates = ({ target }) => {
    const dateFormatted = target.getAttribute("data-date");
    console.log(`${API_URL}/live?access_key=${ACCESS_KEY}&source=${BASE_CURR}`);
    fetch(
      `${API_URL}/${dateFormatted}?access_key=${ACCESS_KEY}&source=${BASE_CURR}`
    )
      .then(data => data.json())
      .then(view_rates);
  };

  controls.addEventListener("click", cr_model.get_rates);

  const view = document.createElement("div");
  appDiv.appendChild(view);
}

function view_rates(cr_model) {
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
  view.innerHTML = cr_view;
}

init();
