// Stable ELE
let  charBar = document.querySelector("#character-bar") 
let details = document.querySelector("#detailed-info")
// mainDisplay stable elements 
let name = document.querySelector("#name")
let img = document.querySelector("#image")
let span = document.querySelector("#calories")
// calorie form 
let calorieForm = document.querySelector("#calories-form")


fetch(`http://localhost:3000/characters`)
.then(r => r.json())
.then((charArray) => {
    charArray.forEach(singleChar => {
        turnToSpanBar(singleChar)
    });
})

let turnToSpanBar = (singleChar) => {
    
    let blankSpan = document.createElement("span")
    blankSpan.className = "character-bar"
    blankSpan.innerText = singleChar.name
    charBar.append(blankSpan)
    
    // update form input with iD to update in patch 
    // calorieForm.element[0]
    calorieForm.elements[0].id = singleChar.id

    blankSpan.addEventListener("click", (evt)=> {
        mainDisplay(singleChar)
    })

}

            calorieForm.addEventListener("submit", (evt) => {
                evt.preventDefault()
                let id = calorieForm.elements[0].id
             
                // Having trouble accessing evt.target not returning the input value. Will .parseInt() be needed? for ID?
                
                let userInput = evt.target["characterId"].value
                singleChar.calories+= userInput
                // PATCH because it updating calories
                fetch(`http://localhost:3000/characters/${id}`,{
                    method: "PATCH",
                    headers: {
                        "content-type":"application/json"
                    },
                    body: JSON.stringify({
                        calories: singleChar.calories
                    })
                }).then(r => r.json())
                .then((updatedCalObj) => {
                    span.innerText = updatedCalObj.calories 
                    evt.target.reset()
                })
            })

function mainDisplay (singleChar){
    name.innerText = singleChar.name
    img.src = singleChar.image
    span.innerText = singleChar.calories
}