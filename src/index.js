// Added on page load
let characterBar = document.querySelector('#character-bar')
let detailedInfo = document.querySelector(`#detailed-info`)
let characterName = document.querySelector('#name')
let characterImg = document.querySelector('#image')
let characterCalories = document.querySelector(`#calories`)
let addButton = document.getElementsByTagName('submit')



// Step 1. Add characters to bar

fetch(`http://localhost:3000/characters`)
.then(res => res.json())
.then((characters) => {
    //console.log(characters)
    characters.forEach(slapOnTheDom)
})

let slapOnTheDom = (singleCharacter) => {
    // {} => <span></span>
    //blank sheet
    let cSpan = document.createElement("span")

    //razmataz
    cSpan.innerText = singleCharacter.name

    //append
    characterBar.append(cSpan)

// Step 2. add event listener that displays individual character info
    cSpan.addEventListener("click", (evt) => { 
        evt.preventDefault
        fetch(`http://localhost:3000/characters/${singleCharacter.id}`, renderCharacters)
      
        let renderCharacters = (character) => {
            characterName.innerText = character.name
            characterImg.src = character.src
            characterCalories.innerText = character.calories

            detailedInfo.append(characterName, characterImg, characterCalories)}
    })
}
// Step 3. Add calories
    function addCalories(evt, character) {
         //prevents defaut
        evt.preventDefault
        //grabs user new input
        addedCalories =  formData()

        //updates backend
        updateBackend(addedCalories, character.id)
        .then(updateFrontend) //updates frontend
        
    }
    function formData() {
        return {
            calories: evt.target.calories.value
        }
    }

    function updateBackend(addedCalories, id) {
        fetch(`http://localhost:3000/characters/${singleCharacter.${id}}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(addedCalories)
        })
        .then(res => res.json())
    }
    
    function updateFrontend(character){
        characterCalories.innerText = ${character.calories}` 
    }

    