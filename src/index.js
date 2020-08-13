let divCharBar = document.querySelector("#character-bar")
let divDetailInfo = document.querySelector("#detailed-info")
let divDetailPTag = document.querySelector("p#name")
let divDetailImg = document.querySelector("img#image")
let divDetailCals = document.querySelector("span#calories")
let charForm = document.querySelector("#calories-form")
console.log(divDetailPTag)



fetch("http://localhost:3000/characters")
.then(resp => resp.json())
.then((charArr) => {
    //console.log(singleChar)

    charArr.forEach(charObj => {
        //console.log(charObj)
        showCharOnDom(charObj)
    })
    
})


let showCharOnDom = (charObj) => {
    //console.log(charObj)

    let spanCharElement = document.createElement("span")
    spanCharElement.innerText = charObj.name

    
    divCharBar.append(spanCharElement)
    divCharBar.addEventListener("click", (event) => {
        charName = charObj.name
        divDetailPTag.innerText = charName
    
        charImg = charObj.image
        divDetailImg.src = charObj.image
    
        charCals = charObj.calories
        divDetailCals.innerText = charCals
    
        divDetailInfo.append(charName, charImg, charCals)
    })
   
    }

    
charForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
//ok my evt is not being recognized by html, says method not defined so 
//am having troub
    let calsThatUserInputs = evt.target.calories.value

    fetch("http://localhost:3000/characters", {
        method: "POST",

        headers:{
            "content-type": "application-json"
        },
        body: JSON.stringify({
            calories: calsThatUserInputs
        })
    })

    .then(resp => resp.json())
    .then(newlyAddedCalories => {
        console.log(newlyAddedCalories)
    })

})