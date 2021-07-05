let moveActionInThisTurn = 0;
let playerTripped = false;
let enemyTripped = false;
let fakeMoveToCalcChargeRange;

let playerTripBonus = 2;
let enemyTripBonus = 2;
let playerBullRushBonus = 2;
let enemyBullRushBonus = 2;




let turn;
let finalDamage;

let attackMissed = 0;
let attackSucceeded = 0;
let tripFailed = 0;
let tripSucceeded = 0;
let bullRushFailed = 0;
let bullRushSucceeded = 0;

let damageDealt = 0;
let playerHealth = 22;
let playerFullHealth = playerHealth;
let enemyHealth = 22;
let enemyFullHealth = enemyHealth;
let enemyDamageTaken = 0;

let enemyAttackMissed = 0;
let enemyAttackSucceeded = 0;
let enemyTripFailed = 0;
let enemyTripSucceeded = 0;
let enemyBullRushFailed = 0;
let enemyBullRushSucceeded = 0;

let crashed = false;

let playerSide = document.querySelector('#player-controls')
let playerHealthStat = document.querySelector('#player-health');
let playerClass = document.querySelector('#player-class-div');
let hits = document.querySelector("#hits");
let misses = document.querySelector("#misses");
let tripSucc = document.querySelector("#tripSucc");
let tripFail = document.querySelector("#tripFail");
let bullRushSucc = document.querySelector("#bullRushSucc");
let bullRushFail = document.querySelector("#bullRushFail");

let damage = document.querySelector("#damage");
let damageTaken = document.querySelector("#damageTaken");

let enemySide = document.querySelector('#enemy-controls')
let enemyHealthStat = document.querySelector('#enemy-health')
let enemyHits = document.querySelector("#enemyHits");
let enemyClass = document.querySelector('#enemy-class-div')
let enemyMisses = document.querySelector("#enemyMisses");
let enemyTripSucc = document.querySelector("#enemyTripSucc");
let enemyTripFail = document.querySelector("#enemyTripFail");
let enemyBullRushSucc = document.querySelector("#enemyBullRushSucc");
let enemyBullRushFail = document.querySelector("#enemyBullRushFail");

// flipCoin();

let turnDiv = document.querySelector('#turn-h2');






//---------------------Player Buttons-----------------------------------------------------------//
let tripperBtn = document.querySelector('#tripper');
let bullBtn = document.querySelector('#bull');

let attackBtn = document.querySelector('#attack');
let tripBtn = document.querySelector("#trip");
let bullRushBtn = document.querySelector("#bullRush");
let movePlayerBtn = document.querySelector("#move-player");
let chargeBtn = document.querySelector("#charge");

//---------------------Enemy Buttons-----------------------------------------------------------//
let enemyTripperBtn = document.querySelector('#enemy-tripper');
let enemyBullBtn = document.querySelector('#enemy-bull');

let enemyAttackBtn = document.querySelector('#enemy-attack');
let enemyTripBtn = document.querySelector("#enemy-trip");
let enemyBullRushBtn = document.querySelector("#enemy-bullRush");
let moveEnemyBtn = document.querySelector("#move-enemy");
let enemyChargeBtn = document.querySelector("#enemy-charge");



// let renderedGrid = document.getElementById('grid-rendered');





let loader = document.querySelector(".loader")

let tds = document.querySelectorAll('td');


let chDist = '';
let enemyPosition = 0;
let playerPosition = 0;
let inDangerFields = [];
let onCharge = false;




let landSpeedSelector = document.querySelector("#land-speed");
let landSpeed = +(landSpeedSelector.value);
let enemyLandSpeedSelector = document.querySelector("#enemy-land-speed");
let enemyLandSpeed = +(enemyLandSpeedSelector.value);
let intervalId;





