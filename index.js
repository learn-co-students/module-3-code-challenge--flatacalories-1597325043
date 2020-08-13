// Deliverable 1
// See all characters names in a div with the id of "character-bar". On page load,
// request data from the server to get all of the characters objects. When you have
// this information, you'll need to add a span tag with the character's name to the
//  character bar.

const characterNameBar = document.querySelector("#character-bar")
const charactersNameInfoInMain = document.querySelector("#name")
const charactersImageInfoInMain = document.querySelector("#image")
const characterCurrentCalories = document.querySelector("#calories")

fetch("http://localhost:3000/characters")
  .then (resp => resp.json())
  .then ((charactersArray) => {
    charactersArray.forEach((singleCharacter) =>{
      turnCharacterIntoHTML(singleCharacter)
    })
  })

turnCharacterIntoHTML = (singleCharacter) =>{

  let characterSpan = document.createElement("span")
    characterSpan.innerHTML = singleCharacter.name
    characterNameBar.append(characterSpan)

    // Deliverable 2
    // Select a character from the character bar and
    // see character's info inside #detailed-info div.
    characterSpan.addEventListener("click", (evt) =>{
      charactersNameInfoInMain.innerHTML = singleCharacter.name
      characterCurrentCalories.innerHTML = singleCharacter.calories
      charactersImageInfoInMain.src = singleCharacter.image

    })
}
