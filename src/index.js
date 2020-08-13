const characterBar = document.querySelector("#character-bar")
const characterInfoDiv = document.querySelector("#detailed-info")
const characterInfoName = document.querySelector("p#name")
const characterInfoImage = document.querySelector("#image")
const characterInfoCalories = document.querySelector("#calories")
const characterInfoCaloriesForm = document.querySelector("#calories-form")
const characterInfoCharacterId = document.querySelector("#characterId")
const characterInfoCaloriesFormInput = characterInfoCaloriesForm.querySelector('input[type="text"]')
const characterResetCaloriesButton = document.querySelector("#reset-btn")

characterResetCaloriesButton.addEventListener("click", (evt) => {

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ calories: 0 })
  }

  fetch(`http://localhost:3000/characters/${characterInfoCharacterId.value}`, options)
    .then(res => res.json())
    .then(updatedCharacter => {
      characterInfoCalories.innerText = updatedCharacter.calories
      characterInfoCaloriesForm.reset()
      characterBar.innerHTML = ""
      fetch("http://localhost:3000/characters")
        .then(res => res.json())
        .then(characterArray => {
          characterArray.forEach(character => {
            addCharacterToBar(character)
          });
        })
    })
})

fetch("http://localhost:3000/characters")
  .then(res => res.json())
  .then(characterArray => {
    characterArray.forEach(character => {
      addCharacterToBar(character)
    });
  })


const addCharacterToBar = (character) => {
  const characterSpan = document.createElement("span")
  characterSpan.innerText = character.name
  characterSpan.addEventListener("click", (evt) => {
    updateCharacterInfo(character)
  })
  characterBar.append(characterSpan)
}

const updateCharacterInfo = (character) => {
  characterInfoName.innerText = character.name
  characterInfoImage.src = character.image
  characterInfoCalories.innerText = character.calories
  characterInfoCharacterId.value = character.id
}

characterInfoCaloriesForm.addEventListener("submit", (evt) => {

  evt.preventDefault()

  const caloriesInput = parseInt(characterInfoCaloriesFormInput.value) + parseInt(characterInfoCalories.innerText)

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ calories: caloriesInput })
  }

  fetch(`http://localhost:3000/characters/${characterInfoCharacterId.value}`, options)
    .then(res => res.json())
    .then(updatedCharacter => {
      characterInfoCalories.innerText = updatedCharacter.calories
      characterInfoCaloriesForm.reset()
      characterBar.innerHTML = ""
      fetch("http://localhost:3000/characters")
        .then(res => res.json())
        .then(characterArray => {
          characterArray.forEach(character => {
            addCharacterToBar(character)
          });
        })
    })
})
