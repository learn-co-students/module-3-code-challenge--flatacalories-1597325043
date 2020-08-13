const name = document.querySelector("#name");
let calories = document.querySelector("#calories");
const caloriesForm = document.querySelector("#calories-form");
const resetButton = document.querySelector("#reset-btn");

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
  let calories = parseInt(character.calories);

  const characterSpan = document.createElement("span");
  characterBar.append(characterSpan);
  characterSpan.innerText = character.name;

  characterSpan.addEventListener("click", (event) => {
    displayCharacter(character);

    caloriesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formID = character.id;

      const addedCalories = event.target.calories.value;
      const newCalories = parseInt(calories) + parseInt(addedCalories);

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
