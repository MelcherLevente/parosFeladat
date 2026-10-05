var tanulok=[{
    nev:"Kiss Anna",
    osztaly:"12.D",
    atlag:"1"
},
{
    nev: "Tóth Ervin",
    osztaly:"12.E",
    atlag:"3.98"
},
{
    nev:"Kosztolányi Erzsi",
    osztaly: "11.D",
    atlag:"4.7"
}]
// search bar
    function searchbar() {
    const searchinput = document.getElementById("search").value.toLowerCase();
    const rows = document.getElementById("tablazatTorzs").rows;

    for (const row of rows) {
        const name = row.cells[0].textContent.toLowerCase();

        if (name.includes(searchinput)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}
  

searchbar();

function rendezesAtlag(){
    tanulok.sort((a,b) => b.atlag - a.atlag);
    betoltes(tanulok);
}

function rendezesNev(){
    tanulok.sort((a,b) => a.nev.localeCompare(b.nev));
    betoltes(tanulok);
}

// tablazatba toltes
function betoltes(adat){
    const tablazatTorzs = document.getElementById("tablazatTorzs")
    const tablazatSor = adat.map((tanulo, index) => `
        <tr>
            <td>${tanulo.nev}</td>
            <td>${tanulo.osztaly}</td>
            <td>${tanulo.atlag}</td>
            <td><button type="button" onclick="modositas(${index})">Módosítás</button></td>
            <td><button type="button" onclick="torles(${index})">Törlés</button></td>
        </tr>`).join('')

    tablazatTorzs.innerHTML = tablazatSor

    letszamKiirasa()

    document.getElementById("legjobbTanulo").textContent = `${legjobbTanulo()}`

    jegyStatisztika()
}

betoltes(tanulok);

let szerkesztesIndex = null

document.getElementById("inputForm").addEventListener("submit", function(event){
    event.preventDefault()
    ujTanuloMentes()
})

function inputokUritese(){
    document.getElementById("nevInput").value = ""
    document.getElementById("osztalyInput").value = ""
    document.getElementById("atlagInput").value = ""
}


// uj tanulo mentese
function ujTanuloMentes(){
    try{
        let nev = document.getElementById("nevInput").value
        let osztaly = document.getElementById("osztalyInput").value
        let atlag = document.getElementById("atlagInput").value
        let regexNev = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ ]+$/
        let regexOsztaly = /^(?:[1-9]|1[0-2])\.[A-Z]$/
        let regexAtlag = /^(?:[1-4](?:\.\d+)?|5(?:\.0+)?)$/

        if(nev == ""){
            throw new Error("Add meg a tanuló nevét!")
        } 
        else if(!regexNev.test(nev)){
            throw new Error("A tanuló neve csak betűket tartalmazhat!")
        }
        else if(!regexOsztaly.test(osztaly)){
            throw new Error("Az osztály helyes formátuma: pl: 10.B, és az évfolyamnak 1-12 között kell lennie!")
        }
        else if(osztaly == ""){
            throw new Error("Add meg a tanuló osztályát!")
        }
        else if(!regexAtlag.test(atlag)){
            throw new Error("Az átlag helyes formátuma: pl: 3 vagy 4.75, és 1-5 között kell lennie!")
        }
        else{
            const tanulo = {nev: nev, osztaly: osztaly, atlag: atlag}
            if(szerkesztesIndex === null){
                tanulok.push(tanulo)
            }
            else{
                tanulok[szerkesztesIndex] = tanulo
                szerkesztesIndex = null
            }
            betoltes(tanulok)
            document.getElementById("hiba").textContent = ""
        }
        inputokUritese()
    }
    catch(error){
        document.getElementById("hiba").textContent = error.message
    }
}

function modositas(index){
    const clickedTanulo = tanulok[index]
    szerkesztesIndex = index

    document.getElementById("nevInput").value = `${clickedTanulo.nev}`
    document.getElementById("osztalyInput").value = `${clickedTanulo.osztaly}`
    document.getElementById("atlagInput").value = `${clickedTanulo.atlag}`


}

function torles(index){
    tanulok.splice(index, 1);
    if(szerkesztesIndex === index){
        szerkesztesIndex = null
        inputokUritese()
    }
    else if(szerkesztesIndex !== null && szerkesztesIndex > index){
        szerkesztesIndex--
    }
    betoltes(tanulok)
}

function letszamKiirasa(){
    document.getElementById("letszam").textContent = `Tanulók száma: ${tanulok.length}`
}

function osztalyAtlag(){
    let osztaly = document.getElementById("osztaly").value
    document.getElementById("osztaly").value = ""
    try{
        let atlagok = 0;
        let letszam = 0;
        tanulok.map((tanulo) => {
            if(tanulo.osztaly == osztaly){
                atlagok += Number(tanulo.atlag)
                letszam++
            }
        })
        if(atlagok == 0){
            throw new Error("Nincs ilyen osztályú tanuló!")
        }
        else{
            document.getElementById("osztalyAtlag").textContent = `A(z) ${osztaly} osztály átlaga: ${String(atlagok/letszam)}`
        }
    }
    catch(error){
        document.getElementById("osztalyAtlag").textContent = `${error}`
    }
}

function legjobbTanulo(){
    if(tanulok.length === 0){
        return "Nincs tanuló a listában."
    }

    let legjobbAtlag = 0
    let legjobbIndex = -1
    tanulok.map((tanulo, index) => {
        const atlag = Number(tanulo.atlag)
        if(atlag > legjobbAtlag){
            legjobbAtlag = atlag
            legjobbIndex = index
        }
    })
    return `Legjobb tanuló: ${tanulok[legjobbIndex].nev} - (${legjobbAtlag})`
}

function jegyStatisztika(){
    let jeles = 0
    let jo = 0
    let kozepes = 0
    let elegseges = 0
    let elegtelen = 0

    for(let i = 0; i < tanulok.length; i++){
        let atlag = tanulok[i].atlag
        if(atlag >= 4.5){
            jeles++
        }
        else if(atlag>=3.5 && atlag<4.5){
            jo++
        }
        else if(atlag>=2.5 && atlag<3.5){
            kozepes++
        }
        else if(atlag>=2 && atlag<2.5){
            elegseges++
        }
        else if(atlag<2){
            elegtelen++
        }

        if(tanulok.length == 0){
            document.getElementById("jeles").textContent = "Nincs tanuló a listában"
        }
        else{
            document.getElementById("jeles").textContent = `Jeles: ${jeles} fő`
            document.getElementById("jo").textContent = `Jó: ${jo} fő`
            document.getElementById("kozepes").textContent = `Közepes: ${kozepes} fő`
            document.getElementById("elegseges").textContent = `Elégséges: ${elegseges} fő`
            document.getElementById("elegtelen").textContent = `Elégtelen: ${elegtelen} fő`
        }
    }
}

function jelesVagyElegtelen(){
    tanulok.map((tanulo) => {
        if(tanulo.atlag>=4.5){
            return "green"
        }
    })
}