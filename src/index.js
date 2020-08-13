//Stable elements
let charBar = document.querySelector('#character-bar')
let namePar = document.querySelector('#name')
let imgTag = document.querySelector('#image')
let calorieSpan = document.querySelector('#calories')
let calForm = document.querySelector('#calories-form')

// fetch all character array from api
fetch("http://localhost:3000/characters")
.then(res=> res.json())
.then(characterArr => characterArr.forEach((char) => {
    renderCharacter(char)
    
}))

//function to render characters within the bar
let renderCharacter = (charObj) => {
    console.log(parseInt(charObj.calories) )
    //Span for character bar with name of each charcter and append to character bar
    let newSpan = document.createElement('span')
        newSpan.innerText = charObj.name
            charBar.append(newSpan)

    //When Span button is clicked it shows characters info in detailed info
    newSpan.addEventListener('click', (evt) => {
        namePar.innerText = charObj.name
        imgTag.src = charObj.image
        calorieSpan.innerText = charObj.calories
        addCalories()
    })
    
   

    function addCalories() {

        calForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
                let calInput = parseInt(calForm[1].value)
                let currentCalories = parseInt(charObj.calories) 
                let newCals = currentCalories + calInput
        
            // console.log(newCals)
     

            fetch(`http://localhost:3000/characters/${charObj.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    calories: newCals
                })
            })
            .then(res => res.json())
            .then(updatedCals => 
            calorieSpan.innerText = updatedCals.calories
                )
        })
    }
}