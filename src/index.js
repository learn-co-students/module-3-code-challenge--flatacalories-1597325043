document.addEventListener('DOMContentLoaded', (event) => {
let characterBar = document.querySelector('#character-bar');
let detailedInfo = document.querySelector('#detailed-info');
console.log("div character-bar", characterBar)
console.log("div detailed-info", detailedInfo)
});

let charactersArr = []
let eachCharacterDiv = document.createElement("div-id")


 fetch(`http://localhost:3000/characters`)
 .then(response => response.json())
 .then( charactersArr.forEach("charactersDisplayed")
})
// fetch : iterate over db.json to get indivudal hashes that will
// get each hash and will show as sepearate hashes in console 
// 

function charactersDisplayed(character) {
    characterBar.innerHTML = `<span>${character.name} </span>`
}
 
// create function that will populate span with info from database