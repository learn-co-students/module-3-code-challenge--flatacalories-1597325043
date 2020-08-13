let characterBar = document.querySelector("div#character-bar")
let characterShow = document.querySelector("div#detailed-info")
let charImg = document.querySelector("img#image")
let charName = document.querySelector("p#name")
let charCalories = document.querySelector("span#calories")
let charCaloriesForm = document.querySelector("form#calories-form")
let userInput = document.querySelector("input[type='text']")
let formCharacter = document.querySelector("input#characterId")


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
  charArr.forEach((charObj) => {
    charSpanHTML(charObj)
  })
}



// info for main area

let renderCharacterInMain = (charObj) => {
  charName.innerText = charObj.name
  charImg.src = charObj.image
  charCalories.innerText = charObj.calories

  formCharacter.value = charObj.id

}


// add calories

charCaloriesForm.addEventListener("submit", (evt) => {
  evt.preventDefault()

  charObj = charArr.find(char => { return char.id === Number(formCharacter.value) })

  console.log(charObj)
  
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
    console.log(updatedCharObj)

    charObj.calories = updatedCharObj.calories
    charCalories.innerText = updatedCharObj.calories

    evt.target.reset()
  })
})