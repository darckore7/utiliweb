"use strict";

/* =========================

   UTILIDADES

========================= */

const $ = (selector) => document.querySelector(selector);

function closeTool() {

    const modal = $("#modal");

    if (modal) {

        modal.classList.add("hidden");

    }

}

function showModal(content) {

    const modal = $("#modal");

    const modalContent = $("#modalContent");

    if (!modal || !modalContent) {

        alert("Error: no se encontró la ventana de la herramienta.");

        return;

    }

    modalContent.innerHTML = content;

    modal.classList.remove("hidden");

}

/* =========================

   ABRIR HERRAMIENTAS

========================= */

function openTool(tool) {

    switch (tool) {

        case "calculator":

            showModal(`

                <h2>🧮 Calculadora</h2>

                <input id="calcA" type="number" placeholder="Primer número">

                <select id="calcOperation">

                    <option value="+">+</option>

                    <option value="-">−</option>

                    <option value="*">×</option>

                    <option value="/">÷</option>

                </select>

                <input id="calcB" type="number" placeholder="Segundo número">

                <button onclick="calculateBasic()">Calcular</button>

                <div id="calcResult" class="result"></div>

            `);

            break;

        case "percentage":

            showModal(`

                <h2>📊 Porcentajes</h2>

                <input id="percentNumber" type="number" placeholder="Cantidad">

                <input id="percentValue" type="number" placeholder="Porcentaje">

                <button onclick="calculatePercentage()">Calcular</button>

                <div id="percentResult" class="result"></div>

            `);

            break;

        case "age":

            showModal(`

                <h2>🎂 Calculadora de edad</h2>

                <input id="birthDate" type="date">

                <button onclick="calculateAge()">Calcular edad</button>

                <div id="ageResult" class="result"></div>

            `);

            break;

        case "bmi":

            showModal(`

                <h2>⚖️ Calculadora de IMC</h2>

                <input id="bmiWeight" type="number" placeholder="Peso en kg">

                <input id="bmiHeight" type="number" step="0.01" placeholder="Altura en metros">

                <button onclick="calculateBMI()">Calcular IMC</button>

                <div id="bmiResult" class="result"></div>

            `);

            break;

        case "loan":

            showModal(`

                <h2>💰 Calculadora de préstamo</h2>

                <input id="loanAmount" type="number" placeholder="Cantidad del préstamo">

                <input id="loanRate" type="number" step="0.01" placeholder="Interés anual (%)">

                <input id="loanMonths" type="number" placeholder="Meses">

                <button onclick="calculateLoan()">Calcular</button>

                <div id="loanResult" class="result"></div>

            `);

            break;

        case "temperature":

            showModal(`

                <h2>🌡️ Temperatura</h2>

                <input id="tempValue" type="number" placeholder="Temperatura">

                <select id="tempFrom">

                    <option value="c">Celsius</option>

                    <option value="f">Fahrenheit</option>

                    <option value="k">Kelvin</option>

                </select>

                <select id="tempTo">

                    <option value="c">Celsius</option>

                    <option value="f">Fahrenheit</option>

                    <option value="k">Kelvin</option>

                </select>

                <button onclick="convertTemperature()">Convertir</button>

                <div id="tempResult" class="result"></div>

            `);

            break;

        case "length":

            showModal(`

                <h2>📏 Conversor de longitud</h2>

                <input id="lengthValue" type="number" placeholder="Cantidad">

                <select id="lengthFrom">

                    <option value="m">Metros</option>

                    <option value="km">Kilómetros</option>

                    <option value="cm">Centímetros</option>

                    <option value="mi">Millas</option>

                    <option value="ft">Pies</option>

                </select>

                <select id="lengthTo">

                    <option value="m">Metros</option>

                    <option value="km">Kilómetros</option>

                    <option value="cm">Centímetros</option>

                    <option value="mi">Millas</option>

                    <option value="ft">Pies</option>

                </select>

                <button onclick="convertLength()">Convertir</button>

                <div id="lengthResult" class="result"></div>

            `);

            break;

        case "weight":

            showModal(`

                <h2>⚖️ Conversor de peso</h2>

                <input id="weightValue" type="number" placeholder="Cantidad">

                <select id="weightFrom">

                    <option value="kg">Kilogramos</option>

                    <option value="g">Gramos</option>

                    <option value="lb">Libras</option>

                    <option value="oz">Onzas</option>

                </select>

                <select id="weightTo">

                    <option value="kg">Kilogramos</option>

                    <option value="g">Gramos</option>

                    <option value="lb">Libras</option>

                    <option value="oz">Onzas</option>

                </select>

                <button onclick="convertWeight()">Convertir</button>

                <div id="weightResult" class="result"></div>

            `);

            break;

        case "date":

            showModal(`

                <h2>📅 Días entre fechas</h2>

                <input id="date1" type="date">

                <input id="date2" type="date">

                <button onclick="calculateDateDifference()">Calcular</button>

                <div id="dateResult" class="result"></div>

            `);

            break;

        case "text":

            showModal(`

                <h2>📝 Contador de texto</h2>

                <textarea id="textInput" rows="7" placeholder="Escribe o pega tu texto aquí..."></textarea>

                <button onclick="countText()">Contar</button>

                <div id="textResult" class="result"></div>

            `);

            break;

        case "password":

            showModal(`

                <h2>🔐 Generador de contraseñas</h2>

                <input id="passwordLength" type="number" value="12" min="4" max="50">

                <button onclick="generatePassword()">Generar contraseña</button>

                <div id="passwordResult" class="result"></div>

            `);

            break;

        case "random":

            showModal(`

                <h2>🎲 Número aleatorio</h2>

                <input id="randomMin" type="number" placeholder="Mínimo">

                <input id="randomMax" type="number" placeholder="Máximo">

                <button onclick="randomNumber()">Generar</button>

                <div id="randomResult" class="result"></div>

            `);

            break;

        case "stopwatch":

            showModal(`

                <h2>⏱️ Cronómetro</h2>

                <div id="stopwatchDisplay" class="timer-display">00:00:00</div>

                <button onclick="startStopwatch()">Iniciar</button>

                <button onclick="pauseStopwatch()">Pausar</button>

                <button onclick="resetStopwatch()">Reiniciar</button>

            `);

            break;

        case "timer":

            showModal(`

                <h2>⏰ Temporizador</h2>

                <input id="timerMinutes" type="number" min="0" placeholder="Minutos">

                <input id="timerSeconds" type="number" min="0" max="59" placeholder="Segundos">

                <button onclick="startTimer()">Iniciar</button>

                <button onclick="resetTimer()">Reiniciar</button>

                <div id="timerDisplay" class="timer-display">00:00</div>

            `);

            break;

        default:

            alert("Herramienta no encontrada.");

    }

}

