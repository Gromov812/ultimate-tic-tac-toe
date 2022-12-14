'use strict'

/* Variables */
let newGameButton = document.querySelector('#new--game--button');
let saveGameButton = document.querySelector('#save--button');
let resetScore = document.querySelector('#reset--score');
let switchText = document.querySelector('#switchText');
let container = document.querySelector('.container');
let rows = document.querySelectorAll('.active');
let check = document.querySelector('#checkbox');
let result = document.querySelector('#winner');
let p1 = document.querySelector('#p1');
let p2 = document.querySelector('#p2');
let blocks = document.querySelectorAll('.row');
let cells = document.querySelectorAll('.inner--cell');
let nextField;
let firstMove = true;


let [playerX, playerO, counter, winner,score] = [[],[],0,false,[0,0]];

let winCombs = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[8,7,6]];


let player0 = {
  0:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  1:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  2:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  3:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  4:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  5:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  6:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  7:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  8:{
    'comb':[],
    'counter':0,
    'winner':false
  }
}

let playeriX = {
  0:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  1:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  2:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  3:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  4:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  5:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  6:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  7:{
    'comb':[],
    'counter':0,
    'winner':false
  },
  8:{
    'comb':[],
    'counter':0,
    'winner':false
  }
}

if (nextField == undefined) {
  container.classList.add('box-shadow');
}

let block0 = document.querySelectorAll('[block="0"]');
let block1 = document.querySelectorAll('[block="1"]');
let block2 = document.querySelectorAll('[block="2"]');
let block3 = document.querySelectorAll('[block="3"]');
let block4 = document.querySelectorAll('[block="4"]');
let block5 = document.querySelectorAll('[block="5"]');
let block6 = document.querySelectorAll('[block="6"]');
let block7 = document.querySelectorAll('[block="7"]');
let block8 = document.querySelectorAll('[block="8"]');


/* Check Priority for first move X or O */

// function checkPriority() {
//   if(check.checked) {
//     for (let el in player0) {
//       player0[el]['comb'].length = 0;
//       playeriX[el]['comb'].length = 0;
//     }
//     switchText.innerHTML = 'P1 move first';
//     counter = 0;
//   }
//   else {
//     for (let el in player0) {
      
//       player0[el]['comb'].length = 0;
//       playeriX[el]['comb'].length = 0;
      
//     }
//     switchText.innerHTML = 'P2 move first';
//     counter = 1;
//   }
// }

// check.addEventListener('change', checkPriority);


 /* Call for function gmaePlay() when click on any cell */

for (let el of block0) {
  el.addEventListener('click', gamePlay);
}
for (let el of block1) {
  el.addEventListener('click', gamePlay);
}
for (let el of block2) {
  el.addEventListener('click', gamePlay);
}
for (let el of block3) {
  el.addEventListener('click', gamePlay);
}
for (let el of block4) {
  el.addEventListener('click', gamePlay);
}
for (let el of block5) {
  el.addEventListener('click', gamePlay);
}
for (let el of block6) {
  el.addEventListener('click', gamePlay);
}
for (let el of block7) {
  el.addEventListener('click', gamePlay);
}
for (let el of block8) {
  el.addEventListener('click', gamePlay);
}

/* Cheching for a winner on every click on container */

container.addEventListener('click', checkForAWinner)


function checkForAWinner() {
  if (compare(winCombs, playerO)) {
    result.innerHTML = 'Player 2 win!';
    rows.forEach(el => {
      if (el.classList.contains('box-shadow')) el.classList.remove('box-shadow')
    })
    container.classList.add('win-shadow');
    winner = true;
    score[1]++;
    p2.innerHTML = `P2: ${score[1]}`;
    container.removeEventListener('click', checkForAWinner);
  }
  else if(compare(winCombs, playerX)) {
    result.innerHTML = 'Player 1 win!';
    rows.forEach(el => {
      if (el.classList.contains('box-shadow')) el.classList.remove('box-shadow')
    })
    container.classList.add('win-shadow');
    winner = true;
    score[0]++;
    p1.innerHTML = `P1: ${score[0]}`;
    container.removeEventListener('click', checkForAWinner);
  }
  else if (playerO.length + playerX.length > 8 && (!compare(winCombs, playerX))){
    result.innerHTML = 'It\'s a draw!';
    container.removeEventListener('click', checkForAWinner);
  }
} 


/* Compare function check for player Combination include any winning combination */

function compare(winCombs, playerComb){

  let flag = false;
  for (let el of winCombs) {
    flag = el.every(elem => playerComb.includes(elem));
    if (flag) return true;
  }
  return flag;
}


