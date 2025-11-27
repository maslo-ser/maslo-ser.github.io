let projekty;

class Projekt {
    // Obiekt zawierajacy dane o projekcie tworzony dla kazdego projektu z projekty.json w wczytajProjekty()
    tytul = "";
    autorzy = [];
    url = "";
    constructor(tytul, autorzy, url) {
        this.tytul = tytul;
        this.autorzy = autorzy;
        this.url = url;
    }
}
async function wczytajProjekty() {
    // Odpowiada za wczytanie json i utworzenie obiektow w tablicy projekty
    const res = await fetch("projekty.json");
    const dane = await res.json();
    projekty = dane.map(item => new Projekt(item.tytul, item.autorzy, item.url));
}
function wypiszProjekty() {
    // Iteruje przez kazdy obiekt w projektach i dodaje do tabeli
    const tabela = document.getElementById("tabela_projektow")
    for(let i = 0; i < projekty.length; i++) {
        const wiersz = document.createElement("tr");
        
        const kolumna1 = document.createElement("td");
        kolumna1.textContent = projekty[i].tytul;

        const kolumna2 = document.createElement("td");
        kolumna2.textContent = projekty[i].autorzy.join(", ");

        const kolumna3 = document.createElement("td");
        const link = document.createElement("a");
        link.href = projekty[i].url;
        link.target = "_blank";
        link.textContent = projekty[i].url;
        kolumna3.appendChild(link);
    
        wiersz.appendChild(kolumna1);
        wiersz.appendChild(kolumna2);
        wiersz.appendChild(kolumna3);
        tabela.appendChild(wiersz);
    }
}


async function start() {
    await wczytajProjekty();
    wypiszProjekty();
}

start();
