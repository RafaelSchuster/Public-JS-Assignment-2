const buton = document.getElementById('searchButton')
const input = document.getElementById('inputField')
const resultsList = document.querySelector('.list-group')
const spinner = document.querySelector('.spin')

async function getFetch(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function addList(symbol, name) {
    spinner.className = 'spin spinner-border'
    setTimeout(()=>{
        spinner.className = 'spin'
        let node = document.createElement('a')
    node.className = 'list-group-item'
    let textnode = document.createTextNode(`${name} (${symbol})`)
    node.appendChild(textnode)
    node.title = `${name} (${symbol})`
    node.href = `/company.html?symbol=${symbol}`
    resultsList.appendChild(node)
    },2000)
    

}

function getSearch(e) {
    e.preventDefault()
    let searchInput = input.value
    getFetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`)
        .then(results => {
            console.log(results)
            for (let i = 0; i < 10; i++) {
                addList(results[i].symbol, results[i].name)
            }

        })

}

buton.addEventListener('click', getSearch)