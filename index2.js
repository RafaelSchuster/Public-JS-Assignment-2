let urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.toString().slice(7);
const header = document.getElementById('companyName')
const companyImg = document.getElementById('companyImg')
const describe = document.getElementById('description')
const price = document.getElementById('price')
const change = document.getElementById('change')

async function getFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function addContent() {
    getFetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
        .then(info => {
            let headText = document.createTextNode(`${info.profile.companyName}`);
            header.appendChild(headText)
            console.log(info)
            companyImg.src = `${info.profile.image}`
            describe.innerText = `${info.profile.description}`
            price.innerText = `${info.profile.price}`
            change.innerText = `${info.profile.changesPercentage}`
            console.log(Math.sign(-5))
            if (Math.sign(info.profile.changes) == -1) {
                change.style.color = 'rgb(187, 25, 25)'

            } else if (Math.sign(info.profile.changes) == 1) {
                change.style.color = 'rgb(39, 199, 119)'
            }
        })
}

addContent()