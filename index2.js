let urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.toString().slice(7);
const header = document.getElementById('companyName');
const companyImg = document.getElementById('companyImg');
const describe = document.getElementById('description');
const price = document.getElementById('price');
const change = document.getElementById('change');
let stockHistory = [];

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

let k = 0;
let j;
let i;

function addContent() {
    getFetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
        .then(info => {
            let headText = document.createTextNode(`${info.profile.companyName}`);
            header.appendChild(headText)
            console.log(info)
            companyImg.src = `${info.profile.image}`
            describe.innerText = `${info.profile.description}`
            price.innerText = `Price: $${info.profile.price}`
            change.innerText = `${info.profile.changesPercentage}`
            console.log(Math.sign(-5))
            if (Math.sign(info.profile.changes) == -1) {
                change.style.color = 'rgb(187, 25, 25)'

            } else if (Math.sign(info.profile.changes) == 1) {
                change.style.color = 'rgb(39, 199, 119)'
            }
        })
    fetchHistory(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line)`)
        .then(infoHistory => {
            for(k, i = 0 ; i < infoHistory.historical.length ; i++ ){
                for(const property in infoHistory.historical[i]){
                    k++;
                    stockHistory[k] = property;
                }
            }
            return stockHistory;
        })
}

let myChart = document.getElementById('myChart').getContext('2d');

let stockChart = new Chart(myChart, {
            type: 'line',
            data: {
                labels: ['Test'],
                datasets: [{
                        label: 'Stock Price',
                        data: [100,
                            2000,
                            1000, 
                            500],
                        backgroundColor: [
                            ' rgb(76, 127, 223)'
                        ],
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth: '#000',
                        hoverBorderColor: '#000',
                    }],
                    options: {
                        title: {
                            display: true,
                            text: '',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                fontColor: '#000'
                            }
                        },
                        layout: {
                            padding: {
                                left: 50,
                            }
                        },
                        tooltips: {
                            enabled: true
                        },
                        scales:{
                            yAxes:[{
                                ticks:{
                                    suggestedMin: 10,
                                    suggestedMax:500
                                }
                            }]
                        }
                    }

                }})

            addContent()