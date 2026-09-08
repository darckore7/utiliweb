"use strict";


/* =========================
   FUNCIONES GENERALES
========================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [
  ...document.querySelectorAll(selector)
];


/* =========================
   MODO OSCURO
========================= */

const savedTheme =
  localStorage.getItem("utiliweb-theme");

if (savedTheme) {
  document.documentElement.dataset.theme =
    savedTheme;
}

const themeButton = $("#themeToggle");

function updateThemeIcon() {

  const dark =
    document.documentElement.dataset.theme === "dark";

  themeButton.textContent =
    dark ? "☀️" : "🌙";
}

themeButton.addEventListener("click", () => {

  const current =
    document.documentElement.dataset.theme;

  const next =
    current === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme =
    next;

  localStorage.setItem(
    "utiliweb-theme",
    next
  );

  updateThemeIcon();
});

updateThemeIcon();


/* =========================
   AÑO
========================= */

$("#year").textContent =
  new Date().getFullYear();


/* =========================
   BUSCADOR
========================= */

const cards =
  $$(".tool-card");

const count =
  $("#toolCount");

const noResults =
  $("#noResults");

function updateCount(number) {

  count.textContent =
    `${number} herramienta${number === 1 ? "" : "s"}`;
}

updateCount(cards.length);


$("#toolSearch").addEventListener(
  "input",
  (event) => {

    const search =
      event.target.value
        .trim()
        .toLowerCase();

    let visible = 0;

    cards.forEach(card => {

      const matches =
        !search ||
        card.dataset.tool
          .toLowerCase()
          .includes(search);

      card.classList.toggle(
        "hidden",
        !matches
      );

      if (matches) {
        visible++;
      }

    });

    noResults.classList.toggle(
      "hidden",
      visible !== 0
    );

    updateCount(visible);
  }
);


/* =========================
   MODALES
========================= */

$$(".open-tool").forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const modal =
        document.getElementById(
          button.dataset.modal
        );

      modal.showModal();

    }
  );

});


$$(".close-modal").forEach(button => {

  button.addEventListener(
    "click",
    () => {

      button
        .closest("dialog")
        .close();

    }
  );

});


$$("dialog").forEach(dialog => {

  dialog.addEventListener(
    "click",
    event => {

      if (event.target === dialog) {
        dialog.close();
      }

    }
  );

});


$("#privacyLink").addEventListener(
  "click",
  event => {

    event.preventDefault();

    $("#privacyModal").showModal();

  }
);


/* =========================
   CALCULADORA
========================= */

let calcValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecond = false;

const calcDisplay =
  $("#calcDisplay");


function renderCalculator() {

  calcDisplay.value =
    calcValue;

}


function calculate(a, b, op) {

  const x = Number(a);
  const y = Number(b);

  if (
    !Number.isFinite(x) ||
    !Number.isFinite(y)
  ) {
    return "Error";
  }

  switch (op) {

    case "+":
      return x + y;

    case "−":
      return x - y;

    case "×":
      return x * y;

    case "÷":
      return y === 0
        ? "Error"
        : x / y;

    default:
      return y;

  }

}


$$("[data-calc]").forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const type =
        button.dataset.calc;

      const value =
        button.textContent.trim();


      if (type === "clear") {

        calcValue = "0";
        firstValue = null;
        operator = null;
        waitingForSecond = false;

      }


      else if (type === "back") {

        calcValue =
          calcValue.length > 1
            ? calcValue.slice(0, -1)
            : "0";

      }


      else if (type === "number") {

        if (calcValue === "Error") {
          calcValue = "0";
        }

        if (waitingForSecond) {

          calcValue =
            value === "."
              ? "0."
              : value;

          waitingForSecond = false;

        }

        else if (
          value === "." &&
          calcValue.includes(".")
        ) {

          return;

        }

        else {

          calcValue =
            calcValue === "0" &&
            value !== "."
              ? value
              : calcValue + value;

        }

      }


      else if (type === "operator") {

        if (calcValue === "Error") {
          return;
        }

        if (
          operator &&
          !waitingForSecond
        ) {

          calcValue =
            String(
              calculate(
                firstValue,
                calcValue,
                operator
              )
            );

        }

        firstValue = calcValue;
        operator = value;
        waitingForSecond = true;

      }


      else if (type === "equals") {

        if (
          !operator ||
          firstValue === null
        ) {
          return;
        }

        calcValue =
          String(
            calculate(
              firstValue,
              calcValue,
              operator
            )
          );

        firstValue = null;
        operator = null;
        waitingForSecond = true;

      }


      if (calcValue.length > 16) {

        calcValue =
          Number(calcValue)
            .toPrecision(12);

      }

      renderCalculator();

    }
  );

});


/* =========================
   CONVERSOR DE UNIDADES
========================= */

const unitData = {

  length: {

    units: {
      m: "Metros",
      km: "Kilómetros",
      cm: "Centímetros",
      ft: "Pies",
      in: "Pulgadas"
    },

    toBase: {
      m: 1,
      km: 1000,
      cm: 0.01,
      ft: 0.3048,
      in: 0.0254
    }

  },


  weight: {

    units: {
      kg: "Kilogramos",
      g: "Gramos",
      lb: "Libras",
      oz: "Onzas"
    },

    toBase: {
      kg: 1,
      g: 0.001,
      lb: 0.45359237,
      oz: 0.0283495231
    }

  },


  temperature: {

    units: {
      c: "Celsius",
      f: "Fahrenheit",
      k: "Kelvin"
    }

  }

};


