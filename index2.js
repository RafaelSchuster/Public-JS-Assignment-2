let urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.toString().slice(7);

const header = document.getElementById('companyName');
const companyImg = document.getElementById('companyImg');
const describe = document.getElementById('description');
const price = document.getElementById('price');
const change = document.getElementById('change');
const spinner = document.querySelector('.spin');

async function getFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function fetchHistory(url) {
    const response = await fetch(url);
    const dataHistory = await response.json();
    return dataHistory;
}

async function addContent() {
    setTimeout(()=>{
        getFetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
        .then(info => {
            let headText = document.createTextNode(`${info.profile.companyName}`);
            header.appendChild(headText);
            companyImg.src = `${info.profile.image}`;
            describe.innerText = `${info.profile.description}`;
            price.innerText = `Price: $${info.profile.price}`;
            change.innerText = `${info.profile.changesPercentage}`;
            if (Math.sign(info.profile.changes) == -1) {
                change.style.color = 'rgb(187, 25, 25)';

            } else if (Math.sign(info.profile.changes) == 1) {
                change.style.color = 'rgb(39, 199, 119)';
            };
        });
    fetchHistory(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line)`)
        .then(infoHistory => {
            arrayValues = [];
            for (let i = 0; i < 50; i++) {
                arrayValues[i] = Object.values(infoHistory.historical[i]);
                arrayValues[i] = arrayValues[i].splice(0, 2);
            };
            axis(arrayValues);
            return arrayValues;
        });
    },2000)
    
}

let dates = [];
let prices = [];

function axis(labels) {
    for (let i = 0; i < labels.length; i++) {
        dates.push(labels[i][0]);
        prices.push(labels[i][1]);
    };
}

let myChart = document.getElementById('myChart').getContext('2d');

let ctx = document.getElementById('myChart').getContext('2d');

async function chartIt() {
    spinner.className = 'spin spinner-border';
    await addContent();
    setTimeout(()=>{
        spinner.className = 'spin';
         myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Click to see chart',
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
    },4000)
}
chartIt();






// let stockChart = new Chart(myChart2, {
//             type: 'bar',
//             data: {
//                 labels: ['Stock Price'],
//                 datasets: [{
//                         label: 'Stock Price',
//                         data: [1,300,600,1000,356,789,100],
//                         borderWidth: 1,
//                         borderColor: '#777',
//                         hoverBorderWidth: '#000',
//                         hoverBorderColor: '#000',
//                     }],
//                     options: {
//                         title: {
//                             display: true,
//                             text: '',
//                             fontSize: 25
//                         },
//                         legend: {
//                             display: true,
//                             position: 'right',
//                             labels: {
//                                 fontColor: '#000'
//                             }
//                         },
//                         layout: {
//                             padding: {
//                                 left: 50,
//                             }
//                         },
//                         tooltips: {
//                             enabled: true
//                         },
//                         scales:{
//                             yAxes:[{
//                                 ticks:{
//                                     suggestedMin: 10,
//                                     suggestedMax:500
//                                 }
//                             }]
//                         }
//                     }

//                 }})