// for (let el of cells) {
//   el.innerHTML = `${el.getAttribute('block')}`
// }


/* Function of gameplay */

function gamePlay() {

  let block = document.querySelector(`[type="block"][value="${this.getAttribute('block')}"]`);
  let blockNumber = this.getAttribute('block');

  /* Check for draw */ 

 if((player0[blockNumber]['comb'].length + playeriX[blockNumber]['comb'].length) > 7 && !player0[blockNumber]['winner'] && !winner){
  block.setAttribute('ready', false);
  block.innerHTML = 'D';
 }


/* Check X for possibilaty make a move and then check for win */

 if (!(counter % 2) && !winner && this.getAttribute('ready') == 'true' && (nextField == blockNumber || firstMove) && !!block.getAttribute('ready')) {
firstMove = false;
this.setAttribute('ready', 'false');
this.innerHTML = 'X';
result.innerHTML = 'Player O move now';
playeriX[blockNumber]['comb'].push(this.value);
counter++;
nextField = this.value;


if (nextField != undefined && document.querySelector(`[type="block"][value="${nextField}"]`).getAttribute('ready') != 'false') {
  document.querySelector(`[type="block"][value="${this.getAttribute('block')}"]`).classList.remove('box-shadow');
  document.querySelector(`[type="block"][value="${nextField}"]`).classList.add('box-shadow');
  container.classList.remove('box-shadow');
}
else document.querySelector(`[type="block"][value="${this.getAttribute('block')}"]`).classList.remove('box-shadow');
  
console.log(+(document.querySelector(`[type="block"][value="${this.getAttribute('value')}"]`).getAttribute('value')));


  if (playeriX[blockNumber]['comb'].length > 2 && compare(winCombs, playeriX[blockNumber]['comb'])) {
    block.setAttribute('ready', false);
    block.innerHTML = 'X';
    playeriX[blockNumber]['winner'] = true;
    playerX.push(+(blockNumber))

    if (block.getAttribute('ready') == 'false') {
      block.classList.remove('box-shadow');
    }

  }
  if ([...playerO, ...playerX].includes(+(document.querySelector(`[type="block"][value="${this.getAttribute('value')}"]`).getAttribute('value')))) {
    nextField = undefined;
    firstMove = true;
   }
 }  


/* Check O for possibilaty make a move and then check for win */

else if ((counter % 2) && !winner && this.getAttribute('ready') == 'true'&& (nextField == blockNumber || firstMove) && !!block.getAttribute('ready')) {
firstMove = false;
this.setAttribute('ready', 'false');
this.innerHTML = 'O'
result.innerHTML = 'Player X move now';
player0[blockNumber]['comb'].push(this.value)
counter--
nextField = this.value;

if (nextField != undefined && document.querySelector(`[type="block"][value="${nextField}"]`).getAttribute('ready') != 'false') {
  document.querySelector(`[type="block"][value="${this.getAttribute('block')}"]`).classList.remove('box-shadow');
  document.querySelector(`[type="block"][value="${nextField}"]`).classList.add('box-shadow');
  container.classList.remove('box-shadow');
}
else document.querySelector(`[type="block"][value="${this.getAttribute('block')}"]`).classList.remove('box-shadow');



console.log(+block.getAttribute('value'));

//playeriX[this.getAttribute('block')]['counter']--;

  if (player0[blockNumber]['comb'].length > 2 && compare(winCombs, player0[blockNumber]['comb'])) {
   block.setAttribute('ready', false);
   block.innerHTML = 'O';
   player0[blockNumber]['winner'] = true;
   playerO.push(+(blockNumber))

   if (block.getAttribute('ready') == 'false') {
    block.classList.remove('box-shadow');
  }
  } 
  if ([...playerO, ...playerX].includes(+(document.querySelector(`[type="block"][value="${this.getAttribute('value')}"]`).getAttribute('value')))) {
    nextField = undefined;
      firstMove = true;
    }
 }
 let flag = 0;
  for (let el of blocks) {
   
    if (el.classList.contains('box-shadow')) {
    flag++;
    }
   
  }

  if (flag == 0) {
    container.classList.add('box-shadow');
  }
  else container.classList.remove('box-shadow');

}

function checkForAvaliable () {
  
}
// nextField == this.getAttribute('block') && this.getAttribute('ready')
// if !this.getAttribute('ready') nextField = undefined;



/* check for saved games in localStorage and display saved games if it is */

if (localStorage.getItem('data')) {
  let data = localStorage.getItem('data');
  data = JSON.parse(data);
  document.querySelector('.saved--game').innerHTML = `Saved game ${data['date']} <div><a onclick="loadGame()">Load saved</a></div> <div><a onclick="removeSaved()">Remove saved</a></div>`;
}

