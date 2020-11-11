const buton = document.getElementById('searchButton');
const input = document.getElementById('inputField');
const resultsList = document.querySelector('.list-group');
const spinner = document.querySelector('.spin');
const marquee = document.querySelector('.spanMarquee')
let node;

async function getFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function fetchExtra(urlFull) {
    const response = await fetch(urlFull);
    const data = await response.json();
    return data;
}

async function getMarquee(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

async function marqueeText() {
    await getMarquee('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse')
        .then(info => {
            let arrayQuotes = [];
            console.log(info.length)
            for (let i = 0; i < info.length; i++) {
                arrayQuotes[i] = Object.values(info[i]);
                arrayQuotes[i] = arrayQuotes[i].splice(0, 3);
            };
            
            arrayQuotes = arrayQuotes.flat()
            for(let j = 1; j < arrayQuotes.length; j += 3){
                arrayQuotes[j]= `:`
            }
            arrayQuotes= arrayQuotes.join(' ')
            console.log(arrayQuotes)
            marquee.innerText = arrayQuotes
        })

}

marqueeText()

function clearList() {
    node.remove()
}

function addList(symbol, name, change, img) {
    spinner.className = 'spin spinner-border';
    setTimeout(() => {
        spinner.className = 'spin';
        let node = document.createElement('a');
        node.className = 'list-group-item';
        let textnode = document.createTextNode(`${name} (${symbol}) ${change}\u00A0\u00A0\u00A0\u00A0 `);
        node.appendChild(textnode);
        let image = document.createElement('img')
        image.setAttribute('src', img);
        image.setAttribute('width', '40px')
        image.setAttribute('height', '40px')
        image.setAttribute('onerror', "this.src='Images/favicon_io/favicon-32x32.png'")
        node.appendChild(image)
        node.title = `${name} (${symbol}) ${change}`;
        node.href = `company.html?symbol=${symbol}`;
        resultsList.appendChild(node);
    }, 1500);
}

function getSearch(e) {
    e.preventDefault();
    let searchInput = input.value;
    getFetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`)
        .then(results => {
            for (let i = 0; i < 10; i++) {
                fetchExtra(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${results[i].symbol}`)
                    .then(fullProfile => {
                        addList(fullProfile.symbol, fullProfile.profile.companyName, fullProfile.profile.changesPercentage, fullProfile.profile.image)
                    })


            };
        });

}


buton.addEventListener('click', getSearch);