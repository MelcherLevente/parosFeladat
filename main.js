let tanulok=[{
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
}
]
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