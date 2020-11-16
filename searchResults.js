const spinner = document.querySelector('.spin');
const resultsList = document.querySelector('.list-group');

class SearchResult {
    constructor(results) {
        this.results = results;
    }
    addList(symbol, name, change, img) {
        spinner.className = 'spin spinner-border';
        setTimeout(() => {
            spinner.className = 'spin';
            let node = document.createElement('a');
            node.className = 'list-group-item';
            let priceChanges = document.createElement('div');
            priceChanges.className = 'priceChange';
            change = change.replace(/[{()}]/g, '');
            if (Math.sign(parseFloat(`${change}`)) == -1) {
                priceChanges.className = 'priceRed'
            };
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
    renderResults(companies) {
        results.addList(companies.symbol, companies.profile.companyName, companies.profile.changesPercentage, companies.profile.image);
    }
}
const results = new SearchResult(document.getElementById('results'));

