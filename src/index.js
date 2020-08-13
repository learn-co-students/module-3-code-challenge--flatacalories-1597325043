console.log("Hi");

let characterDiv = document.querySelector("#character-bar")
let characterInfoDiv = document.querySelector("#detailed-info")
let innerCharP = document.querySelector("p#name")
let innerCharImg = document.querySelector("img#image")
let addCalorieButton = document.querySelector("#calories-form")
let userInputCalories = document.querySelector("#calories")


fetch('http://localhost:3000/characters')
.then(res => res.json())
.then((characterArr) => {
    characterArr.forEach((singleCharObj) => {
        //console.log(singleCharObj)
       turnCharToSpan(singleCharObj) 
   })
})

let turnCharToSpan = (singleCharObj) => {
   let singleCharObjSp = document.createElement('span')
   singleCharObjSp.innerText = singleCharObj.name
    characterDiv.append(singleCharObjSp)
    
    singleCharObjSp.addEventListener("click", (evt) => {
    console.log(evt);
            let innerCharP = document.querySelector('p')
            innerCharP.innerText = singleCharObj.name

            let innerCharImg = document.querySelector('img#image')
            innerCharImg.src = singleCharObj.image

            let innerCharCal = document.querySelector("#calories")
            innerCharCal.innerText = singleCharObj.calories
    })
    addCalorieButton.addEventListener("submit", (evt) => {
    evt.preventDefault()
   //let userInputCalories = evt.target[""].value
   singleCharObj.id = evt.target.value
    console.log(userInputCalories);
})
}
//addCalorieButton is inside scope, console.logs 6 times, was working on this

/* For this deliverable:
"Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.", I would continue by creating a PATCH to increment the number of calories to the "#calories".*/
