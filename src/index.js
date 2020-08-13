let barDiv = document.querySelector("#character-bar")
let charInfoDiv = document.querySelector("#detailed-info")
let charName = document.querySelector("#name")
let charImage = document.querySelector("#image")
let charCaloriesForm = document.querySelector("#calories-form")


fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then((characters) => {
        characters.forEach((singleCharacter) => {
            turnCharacterToSpan(singleCharacter)
        })
    })
let turnCharacterToSpan = (char) => {
    console.log(char)
    let charSpan = document.createElement("span")
    charSpan.innerText = char.name
    barDiv.append(charSpan)
        //help method render char info
    charSpan.addEventListener("click", (evt) => {
        //console.log(char)
        renderCharInfo(char)
    })

}

let renderCharInfo = (char) => {
    charName.innerText = char.name
    charImage.src = char.image
    let charCaloriesInput = document.querySelector('[placeholder = "Enter Calories"]')
    charCaloriesInput.dataset.id = char.id
    let submitButton = document.querySelector('[value = "Add Calories"]')
    submitButton.addEventListener("click", (evt) => {
        event.preventDefault();



    })


    //charCaloriesForm.addEventListener("submit", (evt))


}