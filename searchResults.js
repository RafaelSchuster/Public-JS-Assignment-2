const spinner = document.querySelector('.spin');
const resultsList = document.querySelector('.list-group');

class SearchResult {
    constructor(results) {
        this.results = results;
    }
    addList(symbol, name, change, img, search) {
        spinner.className = 'spin spinner-border';
        setTimeout(() => {
            spinner.className = 'spin';
            let listItem = document.createElement('a');
            listItem.className = 'list-group-item link';
            let priceChanges = document.createElement('div');
            priceChanges.className = 'priceChange';
            change = change.replace(/[{()}]/g, '');
            if (Math.sign(parseFloat(`${change}`)) == -1) {
                priceChanges.className = 'priceRed';
            };
            let priceText = document.createTextNode(`${change}`);
            priceChanges.appendChild(priceText);
            let textnode = document.createTextNode(`${name} (${symbol})\u00A0\u00A0\u00A0\u00A0 `);
            listItem.appendChild(textnode);
            let image = document.createElement('img');
            image.setAttribute('src', img);
            image.setAttribute('width', '40px');
            image.setAttribute('height', '40px');
            image.setAttribute('onerror', "this.src='Images/favicon_io/favicon-32x32.png'");
            listItem.appendChild(image);
            listItem.title = `${name} (${symbol}) ${change}`;
            listItem.href = `company.html?symbol=${symbol}`;
            resultsList.appendChild(listItem);
            resultsList.appendChild(priceChanges);
            let linkItem = document.querySelectorAll('.link');
            linkItem = Array.from(linkItem);
            search = search.toUpperCase();
            linkItem.forEach(each => {
                each.innerHTML = each.innerHTML.replace(search, "<span style='background-color:   rgb(97, 192, 192)'>" + search + "</span>");
            })
        }, 1500);
    }
    renderResults(companies, search) {
        this.addList(companies.symbol, companies.profile.companyName, companies.profile.changesPercentage, companies.profile.image, search);
    }
}
const results = new SearchResult(document.getElementById('results'));