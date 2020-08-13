// ## Core Deliverables

// As a user, I can:

// 1. See all characters names in a `div` with the id of `"character-bar"`. 
//     On page load, **request** data from the server to get all of the characters objects. 
//     When you have this information, 
//     you'll need to add a `span` tag with the character's name to the character bar.

//Stable elements
const toonsUrl = "http://localhost:3000/characters"
const toonBar = document.querySelector("#character-bar")
const infoDiv = document.querySelector("#detailed-info")
let divName = document.querySelector("#name") 
let divImage = document.querySelector("#image")
let divSpan = document.querySelector("#calories")



document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})


const fetchData = () => {
    fetch(toonsUrl)
    .then(res => res.json())
    .then(toonArr => {
        toonArr.forEach(toon => {
            renderToons(toon)
        });
    })
}

const renderToons = (toon) => {
    const toonSpan = document.createElement("span")
    const toonName = document.createElement("h2")

    toonSpan.addEventListener("click", () =>{
        divName.innerText = toon.name
        divImage.src = toon.image
        divSpan.innerText = toon.calories
      })

    toonSpan.innerText = toon.name
    toonSpan.append(toonName)
    toonBar.append(toonSpan)
    
}


// 2. Select a character from the character bar 
//      and see character's info inside `#detailed-info` div. 





















// 3. Clicks on "Add Calories" button to add calories to a Character.
//      Persist calories value to the server and update the DOM.