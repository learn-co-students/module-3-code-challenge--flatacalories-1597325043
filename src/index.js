let charBar = document.querySelector("div#character-bar")
// console.log(charBar)
let detailedInfo = document.querySelector("div#detailed-info")
// console.log(detailedInfo)
let charForm = document.querySelector("#calories-form")

fetch(`http://localhost:3000/characters`)
.then(res => res.json())
.then((charArr) => {
    // console.log(charArr)
    charArr.forEach((singleChar) => {
        // console.log(singleChar)
        turnCharToSpan(singleChar)
    })
})

let turnCharToSpan = (charObj) => {
    let outerCharSpan = document.createElement("span")
        // outerCharSpan.className = "character-info"

    let charNameP = document.createElement("p")
        charNameP.innerText = charObj.name

    let charImage = document.createElement("img")
        charImage.src = charObj.image
    
    let charCalH4 = document.createElement("H4")
        charCalH4.innerText = `Total Calories: ${charObj.calories}`
   
    let calButton = document.createElement("button")
        calButton.className = "cal-btn"
        calButton.innerText = "Add Calories"
       
    detailedInfo.append(charNameP, charImage, charCalH4, calButton)
    
    charBar.append(outerCharSpan)
    }

    calButton.addEventListener("click", (evt) => {
        charObj.calories += 1

        fetch(`http://localhost:3000/characters/${charObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                calories: charObj.calories
            })
        })
        .then(res => res.json())
        .then((updatedChar) => {
            charCalH4.innerText = `${updatedChar.calories} Calories`
        })
    })



// charForm.addEventListener("character", (evt) => {
//     evt.preventDefault()
//     let charNameP = evt.target.name.value
//     let charImage = evt.target.image.value

//     fetch(`http://localhost:3000/characters`, {
//         method: "POST",
//         headers: {
//             "Content-type": "Application/json"
//         },
//         body: JSON.stringify({
//             name: charNameP,
//             image: charImage,
//             calories: 0
//         })
//     })
//     .then(res => res.json())
//     .then((newCharacter) =>{
//         turnCharToSpan(newCharacter)
//     })
// })