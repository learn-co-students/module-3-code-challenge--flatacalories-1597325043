const name = document.querySelector("#name");
const calories = document.querySelector("#calories");
const caloriesForm = document.querySelector("#calories-form");
const resetButton = document.querySelector("#reset-btn");
const detailedInfo = document.querySelector('#detailed-info');

const characterBar = document.querySelector("#character-bar"); // show characters names here
const image = document.querySelector("#image"); // display character image here
const formID = document.querySelector("#characterId"); // Assign character id as a value here

const BASE_URL = "http://localhost:3000/characters";

fetch(BASE_URL)
  .then((response) => response.json())
  .then((characterArray) => {
    displayCharacter(characterArray[0]);
    characterArray.forEach((character) => {
      characterHTML(character);
    });
  });

const characterHTML = (character) => {
  const API_PATH = `/${character.id}`;
  const calories = parseInt(character.calories);

  const characterSpan = document.createElement("span");
  characterBar.append(characterSpan);
  characterSpan.innerText = character.name;

  characterSpan.addEventListener("click", (event) => {
    displayCharacter(character);
    changeName(character);

    caloriesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formID = character.id;

      const addedCalories = event.target.calories.value;
      const newCalories = parseInt(calories, 10) + parseInt(addedCalories, 10);

      fetch(`${BASE_URL}${API_PATH}`, {
        method: "PATCH",
        headers: {
          "Content-type": "Application/json",
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

    resetButton.addEventListener("click", (event) => {
      fetch(`${BASE_URL}${API_PATH}`, {
        method: "PATCH",
        headers: {
          "Content-type": "Application/json",
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
  
  nameForm = document.createElement("form");
  nameInput = document.createElement("input");
  nameSubmit = document.createElement("button");
  nameInput.id = 'name'
  nameSubmit.value = "Edit Name";
  nameInput.placeholder = 'Edit Name';

  nameForm.append(nameInput, nameSubmit);

  detailedInfo.append(nameForm);

  nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newName = event.target.name.value;

    fetch(`${BASE_URL}${API_PATH}`, {
      method: "PATCH",
      headers: {
        "Content-type": "Application/json",
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
