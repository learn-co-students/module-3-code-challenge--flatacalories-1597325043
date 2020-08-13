const characterBar = document.querySelector("div#character-bar");

const characterInfoDiv = document.querySelector("div#detailed-Info");

    const charPTag = document.querySelector("p#name");
    const charImgTag = document.querySelector("img#image");
    
    const charSpanTag = document.querySelector("span#calories");

const charForm = document.querySelector("form#calories-form");
    const formInput = document.querySelector("input#characterId");
    const userInput = document.querySelector("input").nextElementSibling
        userInput.name = "calorie"
   
recieveCharacters()

const charObjs = []
// console.log("this is ", charObjs);

function recieveCharacters(){
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then((characters) => {
            characters.forEach((character) => {
                charObjs.push(character)
                renderCharacter(character)

            })
            
            renderCharInfo(characters[0])
        })
} 

function renderCharacter(obj){

    const charSpan = document.createElement("span")
        charSpan.innerText = obj.name

    characterBar.append(charSpan)

    charSpan.addEventListener("click", function(evt) {
        console.log(this);
      renderCharInfo(obj)
    })
}

function renderCharInfo(charObj){
    charPTag.innerText = charObj.name
    charImgTag.src = charObj.image
    charSpanTag.innerText = charObj.calories
    formInput.value = charObj.id
}

charForm.addEventListener("submit",function(evt){
    evt.preventDefault()
    // console.log(this.userInput.value);
  
    let calInput = parseInt(this.calorie.value)
    let charId = this.characterId.value

  
   let objChar = charObjs.find((obj) => {
           return obj.id === parseInt(charId)
        })
// debugger
    let newCal = calInput += parseInt(objChar["calories"])
    console.log(newCal);
    console.log(objChar);
   
    fetch(`http://localhost:3000/characters/${charId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
            calories: newCal
        })
    })
    .then(response => response.json())
    .then((updatedChar) => {
        charForm.reset()
        renderCharInfo(updatedChar);
    })
})


// Clicks on a Reset Calories button to set calories to 0. Persist calories value to the server and update the DOM.

const resetButt = document.querySelector("#reset-btn");

resetButt.addEventListener("click", function(evt) {
    console.log(this.closest('div'));
    let calInput = parseInt(this.calorie.value)
    let charId = this.characterId.value

  
   let objChar = charObjs.find((obj) => {
           return obj.id === parseInt(charId)
        })
// debugger
    let newCal = 0
   
    fetch(`http://localhost:3000/characters/${charId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
            calories: newCal
        })
    })
    .then(response => response.json())
    .then((updatedChar) => {
        charForm.reset()
        renderCharInfo(updatedChar);
    })
})