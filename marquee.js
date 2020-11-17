export const marquee = document.querySelector('.spanMarquee');

export async function getMarquee(url) {
    const response = await fetch(url);
    const data = await response.json();
    const marqueeData = new marqueeConstruct(data, marquee);
    marqueeData.render();
    return data;
}

export function marqueeConstruct(data, marqueePlaceholder) {
    this.data = data;
    this.render = () => {
        let arrayQuotes = [];
        for (let i = 0; i < this.data.length; i++) {
            arrayQuotes[i] = Object.values(this.data[i]);
            arrayQuotes[i] = arrayQuotes[i].splice(0, 3);
        };
        arrayQuotes = arrayQuotes.flat();
        for (let j = 1; j < arrayQuotes.length; j += 3) {
            arrayQuotes[j] = `:\u00A0 $`;
        }
        arrayQuotes.unshift('Stock Prices in Real Time:\u00A0\u00A0\u00A0\u00A0');
        arrayQuotes = arrayQuotes.join(' ');
        marqueePlaceholder.innerText = arrayQuotes;
    }
}