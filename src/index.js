const charactersDiv = document.querySelector("#character-bar")
const characterDetailedInfo = document.querySelector("#detailed-info")
const characterForm = document.querySelector("#calories-form")
fetch ("http://localhost:3000/characters")
  .then(res => res.json())
  .then((characters) => {
     // console.log(characters)
     characters.forEach(eachCharacter => {
         console.log(eachCharacter)
         turnEachToSpan(eachCharacter) // need to call the function 
     });
      
  })

  //you'll need to add a `span` tag with the character's name to the character bar
  let turnEachToSpan = (characterObj) => {
      console.log(characterObj)
      
      let spanElement = document.createElement("span")
      //<span>name</span>
      spanElement.innerHTML = `${characterObj.name}`
      charactersDiv.append(spanElement)

// each character from the character bar info :name, image and calories 

      spanElement.addEventListener("click", (evt) => {
        //inside <div></div>
          characterDetailedInfo.innerHTML = 
      
          `<p id="name">${characterObj.name}</p>
          <img id="image" src=${characterObj.image}>
          <h4>Total Calories: <span id="calories">${characterObj.calories}</span> </h4>
          <button id="add-calories">Add Calories </button>
          <input id= "calories-btn" "type="text" placeholder="Enter Calories"/>`
        })
        
        //"Add Calories" button to add calories to a Character

  }

  //let caloriesBtn = document.createElement("#calories-btn")
  let caloriesBtn = document.querySelector("#calories-btn")

  caloriesBtn.addEventListener("submit", (evt) => {
      evt.preventDefault()
    let caloriesInput = evt.target.text.value
  


    fetch('http://localhost:3000/characters/${characterObj.id}', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      calories: caloriesInput,
  })
  .then(res => res.json())
  .then((newCalories) => {
      turnNewCaloriesToHtm(newCalories)
      
  })
})
      
  })
 

{/* <form id="calories-form">
                    <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
                    <input type="text" placeholder="Enter Calories"/>
                    <input type="submit" value="Add Calories"/>
                </form> */}
