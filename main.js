let tanulok = [

]
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
        console.log(tanulok[0])
    }
    catch(error){
        console.log(error)
    }
}