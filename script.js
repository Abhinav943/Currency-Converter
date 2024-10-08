const baseUrl = "https://api.fxratesapi.com/latest";
const currecyselector = document.querySelectorAll(".dropdown select");
const select = document.querySelector(".select-container select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg  = document.querySelector('.msg');
const btn = document.querySelector("form button");

for (let curr of currecyselector){
    for (let currcode in countryList){
        let option = document.createElement('option');
        option.value = currcode;
        option.innerText = currcode;

        if(currcode === 'USD' && curr.name === 'from'){
            option.selected = true
        }

        if (currcode === "INR" && curr.name === "to") {
          option.selected = true
        }

        curr.appendChild(option);
    }
    curr.addEventListener('change',(event)=>{
        updateflag(event.target);
    })
}

const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newflagurl = `https://flagsapi.com/${countrycode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newflagurl;
};

const updateexchangerate = ()=>{
    let amount = document.querySelector('.amount input');
    let amtval = amount.value;

    if(amtval === '' || amtval<1)
    {
        amtval = 1;
        amount.value = '1';
    }
    
    let finalamount = (amtval * exchnagelist[toCurr.value]) / exchnagelist[fromCurr.value];

    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
}

btn.addEventListener('click',(event)=>{
    event.preventDefault();
    updateexchangerate();

})

window.addEventListener("load", () => {
  updateexchangerate;
});