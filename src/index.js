//stable elements
const characterNameDiv = document.querySelector("#character-bar");
const characterInfoDiv = document.querySelector("#detailed-info");
const nameP = document.querySelector("#name");
const image = document.querySelector("#image");
const caloriesSpan = document.querySelector("#calories");

const caloriesForm = document.querySelector("#calories-form");
const formInput = document.querySelector("input#characterId");
const userInput = document.querySelector("input").nextElementSibling;
userInput.name = "formCalorie";

fetch("http://localhost:3000/characters")
  .then((response) => response.json())
  .then((charactersArray) => {
    charactersArray.forEach((characterObj) => {
      convertToHtml(characterObj);
    });
    //convertToHtml(charactersArray[2])
  });

let convertToHtml = (character) => {
  const nameSpan = document.createElement("span");
  nameSpan.innerText = character.name;
  characterNameDiv.append(nameSpan);

  nameSpan.addEventListener("click", (event) => {
    characterInfoToHtml(character);
  });

  function characterInfoToHtml(charObj) {
    nameP.innerText = charObj.name;
    image.src = charObj.image;
    caloriesSpan.innerText = charObj.calories;
    formInput.value = charObj.id;
  }

  caloriesForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let calorieInput = event.target.formCalorie.value;
    let charId = event.target.characterId.value;

    fetch(`http://localhost:3000/characters/${charId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calories: calorieInput,
      })
    })
      .then((response) => response.json())
      .then((updatedChar) => {
        characterInfoToHtml(updatedChar);
        caloriesForm.reset();
      });
  });
};
