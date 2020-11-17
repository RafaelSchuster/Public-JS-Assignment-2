const spinner = document.querySelector('.spin');
const resultsList = document.querySelector('.list-group');
let i = 0;
let companyArr = [];

class SearchResult {
    constructor(results) {
        this.results = results;
    }
    compareCompany(companies, index) {
        console.log(companies[index]);
    };
    addList(symbol, name, change, img, search, companies) {
        spinner.className = 'spin spinner-border';
        companyArr[i] = companies;
            i +=1;
        setTimeout(() => {
            spinner.className = 'spin';
            let listItem = document.createElement('a');
            listItem.className = 'list-group-item link';
            listItem.style.position = 'relative';
            let priceChanges = document.createElement('div');
            priceChanges.className = 'priceChange';
            const btnForm = document.createElement('form');
            btnForm.style = 'display: inline';
            btnForm.innerHTML = "<button class= 'compare' > compare </button>";
            listItem.appendChild(btnForm);
            change = change.replace(/[{()}]/g, '');
            if (Math.sign(parseFloat(`${change}`)) == -1) {
                priceChanges.className = 'priceRed';
            };
            name = name.toUpperCase();
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
                let butn = document.querySelectorAll('.compare');
                butn = Array.from(butn);
                for (let i = 0; i < butn.length; i++) {
                    butn[i].addEventListener('click', (e) => {
                        e.preventDefault();
                        this.compareCompany(companyArr, i);
                    });
                };

            })
        }, 1500);
    }
    renderResults(companies, search) {
        this.addList(companies.symbol, companies.profile.companyName, companies.profile.changesPercentage, companies.profile.image, search, companies);
    };
}
const results = new SearchResult(document.getElementById('results'));