/* Event on Save game Button that callback func with stringify JSON and push variables in localStorage */

saveGameButton.addEventListener('click', () => {

  let data = {};
  // for (let el of rows){
  //   data[el.value] = el.textContent;
  // }
  data['zero'] = player0;
  data['iX'] = playeriX;
  data['moves'] = [playerX, playerO];
  data['nextField'] = nextField;
  data['firstMove'] = firstMove;

  let date = new Date;
  data['date'] = date.toLocaleString();

  data['score'] = score;
  data['counter'] = counter;

  console.log(data);
  //data['check'] = check.checked;
  localStorage.setItem('data',JSON.stringify(data))
  document.querySelector('.saved--game').innerHTML = `Saved game ${data['date']} <div><a onclick="loadGame()">Load saved</a></div> <div><a onclick="removeSaved()">Remove saved</a></div>`;
})

/* Func that load already saved object 'data' from localStorage and pull variables */

function loadGame() {

  let data = localStorage.getItem('data');
  data = JSON.parse(data);

  console.log(data);
  player0 = data['zero'];
  playeriX = data['iX'];
  playerX = data['moves'][0];
  playerO = data['moves'][1];
  score = data['score'];
  counter = data['counter'];
  nextField = data['nextField'];
  firstMove = data['firstMove'];
  //check.checked = data['check'];
  // switchText.innerHTML = check.checked ? 'P1 move first' : 'P2 move first';
  p1.innerHTML = `P1: ${score[0]}`
  p2.innerHTML = `P2: ${score[1]}`

  if (playerX.length > 2 && compare(winCombs, playerX)) {
    result.innerHTML = 'Player 1 win!';
    winner = true;
  }
  if (playerO.length > 2 && compare(winCombs, playerO)) {
    result.innerHTML = 'Player 2 win!';
    winner = true;
  }

  for (let el of rows){

    if (data['iX'][`${el.value}`]['winner']){
      el.textContent = 'X'
    }

    if (data['zero'][`${el.value}`]['winner']){
      el.textContent = 'O'
    }
    el.setAttribute('ready', false);
if (nextField != undefined) {
  document.querySelector(`[type="block"][value="${nextField}"]`).classList.add('box-shadow');
  container.classList.remove('box-shadow');
}
  }
  for (let el of cells) {
    if (data['iX'][`${el.getAttribute('block')}`]['comb'].length != 0 && data['iX'][`${el.getAttribute('block')}`]['comb'].includes(el.value)) {
      el.textContent = 'X';
      el.setAttribute('ready', false);

    }
    if (data['zero'][`${el.getAttribute('block')}`]['comb'].length != 0 && data['zero'][`${el.getAttribute('block')}`]['comb'].includes(el.value)) {
      el.textContent = 'O';
      el.setAttribute('ready', false);
    }
  }
  
}

/* Func that erase any saved data called 'data' on localStorage*/

function removeSaved() {
  localStorage.removeItem('data');
  document.querySelector('.saved--game').innerHTML = ``;
}



  /* Event on new game button erase players arrays, set winner = false, check for who's first to move, erase content from cells */
        
  newGameButton.addEventListener('click', newGame)

  function newGame(){
    [playerO, playerX, winner] = [[],[],false];
    // check.checked ? counter = 0 : counter = 1;
    result.innerHTML = '';
    // for (let el of rows) {
    //               el.innerHTML = '';
    //               el.setAttribute('ready', 'true');
    // }
    for (let el in player0) {
      
      player0[el]['comb'].length = 0;
      playeriX[el]['comb'].length = 0;

    }

    for (let el of cells){
      el.innerHTML = '';
      el.setAttribute('ready', 'true');
    }
    window.location.reload();

}

/* Event on reset score button with callback func that erase score */

  resetScore.addEventListener('click', () => {
    score = [0,0];
    p1.innerHTML = `P1: ${score[0]}`
    p2.innerHTML = `P2: ${score[1]}`
  })

 /* Function that generate gradient colors and set it on game field background */

function getRandomGradient() {
let getRgb = () => Math.floor(Math.random() * 255.9);
let bg = `linear-gradient(45deg, rgb(${getRgb()} ${getRgb()} ${getRgb()}), rgb(${getRgb()} ${getRgb()} ${getRgb()}))`;
// document.querySelector('body').style.background = bg;document.querySelector('body').style.background = bg;
document.querySelector('.container').style.background = bg;
}

/* Call for func */

//getRandomGradient()