/* =========================

   CALCULADORA

========================= */

function calculateBasic() {

    const a = Number($("#calcA").value);

    const b = Number($("#calcB").value);

    const operation = $("#calcOperation").value;

    let result;

    if (operation === "+") result = a + b;

    if (operation === "-") result = a - b;

    if (operation === "*") result = a * b;

    if (operation === "/") {

        if (b === 0) {

            $("#calcResult").textContent = "No se puede dividir entre cero.";

            return;

        }

        result = a / b;

    }

    $("#calcResult").textContent = `Resultado: ${result}`;

}

/* =========================

   PORCENTAJE

========================= */

function calculatePercentage() {

    const number = Number($("#percentNumber").value);

    const percentage = Number($("#percentValue").value);

    const result = number * percentage / 100;

    $("#percentResult").textContent =

        `${percentage}% de ${number} = ${result}`;

}

/* =========================

   EDAD

========================= */

function calculateAge() {

    const birth = new Date($("#birthDate").value);

    const today = new Date();

    if (isNaN(birth)) {

        $("#ageResult").textContent = "Selecciona una fecha.";

        return;

    }

    let age = today.getFullYear() - birth.getFullYear();

    const month = today.getMonth() - birth.getMonth();

    if (

        month < 0 ||

        (month === 0 && today.getDate() < birth.getDate())

    ) {

        age--;

    }

    $("#ageResult").textContent = `Tienes ${age} años.`;

}

/* =========================

   IMC

========================= */

function calculateBMI() {

    const weight = Number($("#bmiWeight").value);

    const height = Number($("#bmiHeight").value);

    if (weight <= 0 || height <= 0) {

        $("#bmiResult").textContent = "Introduce datos válidos.";

        return;

    }

    const bmi = weight / (height * height);

    let status;

    if (bmi < 18.5) {

        status = "Bajo peso";

    } else if (bmi < 25) {

        status = "Peso normal";

    } else if (bmi < 30) {

        status = "Sobrepeso";

    } else {

        status = "Obesidad";

    }

    $("#bmiResult").textContent =

        `IMC: ${bmi.toFixed(2)} — ${status}`;

}

/* =========================

   PRÉSTAMO

========================= */

function calculateLoan() {

    const amount = Number($("#loanAmount").value);

    const annualRate = Number($("#loanRate").value);

    const months = Number($("#loanMonths").value);

    if (amount <= 0 || months <= 0) {

        $("#loanResult").textContent = "Introduce datos válidos.";

        return;

    }

    const monthlyRate = annualRate / 100 / 12;

    let payment;

    if (monthlyRate === 0) {

        payment = amount / months;

    } else {

        payment =

            amount *

            monthlyRate *

            Math.pow(1 + monthlyRate, months) /

            (Math.pow(1 + monthlyRate, months) - 1);

    }

    $("#loanResult").innerHTML =

        `Pago mensual aproximado: <strong>$${payment.toFixed(2)}</strong><br>

        Total aproximado: $${(payment * months).toFixed(2)}`;

}

/* =========================

   TEMPERATURA

========================= */

function convertTemperature() {

    const value = Number($("#tempValue").value);

    const from = $("#tempFrom").value;

    const to = $("#tempTo").value;

    let celsius;

    if (from === "c") celsius = value;

    if (from === "f") celsius = (value - 32) * 5 / 9;

    if (from === "k") celsius = value - 273.15;

    let result;

    if (to === "c") result = celsius;

    if (to === "f") result = c
    
    alert("UTILIWEB JAVASCRIPT FUNCIONA"); 