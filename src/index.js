const characterBarDiv = document.getElementById('character-bar');
const detailedInfoDiv = document.getElementById('detailed-info');
const characterNameP = document.getElementById('name');
const characterImg = document.getElementById('image');
const characterCaloriesSpan = document.getElementById('calories');
const caloriesForm = document.getElementById('calories-form');
const caloriesResetButton = document.getElementById('reset-btn');

fetchAndDisplayCharacterNames();
caloriesForm.addEventListener('submit', patchCalories);
caloriesResetButton.addEventListener('click', resetCalories);

function patchCalories(e) {
  e.preventDefault();
  const characterId = caloriesForm['characterId'].value;
  const caloriesInput = caloriesForm.querySelector('input:nth-child(2)');
  const caloriesInputValue = parseInt(caloriesInput.value);
  const currentCalories = parseInt(characterCaloriesSpan.textContent);
  const newCalories = currentCalories + caloriesInputValue;

  const patchConfig = {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      calories: newCalories
    })
  }

  fetch(`http://localhost:3000/characters/${characterId}`, patchConfig)
    .then(res => res.json())
    .then(character => displayCharacter(character));

  e.target.reset();
}

function resetCalories(e) {
  const characterId = caloriesForm['characterId'].value;

  const patchConfig = {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      calories: 0
    })
  }
  
  fetch(`http://localhost:3000/characters/${characterId}`, patchConfig)
    .then(res => res.json())
    .then(character => displayCharacter(character));
}

function fetchAndDisplayCharacterNames() {
  fetch('http://localhost:3000/characters')
    .then(res => res.json())
    .then(characters => characters.forEach(character => addToCharacterBar(character)));
}

function addToCharacterBar(character) {
  const span = document.createElement('span');
    span.textContent = character.name;
    span.dataset['charId'] = character.id;
    span.style.cursor = "pointer";
    span.addEventListener('click', fetchAndDisplayCharacter);

  characterBarDiv.append(span);
}

function fetchAndDisplayCharacter(e) {
  const charId = e.target.dataset['charId'];
  fetch(`http://localhost:3000/characters/${charId}`)
    .then(res => res.json())
    .then(character => displayCharacter(character));
}

function displayCharacter(character) {
  characterNameP.textContent = character.name;
  characterImg.src = character.image;
  characterCaloriesSpan.textContent = character.calories;
  caloriesForm['characterId'].value = character.id;
}