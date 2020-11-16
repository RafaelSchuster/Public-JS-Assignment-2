let urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.toString().slice(7);

const header = document.getElementById('companyName');
const companyImg = document.getElementById('companyImg');
const describe = document.getElementById('description');
const price = document.getElementById('price');
const change = document.getElementById('change');
const spinner = document.querySelector('.spin-company');

async function getFetch2(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function addContent() {
    setTimeout(() => {
        getFetch2(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
            .then(info => {
                let headText = document.createTextNode(`${info.profile.companyName}`);
                header.appendChild(headText);
                companyImg.src = `${info.profile.image}`;
                if (info.profile.description) {
                    describe.innerText = `${info.profile.description}`;
                }
                price.innerText = `Price: $${info.profile.price}`;
                change.innerText = `${info.profile.changesPercentage}`;
                if (Math.sign(info.profile.changes) == -1) {
                    change.style.color = 'rgb(187, 25, 25)';

                } else if (Math.sign(info.profile.changes) == 1) {
                    change.style.color = 'rgb(39, 199, 119)';
                };
            });
        getFetch2(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line)`)
            .then(infoHistory => {
                arrayValues = [];
                for (let i = 0; i < infoHistory.historical.length; i++) {
                    arrayValues[i] = Object.values(infoHistory.historical[i]);
                    arrayValues[i] = arrayValues[i].splice(0, 2);
                };
                axis(arrayValues);
                return arrayValues;
            });
    }, 2000);
}

let dates = [];
let prices = [];

function axis(labels) {
    for (let i = 0; i < labels.length; i++) {
        dates.push(labels[i][0]);
        prices.push(labels[i][1]);
    };
    dates.reverse();
    prices.reverse();
}

let myChart = document.getElementById('myChart').getContext('2d');

let ctx = document.getElementById('myChart').getContext('2d');

async function chartIt() {
    spinner.className = 'spin-company spinner-border';
    await addContent();
    setTimeout(() => {
        spinner.className = 'spin';
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'StockPrice',
                    data: prices,
                    fill: false,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
        });
    }, 4000)
}
chartIt();