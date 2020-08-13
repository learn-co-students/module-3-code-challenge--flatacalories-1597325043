const name = document.querySelector('#name');
const calories = document.querySelector('#calories');
const caloriesForm = document.querySelector('#calories-form');
const resetButton = document.querySelector('#reset-btn');
const detailedInfo = document.querySelector('#detailed-info');
const charInfo = document.querySelector('.characterInfo');
const characterBar = document.querySelector('#character-bar'); // show characters names here
const image = document.querySelector('#image'); // display character image here
const formID = document.querySelector('#characterId'); // Assign character id as a value here

const BASE_URL = 'http://localhost:3000/characters';

fetch(BASE_URL)
  .then((response) => response.json())
  .then((characterArray) => {
    displayCharacter(characterArray[0]);
    characterArray.forEach((character) => {
      characterHTML(character);
    });
    addNewCharacter();
  });

const characterHTML = (character) => {
  const API_PATH = `/${character.id}`;
  const calories = parseInt(character.calories);

  const characterSpan = document.createElement('span');
  characterBar.append(characterSpan);
  characterSpan.innerText = character.name;

  characterSpan.addEventListener('click', (event) => {
    displayCharacter(character);
    changeName(character);

    caloriesForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formID = character.id;

      const addedCalories = event.target.calories.value;
      const newCalories = parseInt(calories, 10) + parseInt(addedCalories, 10);

      fetch(`${BASE_URL}${API_PATH}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify({
          calories: newCalories,
        }),
      })
        .then((response) => response.json())
        .then((updatedCharacter) => {
          displayCharacter(updatedCharacter);
        });
    });

    resetButton.addEventListener('click', (event) => {
      fetch(`${BASE_URL}${API_PATH}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify({
          calories: 0,
        }),
      })
        .then((response) => response.json())
        .then((updatedCharacter) => {
          displayCharacter(updatedCharacter);
        });
    });
  });
};

const displayCharacter = (character) => {
  name.innerText = character.name;
  image.src = character.image;
  calories.innerText = character.calories;
};

const changeName = (character) => {
  const API_PATH = `/${character.id}`;

  nameForm = document.createElement('form');
  nameInput = document.createElement('input');
  nameSubmit = document.createElement('button');
  nameInput.id = 'name';
  nameSubmit.value = 'Edit Name';
  nameSubmit.innerText = 'Edit Name';
  nameInput.placeholder = 'Edit Name';

  nameForm.append(nameInput, nameSubmit);

  detailedInfo.append(nameForm);

  nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newName = event.target.name.value;

    fetch(`${BASE_URL}${API_PATH}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify({
        name: newName,
      }),
    })
      .then((response) => response.json())
      .then((updatedCharacter) => {
        displayCharacter(updatedCharacter);
      });
  });
};

const addNewCharacter = () => {
  const newChrDiv = document.createElement('div');
  newChrDiv.id = 'new-chr-div';

  const newChrH5 = document.createElement('h5');
  newChrH5.innerText = 'Create New Character';

  const newChrForm = document.createElement('form');
  newChrForm.id = 'new-chr';

  const newChrName = document.createElement('input');
  newChrName.id = 'new-chr-name';
  newChrName.placeholder = 'Name';

  const newChrImage = document.createElement('input');
  newChrImage.id = 'new-chr-img';
  newChrImage.placeholder = 'Image URL';

  const newChrCalories = document.createElement('input');
  newChrCalories.id = 'new-chr-cal';
  newChrCalories.placeholder = 'Calories';

  const submitNewChr = document.createElement('button');
  submitNewChr.innerText = 'Add New Character';

  newChrForm.append(
    newChrName,
    newChrImage,
    newChrCalories,
    submitNewChr,
  );

  newChrDiv.append(
    newChrH5,
    newChrForm,
  );

  charInfo.append(newChrDiv);

  newChrForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = event.target['new-chr-name'].value;
    const image = event.target['new-chr-img'].value;
    const cal = event.target['new-chr-cal'].value;

    const attributePost = {
      name,
      image,
      calories: cal,
    };

    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(attributePost),
    })
      .then((response) => response.json())
      .then((updatedCharacter) => {
        characterHTML(updatedCharacter);
        displayCharacter(updatedCharacter);
      });
  });
};