function populateUnits() {

  const type =
    $("#unitType").value;

  const data =
    unitData[type];

  const from =
    $("#unitFrom");

  const to =
    $("#unitTo");

  from.innerHTML = "";
  to.innerHTML = "";


  Object.entries(data.units)
    .forEach(([key, label]) => {

      from.add(
        new Option(label, key)
      );

      to.add(
        new Option(label, key)
      );

    });


  if (to.options.length > 1) {
    to.selectedIndex = 1;
  }

  convertUnits();

}


function convertTemperature(
  value,
  from,
  to
) {

  let celsius;


  if (from === "c") {
    celsius = value;
  }


  if (from === "f") {
    celsius =
      (value - 32) * 5 / 9;
  }


  if (from === "k") {
    celsius =
      value - 273.15;
  }


  if (to === "c") {
    return celsius;
  }


  if (to === "f") {
    return celsius * 9 / 5 + 32;
  }


  return celsius + 273.15;

}


function formatNumber(number) {

  return Number(
    number.toFixed(8)
  ).toLocaleString("es-MX");

}


function convertUnits() {

  const input =
    $("#unitValue").value;

  if (input === "") {

    $("#unitResult").textContent =
      "Introduce un valor para convertir.";

    return;
  }


  const value =
    Number(input);

  const type =
    $("#unitType").value;

  const from =
    $("#unitFrom").value;

  const to =
    $("#unitTo").value;


  let result;


  if (type === "temperature") {

    result =
      convertTemperature(
        value,
        from,
        to
      );

  }

  else {

    const data =
      unitData[type];

    result =
      value *
      data.toBase[from] /
      data.toBase[to];

  }


  $("#unitResult").textContent =
    `${formatNumber(value)} ${
      unitData[type].units[from]
    } = ${formatNumber(result)} ${
      unitData[type].units[to]
    }`;

}


$("#unitType").addEventListener(
  "change",
  populateUnits
);

$("#unitFrom").addEventListener(
  "change",
  convertUnits
);

$("#unitTo").addEventListener(
  "change",
  convertUnits
);

$("#unitValue").addEventListener(
  "input",
  convertUnits
);

populateUnits();


/* =========================
   CONVERSOR DE MONEDA
========================= */

function mxnRate(code) {

  const usd =
    Number($("#rateUsdMxn").value) ||
    18;

  const eur =
    Number($("#rateEurMxn").value) ||
    20.9;


  if (code === "MXN") {
    return 1;
  }

  if (code === "USD") {
    return usd;
  }

  if (code === "EUR") {
    return eur;
  }

  return 1;

}


function convertCurrency() {

  const raw =
    $("#currencyValue").value;

  if (raw === "") {

    $("#currencyResult").textContent =
      "Introduce un valor para convertir.";

    return;
  }


  const value =
    Number(raw);

  const from =
    $("#currencyFrom").value;

  const to =
    $("#currencyTo").value;


  const mxn =
    value * mxnRate(from);

  const result =
    mxn / mxnRate(to);


  $("#currencyResult").textContent =
    `${formatNumber(value)} ${from} = ${
      formatNumber(result)
    } ${to}`;

}


[
  "currencyFrom",
  "currencyTo",
  "currencyValue",
  "rateUsdMxn",
  "rateEurMxn"
].forEach(id => {

  document
    .getElementById(id)
    .addEventListener(
      "input",
      convertCurrency
    );

});


[
  "currencyFrom",
  "currencyTo"
].forEach(id => {

  document
    .getElementById(id)
    .addEventListener(
      "change",
      convertCurrency
    );

});


/* =========================
   TEMPORIZADOR
========================= */

let timerSeconds = 300;

let timerInterval = null;


function renderTimer() {

  const minutes =
    Math.floor(timerSeconds / 60)
      .toString()
      .padStart(2, "0");

  const seconds =
    (timerSeconds % 60)
      .toString()
      .padStart(2, "0");


  $("#timerDisplay").textContent =
    `${minutes}:${seconds}`;

}


function getInputSeconds() {

  const minutes =
    Math.max(
      0,
      Number($("#timerMinutes").value) || 0
    );

  const seconds =
    Math.min(
      59,
      Math.max(
        0,
        Number($("#timerSeconds").value) || 0
      )
    );


  return minutes * 60 + seconds;

}


$("#timerStart").addEventListener(
  "click",
  () => {

    if (timerInterval) {
      return;
    }


    if (timerSeconds <= 0) {

      timerSeconds =
        getInputSeconds();

    }


    if (timerSeconds <= 0) {

      $("#timerStatus").textContent =
        "Configura un tiempo mayor que cero.";

      return;

    }


    $("#timerStatus").textContent =
      "Temporizador en marcha.";


    timerInterval =
      setInterval(
        () => {

          timerSeconds--;

          renderTimer();


          if (timerSeconds <= 0) {

            clearInterval(
              timerInterval
            );

            timerInterval = null;


            $("#timerStatus").textContent =
              "⏰ ¡Tiempo terminado!";

          }

        },
        1000
      );

  }
);


$("#timerPause").addEventListener(
  "click",
  () => {

    if (timerInterval) {

      clearInterval(
        timerInterval
      );

      timerInterval = null;

      $("#timerStatus").textContent =
        "Pausado.";

    }

  }
);


$("#timerReset").addEventListener(
  "click",
  () => {

    clearInterval(
      timerInterval
    );

    timerInterval = null;

    timerSeconds =
      getInputSeconds();

    renderTimer();

    $("#timerStatus").textContent =
      "Listo.";

  }
);


[
  "timerMinutes",
  "timerSeconds"
].forEach(id => {

  document
    .getElementById(id)
    .addEventListener(
      "input",
      () => {

        if (!timerInterval) {

          timerSeconds =
            getInputSeconds();

          renderTimer();

        }

      }
    );

});


renderTimer();