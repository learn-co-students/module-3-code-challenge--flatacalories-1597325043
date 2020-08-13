//Stable elements
let charBar = document.querySelector('#character-bar')


// fetch all character array from api
fetch("http://localhost:3000/characters")
.then(res=> res.json())
.then(characterArr => characterArr.forEach((char) => {
    renderCharacter(char)
}))

//function to render characters within the bar
let renderCharacter = (charObj) => {
    
    let newSpan = document.createElement('span')
        newSpan.innerText = charObj.name
        console.log(newSpan) 
}