let characterBar = document.querySelector("div#character-bar")
let characterShow = document.querySelector("div#detailed-info")
let charImg = document.querySelector("img#image")
let charName = document.querySelector("p#name")
let charCalories = document.querySelector("span#calories")
let charCaloriesForm = document.querySelector("form#calories-form")
let userInput = document.querySelector("input[type='text']")
let formCharacter = document.querySelector("input#characterId")
let resetCalories = document.querySelector("#reset-btn")


let newCharButton = document.createElement("button")
newCharButton.innerText = "Add a Character"
characterShow.prepend(newCharButton)


let charArr = []


// initial fetch

fetch("http://localhost:3000/characters")
.then(res => res.json())
.then((charObjArr) => {
  charArr = charObjArr
  renderCharacterBar()
})


// create span and event listener

let charSpanHTML = (charObj) => {
  let charSpan = document.createElement("span")
  charSpan.innerText = charObj.name

  characterBar.append(charSpan)

  charSpan.addEventListener("click", (evt) => {
    renderCharacterInMain(charObj)
  })
}


let renderCharacterBar = () => {
  characterBar.innerHTML = ""
  charArr.forEach((charObj) => {
    charSpanHTML(charObj)
  })
}



// info for main area and event listener

let renderCharacterInMain = (charObj) => {
  charName.innerText = charObj.name
  charImg.src = charObj.image
  charCalories.innerText = charObj.calories

  formCharacter.value = charObj.id

}



// add calories event

charCaloriesForm.addEventListener("submit", (evt) => {
  evt.preventDefault()

  charObj = charArr.find(char => { return char.id === Number(formCharacter.value) })
  
  // patch request 1. update in memory, 2. update on database, 3. update on page

  fetch(`http://localhost:3000/characters/${charObj.id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      calories: Number(charObj.calories) + Number(userInput.value)
    })
  })
  .then(res => res.json())
  .then((updatedCharObj) => {

    charObj.calories = updatedCharObj.calories
    charCalories.innerText = updatedCharObj.calories

    evt.target.reset()
  })
})



// reset calories event 

resetCalories.addEventListener("click", (evt) => {
  charObj = charArr.find(char => { return char.id === Number(formCharacter.value) })

  fetch(`http://localhost:3000/characters/${charObj.id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      calories: 0
    })
  })
  .then(res => res.json())
  .then((updatedCharObj) => {

    charObj.calories = updatedCharObj.calories
    charCalories.innerText = updatedCharObj.calories

  })
})



// change name event

charName.addEventListener("click", (evt) => {
  console.log(charName.innerText)
  nameChangeFormHTML()
})



// change name form

let nameChangeFormHTML = () => {
  let nameChangeForm = document.createElement("form")
  nameChangeForm.style.visiblity = "visible"

  let nameInput = document.createElement("input")
  nameInput.name = "name"
  nameInput.value = charName.innerText

  let submitButton = document.createElement("button")
  submitButton.innerText = "Submit"

  nameChangeForm.append(nameInput, submitButton)

  characterShow.prepend(nameChangeForm)

  charObj = charArr.find(char => { return char.name === charName.innerText })

  nameChangeForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    fetch(`http://localhost:3000/characters/${charObj.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: evt.target.name.value
      })
    })
    .then(res => res.json())
    .then((updatedCharObj) => {
      console.log(updatedCharObj)
      charObj.name = updatedCharObj.name
      charName.innerText = updatedCharObj.name

      evt.target.reset()

      nameChangeForm.style.display = "none"
    })
  }) 
}


// new char form
let addNewCharacterFormHTML = () => {
  let newCharForm = document.createElement("form")
  newCharForm.style.visiblity = "visible"

  let newCharName = document.createElement("input")
  newCharName.name = "new-name"

  let newCharNameLabel = document.createElement("label")
  newCharNameLabel.innerText = "Name: "

  let newCharImage = document.createElement("input") 
  newCharImage.name = "new-image"

  let newCharImgLabel = document.createElement("label")
  newCharImgLabel.innerText = "Image URL: "
  
  let newSubmitButton = document.createElement("button")
  newSubmitButton.innerText = "Submit"

  newCharForm.append(newCharNameLabel, newCharName, newCharImgLabel, newCharImage, newSubmitButton)

  characterShow.prepend(newCharForm)

  newCharForm.addEventListener("submit", (evt) => {
    // 1. create new character 2. add to span
    evt.preventDefault()

    fetch("http://localhost:3000/characters", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: evt.target["new-name"].value,
        image: evt.target["new-image"].value,
        calories: 0
      })
    })
    .then(res => res.json())
    .then((newCharObj) => {
      charArr.push(newCharObj)
      renderCharacterBar()

      evt.target.reset()
      newCharForm.style.display = "none"
    })
  })
}


newCharButton.addEventListener("click", (evt) => {
  addNewCharacterFormHTML()
})