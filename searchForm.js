let searchInput;
let companies = [];
class SearchForm {
    constructor(form) {
        this.form = form;
    }
    async getFetch(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    OnSearch(companies) {
        results.renderResults(companies);
    }
    OnLoad() {
        let searchBar = document.createElement('input');
        searchBar.type = 'text';
        searchBar.placeholder = "Search Stocks..";
        searchBar.name = "search";
        searchBar.id = "inputField";
        let buton = document.createElement('button');
        buton.id = "searchButton";
        buton.innerHTML = '<i class="fa fa-search"></i>';
        let spinner = document.createElement('span');
        spinner.className = 'spin';
        this.form.appendChild(searchBar);
        this.form.appendChild(buton);
        this.form.appendChild(spinner);
        const buttton = document.getElementById('searchButton');
        const input = document.getElementById('inputField');
        buttton.addEventListener('click', function (e) {
            e.preventDefault();
            searchInput = input.value;
            form.getFetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`)
                .then(resultss => {
                    for (let i = 0; i < 10; i++) {
                        form.getFetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${resultss[i].symbol}`)
                            .then(fullProfile => {
                                form.OnSearch(fullProfile);
                            });
                    };
                });
        });
    }
}

const form = new SearchForm(document.getElementById('form'));
form.OnLoad()