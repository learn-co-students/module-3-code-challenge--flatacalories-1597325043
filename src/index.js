
console.log("It's running")

//make big box
//fill box
//grab contents from it
//post on dom

//edit

//change in db
//change in memory
//change in view


let characterBar = document.querySelector("#character-bar")
let detailedInfo = document.querySelector('#detailed-info')
let characterElement = document.querySelector('#name')
let imageElement = document.querySelector('#image')
let characterInfo = document.querySelector('.characterInfo')
let form =document.querySelector('#calories-form')


 fetch('http://localhost:3000/characters')
  .then(res=> res.json())
  .then((characterData) => {
      characterData.forEach((character) => {
            renderSpan(character)
      })
    //   renderDetail(characterData[3])
  })


  let renderSpan =(singleCharacter) => {
         
     let outerElement = document.createElement("span")
         outerElement.innerText = singleCharacter.name

           characterBar.append(outerElement)

         outerElement.addEventListener('click', (event) => {
             
                 renderDetail(singleCharacter)

         })
  }


  let renderDetail = (char) => {
      
       characterElement.innerText = char.name
       imageElement.src = char.image
       detailedInfo.append(characterElement,imageElement)
       characterInfo.append(detailedInfo)

       document.getElementsByTagName("input")[1].setAttribute("value", 'character id');

     form.addEventListener('submit', (event) => {
          event.preventDefault()
          
        //   let calorie = event.target //unable to find target

                 debugger;


            fetch('http://localhost:3000/characters',{

                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },

                body: JSON.stringify({
                   calories: char.calories
                    //
                })

            })

            .then(res => res.json())
            .then((updatedObject) => {
                //unable to find value
               
            })
      })


  }