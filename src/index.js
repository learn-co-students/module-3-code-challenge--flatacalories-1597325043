const characterBarDiv = document.getElementById('character-bar');
const detailedInfoDiv = document.getElementById('detailed-info');
const characterNameP = document.getElementById('name');
const characterImg = document.getElementById('image');
const characterCaloriesSpan = document.getElementById('calories');
const caloriesForm = document.getElementById('calories-form');
const caloriesResetButton = document.getElementById('reset-btn');
const updateNameDiv = document.getElementById('update-name');
const updateNameB = document.getElementById('update-name-btn');
const addCharacterDiv = document.getElementById('add-character');
const addCharacterB = document.getElementById('add-character-btn');

fetchAndDisplayCharacterNames();
caloriesForm.addEventListener('submit', patchCalories);
caloriesResetButton.addEventListener('click', resetCalories);
updateNameB.addEventListener('click', toggleUpdateNameForm);
addCharacterB.addEventListener('click', toggleAddCharacterForm);

function toggleAddCharacterForm(e) {
  const addCharacterForm = document.getElementById('add-character-form');
  const hasForm = addCharacterForm !== null

  if (hasForm) {
    addCharacterForm.remove()
  } else {
    const newForm = createNewcharacterForm();
    addCharacterDiv.append(newForm);
  }
}

function createNewcharacterForm() {
  const form = document.createElement('form');
    form.id = "add-character-form";
    form.dataset['charId'] = caloriesForm['characterId'].value;
    form.addEventListener('submit', postCharacter);

  const inputName = document.createElement('input');
    inputName.type = "text";
    inputName.id = "new-character-name";
    inputName.placeholder = "enter a name";
    inputName.style.marginRight = "5px";

  const inputImg = document.createElement('input');
    inputImg.type = "text";
    inputImg.id = "new-character-image"
    inputImg.placeholder = "enter an image url"
    inputImg.style.marginRight = "5px";

  const inputSubmit = document.createElement('input');
    inputSubmit.type = "submit";
    inputSubmit.value ="Add";

  form.append(inputName, inputImg, inputSubmit);

  return form;
}

function postCharacter(e) {
  e.preventDefault();
  form = e.target;

  const name = form['new-character-name'].value;
  const image = form['new-character-image'].value;
  const calories = 0;

  const postConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      calories: calories
    })
  }

  fetch('http://localhost:3000/characters', postConfig)
    .then(res => res.json())
    .then(character => {
      toggleAddCharacterForm();
      addToCharacterBar(character);
      displayCharacter(character);
    })

  e.target.reset();
}

function toggleUpdateNameForm(e) {
  const updateNameForm = document.getElementById('update-name-form');
  const hasForm = updateNameForm !== null 

  if (hasForm) {
    updateNameForm.remove();
  } else {
    const updateForm = createNameUpdateForm();
    updateNameDiv.append(updateForm);
  }
}

function patchName(e) {
  e.preventDefault();

  const charId = e.target.dataset['charId'];
  const updateNameInput = document.getElementById('update-name-input');
  const newName = updateNameInput.value;

  const patchConfig = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: newName
    })
  }

  fetch(`http://localhost:3000/characters/${charId}`, patchConfig)
    .then(res => res.json())
    .then(character => displayCharacter(character))
    .then(_ => toggleUpdateNameForm());
}

function createNameUpdateForm() {
  const form = document.createElement('form');
    form.id = "update-name-form";
    form.dataset['charId'] = caloriesForm['characterId'].value;
    form.addEventListener('submit', patchName);

  const inputName = document.createElement('input');
    inputName.type = "text";
    inputName.id = "update-name-input";
    inputName.value = characterNameP.textContent;
    inputName.style.marginRight = "5px";

  const inputSubmit = document.createElement('input');
    inputSubmit.type = "submit";
    inputSubmit.value ="Update";

  form.append(inputName, inputSubmit);

  return form;
}

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