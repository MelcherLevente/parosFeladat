var tanulok=[{
    nev:"Kiss Anna",
    osztaly:"12.D",
    atlag:"3,5"
},
{
    nev: "Tóth Ervin",
    osztaly:"12.E",
    atlag:"3,98"

},
{
    nev:"Kosztolányi Erzsi",
    osztaly: "11.D",
    atlag:"4,23"
}]
// search bar
function searchbar(){
    let searchinput=document.getElementById("search").value.toLowerCase();
    
    let searchnev=document.getElementById("tanulo_Nev");

    for(let i=0; i<searchnev.length;i++){
        if(!searchnev[i].innerHTML.toLowerCase().includes(searchinput)){
            document.getElementById("search-results").innerHTML="Nem talált"
        }
        else{
            document.getElementById("search-results").innerHTML.searchnev[i]=searchnev[i]
        }
    }
}
searchbar();

// tablazatba toltes
var inputForm = document.getElementById("inputForm")
function betoltes(adat){
    try{
        const tablazatTorzs = document.getElementById("tablazatTorzs")
        const tablazatSor = adat.map(tanulo => `
            <tr>
                <td>${tanulo.nev}</td>
                <td>${tanulo.osztaly}</td>
                <td>${tanulo.atlag}</td>
                <td>${tanulo.atlag}</td>
                <td>${tanulo.atlag}</td>
            </tr>`).join('')
        tablazatTorzs.innerHTML = tablazatSor
    }
    catch(hiba){
        // document.getElementById("hiba").innerHTML="Hiba" + hiba.message
        // console.log(hiba.message)
    }

    inputForm.addEventListener("submit", function(event){
        event.preventDefault();
        
        ujTanuloMentes()

        betoltes(tanulok)

        inputokUritese()
    })
}

betoltes(tanulok);

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
        let regexOsztaly = /^(?:[1-9]|1[0-2])\.[a-zA-Z]$/
        let regexAtlag = /^(?:[1-4](?:,\d+)?|5(?:,0+)?)$/

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
            throw new Error("Az átlag helyes formátuma: pl: 3 vagy 4,75, és 1-5 között kell lennie!")
        }
        else{
            tanulok.push({nev: `${nev}`, osztaly: `${osztaly}`, atlag: `${atlag}`})
        }
        inputokUritese()
    }
    catch(error){
        document.getElementById("hiba").innerHTML = error
    }
}