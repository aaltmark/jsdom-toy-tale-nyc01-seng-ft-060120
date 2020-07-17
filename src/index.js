let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  fetch("http://localhost:3000/toys/")
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      //console.log(json[0].name)
      json.forEach(el => makeCard(el))
    })
    function makeCard(toy) {
      const toyCollection = document.getElementById("toy-collection")
      const toyDiv = document.createElement("div")
      toyDiv.className = "card"
      toyDiv.id = toy.id
      let h2 = document.createElement("h2")
      h2.innerHTML = `${toy.name}`
      toyDiv.append(h2)

      let img = document.createElement("img")
      img.src = `${toy.image}`
      img.className = "toy-avatar"
      toyDiv.append(img)

      let likes = document.createElement("p")
      likes.innerText = `${toy.likes} Likes`
      toyDiv.append(likes)

      let likeButton = document.createElement("button")
      likeButton.className = "like-btn"
      likeButton.innerHTML = "Like <3"
      toyDiv.append(likeButton)
    
      toyCollection.append(toyDiv)
    }
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  

  const newToyForm = document.querySelector(".add-toy-form")
  
  
  newToyForm.addEventListener("submit", function(e){
    e.preventDefault();
    const data = {
      "name": newToyForm.name.value,
      "image": newToyForm.image.value,
      "likes": 0
    }
    fetch ("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
  
      .then(response => response.json())
      .then(toy => {
        makeCard(toy)
      })
    }
  )
  
   const toyList = document.getElementById('toy-collection')
   toyList.addEventListener('click', function(event) {
     if (event.target.matches('.like-btn')) {
       increaseLikes(event)
     }

   })

   function increaseLikes(event) {
     let id = event.target.parentNode.id
     let clickedButton = event.target
     let parentDiv = clickedButton.parentElement
     let pTag = parentDiv.querySelector('p')
     let count = pTag.innerText = parseInt(pTag.innerText, 10) + 1 

   

   fetch (`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'likes': count
    })
   })
   .then(response => response.json())
  .then(pTag.innerText = count + ' likes')
  

 }
   


});
