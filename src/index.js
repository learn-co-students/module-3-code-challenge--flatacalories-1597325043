const CHARACTERS_URL = 'http://localhost:3000/characters/'

const characterBarDiv = document.querySelector('div#character-bar')
const characterInfoDiv = document.querySelector('div#detailed-info')
const characterCaloriesForm = characterInfoDiv.querySelector('form#calories-form')
const characterCalories = characterInfoDiv.querySelector('span#calories')
const resetButton = document.querySelector('button#reset-btn')
let charactersArray = []

getCharactersList()

function getCharactersList() {
    fetch(CHARACTERS_URL)
    .then(response => response.json())
    .then(characterObjsArray => {
        characterObjsArray.forEach(characterObj => {
            charactersArray.push(characterObj)
            displayCharacterOnList(characterObj)
        });
        displayCharacterInfo(characterObjsArray[0])
    });
};

function displayCharacterOnList(characterObj) {
    let characterSpan = document.createElement('span')
        characterSpan.innerText = characterObj.name
        
    characterBarDiv.append(characterSpan)

    characterSpan.addEventListener('click', (e) => {
        displayCharacterInfo(characterObj)
    });
};

function displayCharacterInfo(characterObj) {
    let characterName = characterInfoDiv.querySelector('p#name')
        characterName.innerText = characterObj.name

    let characterImage = characterInfoDiv.querySelector('img#image')
        characterImage.src = characterObj.image
    
        characterCaloriesForm.characterId.value = characterObj.id
        characterCalories.innerText = characterObj.calories

};

characterCaloriesForm.addEventListener('submit', function(e){
    e.preventDefault()
    let caloriesInput = parseInt(this.querySelectorAll('input')[1].value) + parseInt(characterCalories.innerText)

    updateCalories(caloriesInput)
});

resetButton.addEventListener('click', (e) => {
    updateCalories(0)
});

function updateCalories(change) {
    fetch(`${CHARACTERS_URL}${characterCaloriesForm.characterId.value}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            calories: change
        })
    })
    .then(response => response.json())
    .then(updatedCharacterObj => {
        let currentCharacterObj = charactersArray.find(character => character.id === updatedCharacterObj.id)
        currentCharacterObj.calories = updatedCharacterObj.calories
        displayCharacterInfo(currentCharacterObj)
        characterCaloriesForm.reset()
    })
};