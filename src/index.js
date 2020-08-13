//stable elements
//showing the characters on top of screen
let characterBar = document.querySelector("#character-bar")
//showing char detailed info
let detailedInfo = document.querySelector("#detailed-info")
//access to the form
let calForm = document.querySelector("#calories-form")
let charInfo = document.querySelector(".characterInfo")

fetch('http://localhost:3000/characters')
.then(res => res.json())
.then((charArr) => {
    charArr.forEach((singleChar) => {
        turnToHTML(singleChar)
    })
    
})

let turnToHTML = (charObj) => {
    let spanAn = document.createElement("span")
    spanAn.innerText = charObj.name
    characterBar.append(spanAn)
    
    spanAn.addEventListener("click", (evt)=>{
       
        
       detailedInfo.innerHTML = `<p id="name">${charObj.name}</p>
       <img id="image" src=${charObj.image}><!-- display character image here -->
       <h4>Total Calories: <span id="calories">${charObj.calories}</span> </h4>
       <form id="calories-form">
           <input type="hidden" value="${charObj.id}" id="characterId"/> <!-- Assign character id as a value here -->
           <input type="text" placeholder="Enter Calories"/>
           <input type="submit" value="Add Calories"/>
       </form>
       <button id="reset-btn">Reset Calories</button>`
       
    })//end of Evt Listener
    //I am missing the link between character and submitting the form 
    calForm.addEventListener("submit", (evt) => {
        
        evt.preventDefault()
        let userInputOfCalories = evt.target.characterId.value //local obj
        
        fetch(`http://localhost:3000/characters/${charObj.id}`,{
            method: "PATCH",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                calories: userInputOfCalories // backend
            })
        })//end fetch
        .then(res => res.json())
        .then((updatedInfo) => {
            console.log(updatedInfo) // render to dom
        })
    })//end of AEL
    // I know of a update/patch i need to - update local obj, update backend, render to dom

   
}// end of turnToHTML


