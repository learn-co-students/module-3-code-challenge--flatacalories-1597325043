let barDiv = document.querySelector("#character-bar")
let name = document.querySelector("#name")
let image = document.querySelector("#image")
let calories = document.querySelector("#calories")
let form = document.querySelector("#calories-form")
let resetButton = document.querySelector("#reset-btn")

fetch(`http://localhost:3000/characters`)
.then(r => r.json())
.then((characters) => {
    characters.forEach((character) => {
        turnCharacterIntoHTML(character)
    })
})

let turnCharacterIntoHTML = (character) => {
    let barSpan = document.createElement("span")
    barSpan.innerHTML = character.name
    barDiv.append(barSpan)

    barSpan.addEventListener("click", (event) => {
        renderInfo(character)
    })
}

let renderInfo = (character) => {
    name.innerHTML = character.name
    image.src = character.image
    calories.innerHTML = character.calories

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        character.calories += Number(event.target.calories.value)

        fetch(`http://localhost:3000/characters/${character.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                calories: character.calories
            })
        })
        .then(r => r.json())
        .then((updatedCharacter) => {
            calories.innerHTML = updatedCharacter.calories
        })
        event.target.reset()
    })

    resetButton.addEventListener("click", (event) => {
        character.calories = 0

        fetch(`http://localhost:3000/characters/${character.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                calories: character.calories
            })
        })
        .then(r => r.json())
        .then((updatedCharacter) => {
            calories.innerHTML = updatedCharacter.calories
        })
    })
}

