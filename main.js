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

// tablazatba toltes
function betoltes(){
    try{
        nev=document.getElementById("tanulo_Nev").innerHTML=tanulok[0].nev
        osztaly=document.getElementById("tanulo_Osztaly").innerHTML=tanulok[0].osztaly
        atlag=document.getElementById("tanulo_Atlag").innerHTML=tanulok[0].atlag
    }
    catch(hiba){
        document.getElementById("hiba").innerHTML="Hiba" + hiba.message
        console.log(hiba.message)
    }

}
betoltes();


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
        console.log(error)
    }
}