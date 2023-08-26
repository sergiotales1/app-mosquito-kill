// using a window method to find the total height and width to spawn the mosquitos into a visible place

var totalHeight = 0
var totalWidth = 0

// declaring the variable that will be responsible to change the life points
var life = 1

var time = 10

// starter time of mosquito respawn
var mosquitoRespawnTime = 1500

var level = window.location.search
level = level.replace('?', '')

if (level === 'normal') {
   // 1500 milliseconds or 1,5s
   mosquitoRespawnTime = 1500

} else if (level === 'hard') {
   // 1000 milliseconds or 1s
   mosquitoRespawnTime = 1000

} else if (level === 'chucknorris') {
   // 750 milliseconds or .75s
   mosquitoRespawnTime = 750
}


// timer to manage the remain time
var timer = setInterval(function(){

   time--
   if (time < 0) {
      clearInterval(timer)
      // here we are finishing the game if the user win, we clear the interval of both variables (timer and createMosquitos) to stop the timer from being below 0 and to stop creating more mosquitos once the game is finished
      clearInterval(createMosquitos)
      window.location.href = 'win.html'
   } else {
      document.getElementById('time').innerHTML = time
   }

}, 1000)

function setTotalGameScreen() {
   // with a onresize atribute into <body> we change the totalWidth and totalHeight of the screen 
   totalHeight = window.innerHeight
   totalWidth = window.innerWidth
   console.log(totalWidth, totalHeight)
}

setTotalGameScreen()

function randomPosition() {
   // generating the positionX and positionY randomly (where the mosquito will appear) 
   // now we are generating numbers from 0 to 1 but multiplying them for the totalWidth and totalHeight value, limiting to numbers that floats by 0 and 100% totalWidth / Height
   var positionX = Math.floor(Math.random() * totalWidth) - 120
   var positionY = Math.floor(Math.random() * totalHeight) - 120 // -90 avoids the mosquito to receive the max width or height allowed
   
   
   // we use a ternary operator to check, if the position is less than zero (that can occur because of the -90 that we set to avoid mosquitos bad placed) them the position is going to be 0, if its more than zero the position is going to be its original number
   positionX = positionX < 0 ? 0 : positionX
   positionY = positionY < 0 ? 0 : positionY
   
   console.log(positionX, positionY)
   
   // removing the previous mosquito if there is any
   if (document.getElementById('mosquito')) { // JavaScript recognizes this as true, if its null the block will not be done
      document.getElementById('mosquito').remove()

      if (life > 3) {
         window.location.href = 'gameover.html'

      } else {
         document.getElementById('v' + life).src = 'image/coracao_vazio.png'
         life++
      }
   }

   // create the HTML element (the image)
   var mosquitoImg = document.createElement('img')
   
   mosquitoImg.src = 'image/mosquito.png'
   mosquitoImg.className = randomSize() + " " + randomSide()
   // positioning the randomly mosquito
   mosquitoImg.style.left = positionX + 'px'  
   mosquitoImg.style.top = positionY + 'px'
   mosquitoImg.style.position = 'absolute'  
   mosquitoImg.id = 'mosquito'
   mosquitoImg.onclick = function() {
      this.remove()
   }
   // appending the elemento to the document tree
   document.body.appendChild(mosquitoImg)
   
}

function randomSize() {
   // randomSize is the function that with the aux of a logical will generate 3 different options of number (0, 1, 2), them each one of these numbers will be assigned as one css class (mosquito1 has 50px w/ h, mosquito2 70px w/ h, and mosquito3 90px w/ h) making the things more randomly and vivid
   var class1 = Math.floor(Math.random() * 3) 

   switch(class1) {
      case 0:
         return 'mosquito1'
      case 1: 
         return 'mosquito2'
      case 2: 
         return 'mosquito3'
   }
}

function randomSide() {
   // same logic as randomSize, the difference is that we are only using 2 cases, mosquito looking right and mosquito looking left
   var class2 = Math.floor(Math.random() * 2) 

   switch(class2) {
      case 0:
         return 'sideA'
      case 1: 
         return 'sideB'
   }
}

// LOG 1.0: So far we created the randomPosition that by using a window method tells us the real size of the screen, after that this function will create the HTML element (mosquito image) receiving random math positions sent by the Math.random method, after creating the new html element every 1s using setInterval (html file) the randomPosition will apply using randomSize a logic to create 3 different sizes of mosquito (.mosquito1, .mosquito2, .mosquito3 ) and using randomSide two different directions of looking mosquito (right as .sideA and left as .sideB) 
// PS LOG 1.0: we also remove the existing HTML element to stop mosquitos SPAM in the screen.

// LOG 1.1: here we created the scenario with background and also created the setInterval(time) which is a function that will redirect the user to the win page if he survive the enough time, or will redirect him to the gameOver page if his life goes to 0, to make it possible, we add the usability to remove the HTML element mosquitoIMG each time that it has been clicked, if we don't click it, the 'life' variable will be increased by 1, once it gets more than 3 its game over.

// after that, we created win.html and gameOver.html with a image and a button that will redirect (if he wants) the user to the index.html page which has the attribution to offer 3 different levels, each one level chosen will redirect the user to app.html where the game is. sending a message with window.locate.search that will tell the chosen level by the user, with that level in hands we store it into a variable them send it to the main setInverval delay that creates mosquitos .