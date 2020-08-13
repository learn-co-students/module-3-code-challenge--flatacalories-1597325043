const characterDiv = document.querySelector('#character-bar')
const infoDiv = document.querySelector('.characterInfo')
const form = document.querySelector('#calories-form')

fetch(`http://localhost:3000/characters`)
    .then(r => r.json())
    .then((parsedCharacters) => parsedCharacters.forEach(slapItOnTheDom))
    

function slapItOnTheDom(character) {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character.name
    characterDiv.append(characterSpan)
    //event listener for click event renders characters to DOM
    characterSpan.addEventListener('click', (e) => {
        infoDiv.innerHTML = `
            <div id="detailed-info">
                <p id="name">${character.name}</p>
                <img id="image" src="${character.image}"><!-- display character image here -->
                <h4>Total Calories: <span id="calories">${character.calories}</span> </h4>
                <form id="calories-form">
                    <input type="hidden" value="Character's id" id="${character.id}"> <!-- Assign character id as a value here -->
                    <input type="text" placeholder="Enter Calories">
                    <input type="submit" value="Add Calories">
                </form>
                <button id="reset-btn">Reset Calories</button>
            </div>
            `          
    })//end eventListener //updates DOM
}//end slapItOnTheDom

//TODO: event listener for form
form.addEventListener('submit', (evt) => {
    evt.defaultPrevented()
    console.log(evt)
    const input = evt.targer

    fetch(`http://localhost:3000/characters/${character.id}`,{
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            calories: input
        })
    })
    .then(r => r.json())
    .then(updatedCharacter => {
        
    })
})