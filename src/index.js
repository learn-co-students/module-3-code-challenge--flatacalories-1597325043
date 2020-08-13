//Stable elements
let charBar = document.querySelector('#character-bar')
let namePar = document.querySelector('#name')
let imgTag = document.querySelector('#image')

// fetch all character array from api
fetch("http://localhost:3000/characters")
.then(res=> res.json())
.then(characterArr => characterArr.forEach((char) => {
    renderCharacter(char)
    
}))

//function to render characters within the bar
let renderCharacter = (charObj) => {

    //Span for character bar with name of each charcter and append to character bar
    let newSpan = document.createElement('span')
        newSpan.innerText = charObj.name
            charBar.append(newSpan)

    newSpan.addEventListener('click', (evt) => {
        console.log(evt.target.innerText)
        namePar.innerText = charObj.name
        imgTag.src = charObj.image

    })
    

}