const buton = document.getElementById('searchButton');
const input = document.getElementById('inputField');
const resultsList = document.querySelector('.list-group');
const spinner = document.querySelector('.spin');
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

function addList(symbol, name, change, img) {
    spinner.className = 'spin spinner-border';
    setTimeout(() => {
        
        spinner.className = 'spin';
        let node = document.createElement('a');
        node.className = 'list-group-item';
        let priceChanges = document.createElement('div');
        priceChanges.className = 'priceChange';
        change = change.replace(/[{()}]/g, '');
        if (Math.sign(parseFloat(`${change}`)) == -1) {
            priceChanges.className ='priceRed'};
        let priceText = document.createTextNode(`${change}`);
        priceChanges.appendChild(priceText);
        let textnode = document.createTextNode(`${name} (${symbol})\u00A0\u00A0\u00A0\u00A0 `);
        node.appendChild(textnode);
        let image = document.createElement('img');
        image.setAttribute('src', img);
        image.setAttribute('width', '40px');
        image.setAttribute('height', '40px');
        image.setAttribute('onerror', "this.src='Images/favicon_io/favicon-32x32.png'");
        node.appendChild(image);
        node.title = `${name} (${symbol}) ${change}`;
        node.href = `company.html?symbol=${symbol}`;
        resultsList.appendChild(node);
        resultsList.appendChild(priceChanges);
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
                    });


            };
        });

}


buton.addEventListener('click', getSearch);