// Stable elements
const characterBarDiv = document.querySelector("#character-bar"),
      newCharacterForm = document.querySelector("#new-character-form"),
      newNameInput = document.querySelector("#new-name"),
      newImgInput = document.querySelector("#new-img"),
      newCaloriesInput = document.querySelector("#new-calories"),
      detailedInfoDiv = document.querySelector("#detailed-info"),
      characterNameEl = document.querySelector("#name"),
      characterImgEl = document.querySelector("#image"),
      characterCaloriesEl = document.querySelector("#calories"),
      caloriesForm = document.querySelector("#calories-form"),
      characterIdInput = document.querySelector("#characterId"),
      caloriesInput = characterIdInput.nextElementSibling,
      resetBtn = document.querySelector("#reset-btn"),
      changeNameBtn = document.querySelector("#change-name-btn"),
      nameForm = document.querySelector("#name-form"),
      nameInput = nameForm.firstElementChild,
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

  // On reset button click, call resetCharacterCalories()
  resetBtn.addEventListener("click", resetCharacterCalories);

  // On change name button click, call updateCharacterName()
  changeNameBtn.addEventListener("click", displayNameForm)
}

// Function to persist calories to the server and update the DOM
function updateCharacterCalories(evt) {
  evt.preventDefault();
  
  const idInput = evt.target.querySelector("#characterId").value;

  // Update allCharacters array: first find the character, then change their calories input
  const updatedCharacter = findCharacterById(idInput);
  
  // Only update the character's calories if the user input a valid parsable number
  if (parseInt(caloriesInput.value)) {
    updatedCharacter.calories += parseInt(caloriesInput.value);
  }

  evt.target.reset();

  // Call updateCharacter to persist into server and update DOM
  updateCharacter(idInput, updatedCharacter); 
}

// Helper function, takes in an idInput and an updatedCharacter object, make patch request, and display updatedCharacter's on detailedInfoDiv
function updateCharacter(idInput, updatedCharacter) {
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

function resetCharacterCalories(evt) {
  const idInput = characterIdInput.value;

  // Find the character object in memory and update calories
  const updatedCharacter = findCharacterById(idInput);
  updatedCharacter.calories = 0;

  // Make a fetch patch request and update the character's calories in server
  updateCharacter(idInput, updatedCharacter);
}

function displayNameForm() {
  // Unhide name form
  nameForm.hidden = false;

  // On form submission, update the character's name
  nameForm.addEventListener("submit", updateCharacterName)
}

function updateCharacterName(evt) {
  evt.preventDefault();

  const idInput = characterIdInput.value;
  const updatedCharacter = findCharacterById(idInput);

  // Only update the character's name if the user input a valid string
  if (nameInput.value.length > 0) {
    updatedCharacter.name = nameInput.value;
  }
  
  evt.target.reset();

  // Update the character in server and change the detailedInfoDiv
  updateCharacter(idInput, updatedCharacter);

  // Update the characterBarDiv: first reset characterBarDiv, then call makeCharacterSpan() and addToBarDiv()
  characterBarDiv.innerHTML = '';
  allCharacters.forEach(character => addToCharacterBarDiv(makeCharacterSpan(character)));

  // Hide the change name form
  nameForm.hidden = true;
}

// Helper function, takes in a string/integer of an id, and return the character object by that id
function findCharacterById(id) {
  return allCharacters.find(character => character.id == id)
}

// On new character form submission, create a new character, push to allCharacters, update character bar, persist into server via post request
newCharacterForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCharacter = {
    name: newNameInput.value,
    image: newImgInput.value,
    calories: parseInt(newCaloriesInput.value)
  }

  allCharacters.push(newCharacter)

  // Update the characterBarDiv: first reset characterBarDiv, then call makeCharacterSpan() and addToBarDiv()
  characterBarDiv.innerHTML = '';
  allCharacters.forEach(character => addToCharacterBarDiv(makeCharacterSpan(character)));

  postCharacter(newCharacter);

  evt.target.reset();
})

function postCharacter(newCharacter) {
  fetch('http://localhost:3000/characters', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(newCharacter)
  })
    .then(response => response.json())
    .then(newCharacter => {
      seeCharacterInfo(newCharacter);
      
      // Assign id to object in memory
      allCharacters[allCharacters.length - 1].id = newCharacter.id
    });
}