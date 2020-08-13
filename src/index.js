// Stable elements
const characterBarDiv = document.querySelector("#character-bar"),
      detailedInfoDiv = document.querySelector("#detailed-info"),
      characterNameEl = document.querySelector("#name"),
      characterImgEl = document.querySelector("#image"),
      characterCaloriesEl = document.querySelector("#calories"),
      caloriesForm = document.querySelector("#calories-form"),
      characterIdInput = document.querySelector("#characterId"),
      caloriesInput = characterIdInput.nextElementSibling,
      resetBtn = document.querySelector("#reset-btn");

      allCharacters = [];

// Function to fetch all the characters, add each character to allCharacters array in memory, call makeCharacterSpan() and addToCharacterBarDiv() to display each character; is immediately invoked
(function getCharacters() {
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(characters => {
      characters.forEach(character => { 
        allCharacters.push(character);
        addToCharacterBarDiv(makeCharacterSpan(character));
      });
    });
})()

// Helper function to make a span for a character
function makeCharacterSpan(character) {
  const characterSpan = document.createElement("span");
  characterSpan.innerText = character.name;

  // Calling seeCharacterInfo() on span click, to display character's info on detailedInfoDiv
  characterSpan.addEventListener("click", (evt) => seeCharacterInfo(character));

  return characterSpan;
}

// Helper function to add a span of a character to the characterBarDiv
function addToCharacterBarDiv(characterSpan) {
  characterBarDiv.append(characterSpan);
}

// Function to display a character's info on the detailedInfoDiv
function seeCharacterInfo(character) {
  // Add info
  characterNameEl.innerText = character.name;
  characterImgEl.src = character.image;
  characterCaloriesEl.innerText = character.calories;
  characterIdInput.value = character.id;

  // On caloriesForm submission, should call updateCharacterCalories()
  caloriesForm.addEventListener("submit", updateCharacterCalories);
}

// Function to persist calories to the server and update the DOM
function updateCharacterCalories(evt) {
  evt.preventDefault();
  
  const idInput = evt.target.querySelector("#characterId").value;

  // Update allCharacters array: first find the character, then change their calories input
  const updatedCharacter = allCharacters.find(character => character.id == idInput);
  updatedCharacter.calories += parseInt(caloriesInput.value);
  evt.target.reset();

  // Make a fetch patch request and call seeCharacterInfo() to show the info on detailedInfoDiv
  fetch('http://localhost:3000/characters/' + idInput, {
    method: 'PATCH',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCharacter)
  })
    .then(response => response.json())
    .then(updatedCharacter => {
      seeCharacterInfo(updatedCharacter);
    });
}
