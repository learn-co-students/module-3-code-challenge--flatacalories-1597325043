const charactersDiv = document.querySelector("div#character-bar");
const mainCharacterShow = document.querySelector("div#detailed-info");
const caloriesForm = document.querySelector("form#calories-form");

fetch("http://localhost:3000/characters")
  .then((response) => response.json())
  .then((charactersData) => {
    charactersData.forEach((characterObj) => characterToDOM(characterObj));
  });

const characterToDOM = (characterObj) => {
  const characterSpan = document.createElement("span");
  characterSpan.innerText = characterObj.name;
  charactersDiv.append(characterSpan);

  characterSpan.addEventListener("click", (evt) => {
    const charName = mainCharacterShow.querySelector("p#name");
    const charImage = mainCharacterShow.querySelector("img#image");
    const charCalories = mainCharacterShow.querySelector("h4")
      .firstElementChild;

    charName.innerText = characterObj.name;
    charImage.src = characterObj.image;

    fetch(`http://localhost:3000/characters/${characterObj.id}`)
      .then((response) => response.json())
      .then((theCharacter) => {
        charCalories.innerText = theCharacter.calories;
      });

    const hiddenFormInput = caloriesForm.firstElementChild;
    hiddenFormInput.value = characterObj.id;
    hiddenFormInput.id = characterObj.id;
  });
};
caloriesForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  updateCalories(evt);
});

const updateCalories = (evt) => {
  let formValue = evt.target.firstElementChild.value;
  let calorieValue = evt.target.children[1].value;
  const charCalories = evt.target.closest("div").querySelector("span");
  let addingCalories = parseInt(charCalories.innerText) + parseInt(calorieValue);
  debugger;

  fetch("http://localhost:3000/characters/" + formValue, {
    method: "PATCH",
    credentials: "include",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ calories: `${addingCalories}` }),
  })
    .then((response) => response.json())
    .then((updatedCharacter) => {
      charCalories.innerText = updatedCharacter.calories;
    });
  evt.target.reset();
};
