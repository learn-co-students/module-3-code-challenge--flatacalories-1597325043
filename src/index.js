const charactersDiv = document.querySelector("#character-bar");
const characterInfo = document.querySelector("#detailed-info");
const nameP = document.querySelector("p#name");
const charImage = document.querySelector("img#image");
const caloriesSpan = document.querySelector("span#calories");
const caloriesForm = document.querySelector("form#calories-form");
const charInfo = document.querySelector("input#characterId");
const userInput = document.querySelector("input").nextElementSibling;
userInput.name = "cal";

fetch("http://localhost:3000/characters")
  .then((r) => r.json())
  .then((charactersArr) => {
    charactersArr.forEach((charObj) => {
      turnToHtml(charObj);
    });
  });

let turnToHtml = (singleChar) => {
  let nameSpan = document.createElement("span");
  nameSpan.innerText = singleChar.name;

  charactersDiv.append(nameSpan);
  // EVT LSTNR 4 DOG NAME
  nameSpan.addEventListener("click", (evt) => {
    detailedInfoToHTML(singleChar);
  });

  function detailedInfoToHTML(char) {
    nameP.innerText = char.name;
    charImage.src = char.image;
    caloriesSpan.innerText = char.calories;
    charInfo.value = char.id;
  }

  caloriesForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let currentCalories = evt.target.cal.value;
    let charId = evt.target.characterId.value;
    // console.log(charId);

    fetch(`http://localhost:3000/characters/${charId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "appplication/json",
          Accept: "Application/json",
        },
        body: JSON.stringify({
          calories: currentCalories
        }),
      })
        .then((resp) => resp.json())
        .then((updatedChar) => {
            console.log(updatedChar)
          detailedInfoToHTML(updatedChar);
        });
  });
};
