// ## Core Deliverables

// As a user, I can:

// 1. See all characters names in a `div` with the id of `"character-bar"`. 
//     On page load, **request** data from the server to get all of the characters objects. 
//     When you have this information, 
//     you'll need to add a `span` tag with the character's name to the character bar.
// 2. Select a character from the character bar 
//      and see character's info inside `#detailed-info` div. 

//Stable elements
const toonsUrl = "http://localhost:3000/characters"
const toonBar = document.querySelector("#character-bar")
const infoDiv = document.querySelector("#detailed-info")
let divName = document.querySelector("#name") 
let divImage = document.querySelector("#image")
let divSpan = document.querySelector("#calories")
let form = document.querySelector("#calories-form")
let formToonID = document.querySelector("#characterId")
//

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
        formToonID.value = toon.id
      })

    toonSpan.innerText = toon.name
    toonSpan.append(toonName)
    toonBar.append(toonSpan)
    
}



// 3. Clicks on "Add Calories" button to add calories to a Character.

//      Persist calories value to the server and update the DOM.


form.addEventListener("submit", (form) => {
    form.preventDefault()
    fetch(toonsUrl + '/' + formToonID.value, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            calories: form.target.input.value
            //form.elements[1].placeholder.target.value
        })
    })  
})