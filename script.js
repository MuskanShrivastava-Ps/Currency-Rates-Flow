const BaseURL = "https://open.er-api.com/v6/latest/";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const from = document.querySelector(".left select");
const to = document.querySelector(".right select");
const displayrates = document.querySelector(".board p");

dropdowns.forEach((select)=>{
    select.innerHTML = "";
    for(let currency in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currency;
        newoption.value = currency;
        if(select.name==="from" && currency==="USD"){
            newoption.selected = "selected";
        }
        if(select.name==="to" && currency==="INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
});


const updateflag = (element)=>{
    let countryCode = element.value;
    let currencyCode = countryList[countryCode];
    let newimg = `https://flagsapi.com/${currencyCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newimg;
}

window.addEventListener("load",()=>{
    updateExchangeRate();
});

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async ()=>{
    let amount = document.querySelector("input");
    let amountVal = amount.value;
    if(amountVal==="" || amountVal<0){
        amount.value = "1";
        amountVal = 1;
    }
    const URL = `${BaseURL}${from.value}`;

    let response = await fetch(URL);
    let data = await response.json();
    let torates = data.rates[to.value];
    let total = amountVal * torates;
    displayrates.innerText = `${amountVal} ${from.value} = ${total} ${to.value}`
}


