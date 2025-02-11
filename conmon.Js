// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");


// for (let select of dropdowns) {
//   for (currCode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if (select.name === "from" && currCode === "USD") {
//       newOption.selected = "selected";
//     } else if (select.name === "to" && currCode === "INR") {
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//   }

//   select.addEventListener("change", (evt) => {
//     updateFlag(evt.target);
//   });
// }

// const updateExchangeRate = async () => {
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }
//   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//   let response = await fetch(URL);
//   let data = await response.json();
//   let rate = data[toCurr.value.toLowerCase()];

//   let finalAmount = amtVal * rate;
//   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// };

// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// btn.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });

// window.addEventListener("load", () => {
//   updateExchangeRate();
// });









// async function convertCurrency() {
//     let amount = document.getElementById("amount").value;
//     let fromCurrency = document.getElementById("fromCurrency").value;
//     let toCurrency = document.getElementById("toCurrency").value;
    
//     if (amount === "" || amount <= 0) {
//         alert("Please enter a valid amount");
//         return;
//     }
    
//     let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
//     let data = await response.json();
//     let rate = data.rates[toCurrency];
//     let convertedAmount = (amount * rate).toFixed(2);
    
//     document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
// }






let exchangeRates = {};

    // Fetch conversion rates using USD as base currency
    async function fetchRates() {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        exchangeRates = data.rates;
        populateDropdowns(exchangeRates);
      } catch (error) {
        console.error('Error fetching currency data:', error);
        alert('Error fetching currency data. Please try again later.');
      }
    }

    // Populate the dropdowns with all available currency codes
    function populateDropdowns(rates) {
      const fromCurrencySelect = document.getElementById('fromCurrency');
      const toCurrencySelect = document.getElementById('toCurrency');
      
      // Clear any existing options
      fromCurrencySelect.innerHTML = '';
      toCurrencySelect.innerHTML = '';
      
      // Get currency codes, sort alphabetically, and populate the dropdowns
      const currencies = Object.keys(rates).sort();
      currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.text = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.text = currency;
        toCurrencySelect.appendChild(optionTo);
      });
      
      // Set default selections
      fromCurrencySelect.value = 'USD';
      toCurrencySelect.value = 'EUR';
    }

    // Convert currency based on the selected dropdowns and input amount
    function convertCurrency() {
      const amount = parseFloat(document.getElementById('amount').value);
      const fromCurrency = document.getElementById('fromCurrency').value;
      const toCurrency = document.getElementById('toCurrency').value;

      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
      }
      
      // Calculate conversion: newRate = (rate[toCurrency] / rate[fromCurrency])
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      
      document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }

    // Attach click event listener to the Convert button
    document.getElementById('convertBtn').addEventListener('click', convertCurrency);

    // Fetch currency rates when the page loads
    fetchRates();