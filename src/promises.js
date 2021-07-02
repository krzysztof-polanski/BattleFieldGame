let moveActionInThisTurn = 0;
let playerTripped = false;
let enemyTripped = false;
let fakeMoveToCalcChargeRange;

let playerTripBonus = 2;
let enemyTripBonus = 2;
let playerBullRushBonus = 2;
let enemyBullRushBonus = 2;

function roll(sides, dice=1) {
    let score = 0;
    for(let i = 1; i < dice+1; i++) {
        score+=Math.floor((Math.random() * sides + 1))
    }
    return score;
}

let nextTurn = () => {
    if (!turn) {
        turn = true;
    } else if (turn) {
        turn = false;
    }
}

let whoseTurn = () => {
    if (playerHealth > 0 && enemyHealth > 0) {
        if (turn) {
            disableEnemyButtons();
            if ( playerTripped ) {
                movePlayerBtn.disabled = true;
                bullRushBtn.disabled = true;
            }
        return "Player"
        } else {
            disablePlayerButtons();
            if ( enemyTripped ) {
                moveEnemyBtn.disabled = true;
                enemyBullRushBtn.disabled = true;
            }
            return "Enemy"
        }
    } else {
        disableAllButtons();
        return 'the battle is over'
    }
}

let flipCoin = () => {
    if(Math.random() > 0.5) {
        turn = true;
    } else {
        turn = false;
    }
}


function armorBonus() {
    return Math.floor(Math.random() * 5);
}
function dexBonus() {
    return Math.floor(Math.random() * 4);
}
function isEveryThird(squares) {
    if (!((squares+1)%3)) {
        return true
    } else return false
}

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
let playerClass = document.querySelector('#player-class-span');
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
let enemyClass = document.querySelector('#enemy-class-span')
let enemyMisses = document.querySelector("#enemyMisses");
let enemyTripSucc = document.querySelector("#enemyTripSucc");
let enemyTripFail = document.querySelector("#enemyTripFail");
let enemyBullRushSucc = document.querySelector("#enemyBullRushSucc");
let enemyBullRushFail = document.querySelector("#enemyBullRushFail");

// flipCoin();

let turnSpan = document.querySelector('.turn-span');






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

// -----------------------------------------------------Character Choice Buttons Event Listeners --------------------//
tripperBtn.onclick = () => {
    playerTripBonus += 2;
    bullBtn.disabled = true;
    tripperBtn.disabled = true;
    tripperBtn.onclick = '';
    playerClass.textContent = 'Tripper'
}
bullBtn.onclick = () => {
    playerBullRushBonus += 2;
    tripperBtn.disabled = true;
    bullBtn.disabled = true;
    bullBtn.onclick = '';
    playerClass.textContent = 'Bull'
}
enemyTripperBtn.onclick = () => {
    enemyTripBonus += 2;
    enemyBullBtn.disabled = true;
    enemyTripperBtn.disabled = true;
    enemyTripperBtn.onclick = '';
    enemyClass.textContent = 'Tripper'
}
enemyBullBtn.onclick = () => {
    enemyBullRushBonus += 2;
    enemyTripperBtn.disabled = true;
    enemyBullBtn.disabled = true;
    enemyBullBtn.onclick = '';
    enemyClass.textContent = 'Bull'
}









enemyAttackBtn.addEventListener('click', () => {
    enemyTripped = false;
    stopInterval()
    toggleLoader()
    disableAllButtons()
    attack(enemyPosition, 2)
    .then((resolve) => {
        // console.log(resolve)
        whoseTurn();
        enemyHits.textContent = enemyAttackSucceeded;
        enemyMisses.textContent = enemyAttackMissed;
        return dealDmg(enemyPosition, 2, 10);
    })
    .then((resolve) => {
        // console.log(resolve)
        damageTaken.textContent = enemyDamageTaken;
        toggleLoader()
        isInDanger()
        whoseTurn();
    })
    .catch((error) => {
        // console.log(error)
        enemyHits.textContent = enemyAttackSucceeded;
        enemyMisses.textContent = enemyAttackMissed;
        damageTaken.textContent = enemyDamageTaken;
        toggleLoader()
        isInDanger()
        whoseTurn();
    })
})

moveEnemyBtn.addEventListener('click', () => {
    // stopInterval()
    enemyTripped = false;
    inDangerFields = [];
    onCharge = false
    moveActionInThisTurn = 0;
    // inChargeRange(enemyPosition, playerPosition)
    move(enemyLandSpeed, enemyPosition, playerPosition)
    .then (() => {
        disableAllButtons()
        inChargeRange(enemyPosition, playerPosition)
        // isInDanger()
        // stopInterval()
        // console.log('Move player worked')
    })
    .catch(() => {
        turn = true;
        isInDanger()
        stopInterval()
        // toggleLoader()
    })
    
    // .then (() =>
        
    // locatePcOnGrid(playerPosition, enemyPosition)
    // )
});

enemyChargeBtn.addEventListener('click', () => {
    enemyTripped = false;
    inDangerFields = [];
    stopInterval()
    toggleLoader()
    locatePcOnGrid(enemyPosition, playerPosition);
    disableAllButtons()
    charge()
    .then(() => {
        // console.log("You've reached the enemy!")
        // locatePcOnGrid(playerPosition, enemyPosition);
        return attack(enemyPosition, 2, 2)
    })
    .then((resolve) => {
        // console.log(resolve)
        enemyHits.textContent = enemyAttackSucceeded;
        enemyMisses.textContent = enemyAttackMissed;
        return dealDmg(enemyPosition, 2, 10);
    })
    .then((resolve) => {
        // console.log(resolve)
        damageTaken.textContent = enemyDamageTaken;
        toggleLoader()
        isInDanger()
    })
    .catch((error) => {
        // console.log(error)
        enemyHits.textContent = enemyAttackSucceeded;
        enemyMisses.textContent = enemyAttackMissed;
        damageTaken.textContent = enemyDamageTaken;
        toggleLoader()
        isInDanger()
    })
});

enemyBullRushBtn.addEventListener('click', () => {
    enemyTripped = false;
    stopInterval()
    toggleLoader()
    disableAllButtons()
    attack(playerPosition, 2)
    .then((resolve) => {
        // console.log(resolve)
        hits.textContent = attackSucceeded;
        return dealDmg(playerPosition, 2, 10);
    })
    .then((resolve) => {
        console.log(resolve)
        damage.textContent = damageDealt;
        bullRush(enemyPosition, playerPosition, 2, enemyBullRushBonus, 4)
        .then((resolve) => {
            // console.log(resolve)
            reSetFigures(playerPosition, enemyPosition);
            enemyBullRushSucc.textContent = enemyBullRushSucceeded;
            damageTaken.textContent = enemyDamageTaken;
            toggleLoader()
            isInDanger()
        })
        .catch((reject) => {
            // console.log(reject)
            enemyBullRushFail.textContent = enemyBullRushFailed;
            toggleLoader()
            isInDanger()
        })
    })
    .catch((error) => {
        // console.log(error)
        misses.textContent = attackMissed;
        enemyBullRushFail.textContent = enemyBullRushFailed;
        bullRush(enemyPosition, playerPosition, 2, 0, 4)
        .then((resolve) => {
            // console.log(resolve)
            reSetFigures(playerPosition, enemyPosition);
            enemyBullRushSucc.textContent = enemyBullRushSucceeded;
            damageTaken.textContent = enemyDamageTaken;
            toggleLoader()
            isInDanger()
        })
        .catch((error) => {
            // console.log(error)
            enemyBullRushFail.textContent = enemyBullRushFailed;
            toggleLoader()
            isInDanger()
        })
    })
});

enemyTripBtn.addEventListener('click', () => {
    enemyTripped = false;
    stopInterval()
    toggleLoader()
    disableAllButtons()
    trip(3, enemyPosition)
    .then((resolve) => {
        // console.log(resolve)
        enemyHits.textContent = enemyAttackSucceeded;
        enemyMisses.textContent = enemyAttackMissed;
        return tripOnGround(enemyTripBonus, 4, 4, enemyPosition)
    })
    .then((resolve) => {
        // console.log(resolve)
        playerTripped = true;
        whoseTurn();
        enemyTripSucc.textContent = enemyTripSucceeded;
        enemyTripFail.textContent = enemyTripFailed;
        return attack(enemyPosition, 2, 4)
    })
    .then((resolve) => {
        // console.log(resolve)
        whoseTurn();
        enemyHits.textContent = enemyAttackSucceeded;
        enemyMisses.textContent = enemyAttackMissed;
        return dealDmg(enemyPosition, 2, 10);
    })
    .then((resolve) => {
        // console.log(resolve)
        damageTaken.textContent = enemyDamageTaken;
        toggleLoader()
        isInDanger()
        whoseTurn();
    })
    .catch((error) => {
        // console.log(error)
        enemyHits.textContent = enemyAttackSucceeded;
        enemyMisses.textContent = enemyAttackMissed;
        enemyTripSucc.textContent = enemyTripSucceeded;
        enemyTripFail.textContent = enemyTripFailed;
        damageTaken.textContent = enemyDamageTaken;
        toggleLoader()
        isInDanger()
        whoseTurn();
    })
});





let loader = document.querySelector(".loader")

let tds = document.querySelectorAll('td');


let chDist = '';
let enemyPosition = 0;
let playerPosition = 0;
let inDangerFields = [];
let onCharge = false;

chargeBtn.disabled = true

let landSpeedSelector = document.querySelector("#land-speed");
let landSpeed = +(landSpeedSelector.value);
let enemyLandSpeedSelector = document.querySelector("#enemy-land-speed");
let enemyLandSpeed = +(enemyLandSpeedSelector.value);
let intervalId;

async function lightUpChargeBtn (field) {
    if (intervalId) {
        clearInterval(intervalId)
    }
    intervalId = setInterval(() => {
        if( field == playerPosition ){
            chargeBtn.classList.toggle('red-background')
        } else {
            enemyChargeBtn.classList.toggle('red-background')
        }
        
    }, 500)
}
async function stopInterval() {
    clearInterval(intervalId);
    chargeBtn.classList.remove('red-background')
    enemyChargeBtn.classList.remove('red-background')
}


landSpeedSelector.addEventListener('change', () => {
    landSpeed = +(landSpeedSelector.value);
    return landSpeed;
})
enemyLandSpeedSelector.addEventListener('change', () => {
    enemyLandSpeed = +(enemyLandSpeedSelector.value);
    return enemyLandSpeed;
})








const lifeDegradation = new Event('takesDamage');
playerSide.addEventListener('takesDamage', () => {
    playerHealth = playerFullHealth - enemyDamageTaken;
    playerHealthStat.textContent = playerHealth;
    console.log(`Player takes DAMAGE! His start health of ${playerFullHealth} is now only ${playerHealth}`)
    playerSide.style.backgroundColor = `rgba(138, 3, 3, ${enemyDamageTaken/playerFullHealth})`;
    if ( playerHealth < 1 ) {
        disableAllButtons();
        setTimeout( alert(`Enemy Wins dealing ${finalDamage} in the last second!`), 500)
    }
})
enemySide.addEventListener('takesDamage', () => {
    enemyHealth = enemyFullHealth - damageDealt;
    enemyHealthStat.textContent = enemyHealth;
    console.log(`Enemy takes DAMAGE! His start health of ${enemyFullHealth} is now only ${enemyHealth}`)
    enemySide.style.backgroundColor = `rgba(138, 3, 3, ${damageDealt/enemyFullHealth})`;
    if ( enemyHealth < 1 ) {
        disableAllButtons();
        setTimeout( alert(`Player Wins dealing ${finalDamage} in the last second!`), 5000)
    }
})



setBattlefield();
flipCoin();
turnSpan.innerText = whoseTurn();


// locatePcOnGrid(playerPosition, enemyPosition);

attackBtn.addEventListener('click', () => {
    playerTripped = false;
    stopInterval()
    toggleLoader()
    disableAllButtons()
    attack(playerPosition, 2)
    .then((resolve) => {
        // console.log(resolve)
        hits.textContent = attackSucceeded;
        misses.textContent = attackMissed;
        whoseTurn();
        return dealDmg(playerPosition, 2, 10)
    })
    .then((resolve) => {
        // console.log(resolve)
        damage.textContent = damageDealt;
        toggleLoader()
        isInDanger()
        whoseTurn();
    })
    .catch((error) => {
        // console.log(error)
        hits.textContent = attackSucceeded;
        misses.textContent = attackMissed;
        damage.textContent = damageDealt;
        toggleLoader()
        isInDanger()
        whoseTurn();
    })
})

chargeBtn.addEventListener('click', () => {
    playerTripped = false;
    inDangerFields = [];
    stopInterval()
    toggleLoader()
    locatePcOnGrid(playerPosition, enemyPosition);
    disableAllButtons()
    charge()
    .then(() => {
        // console.log("You've reached the enemy!")
        // locatePcOnGrid(playerPosition, enemyPosition);
        return attack(playerPosition, 2, 2)
    })
    .then((resolve) => {
        // console.log(resolve)
        hits.textContent = attackSucceeded;
        misses.textContent = attackMissed;
        return dealDmg(playerPosition, 2, 10)
    })
    .then((resolve) => {
        // console.log(resolve)
        damage.textContent = damageDealt;
        toggleLoader()
        isInDanger()
    })
    .catch((error) => {
        // console.log(error)
        hits.textContent = attackSucceeded;
        misses.textContent = attackMissed;
        damage.textContent = damageDealt;
        toggleLoader()
        isInDanger()
    })
});

bullRushBtn.addEventListener('click', () => {
    playerTripped = false;
    stopInterval()
    toggleLoader()
    disableAllButtons()
    attack(enemyPosition, 2)
    .then((resolve) => {
        // console.log(resolve)
        enemyHits.textContent = enemyAttackSucceeded;
        return dealDmg(enemyPosition, 2, 10);
    })
    .then((resolve) => {
        console.log(resolve)
        damageTaken.textContent = enemyDamageTaken;
        bullRush(playerPosition, enemyPosition, 2, playerBullBonus, 4)
        .then((resolve) => {
            // console.log(resolve)
            reSetFigures(playerPosition, enemyPosition);
            bullRushSucc.textContent = bullRushSucceeded;
            damage.textContent = damageDealt;
            toggleLoader()
            isInDanger()
        })
        .catch((reject) => {
            // console.log(reject)
            bullRushFail.textContent = bullRushFailed;
            toggleLoader()
            isInDanger()
        })
    })
    .catch((error) => {
        // console.log(error)
        enemyMisses.textContent = enemyAttackMissed;
        bullRushFail.textContent = bullRushFailed;
        bullRush(playerPosition, enemyPosition, 2, 0, 4)
        .then((resolve) => {
            // console.log(resolve)
            reSetFigures(playerPosition, enemyPosition);
            bullRushSucc.textContent = bullRushSucceeded;
            damage.textContent = damageDealt;
            toggleLoader()
            isInDanger()
        })
        .catch((error) => {
            // console.log(error)
            bullRushFail.textContent = bullRushFailed;
            toggleLoader()
            isInDanger()
        })
    })
});

tripBtn.addEventListener('click', () => {
    playerTripped = false;
    stopInterval()
    toggleLoader()
    disableAllButtons()
    trip(3, playerPosition)
    .then((resolve) => {
        // console.log(resolve)
        hits.textContent = attackSucceeded;
        misses.textContent = attackMissed;
        return tripOnGround(playerTripBonus, 4, 4, playerPosition)
    })
    .then((resolve) => {
        // console.log(resolve)
        enemyTripped = true;
        whoseTurn();
        tripSucc.textContent = tripSucceeded;
        tripFail.textContent = tripFailed;
        return attack(playerPosition, 5, 4)
    })
    .then((resolve) => {
        // console.log(resolve)
        hits.textContent = attackSucceeded;
        misses.textContent = attackMissed;
        whoseTurn();
        return dealDmg(playerPosition, 2, 10)
    })
    .then((resolve) => {
        // console.log(resolve)
        damage.textContent = damageDealt;
        toggleLoader()
        isInDanger()
        whoseTurn();
    })
    .catch((error) => {
        // console.log(error)
        hits.textContent = attackSucceeded;
        misses.textContent = attackMissed;
        tripSucc.textContent = tripSucceeded;
        tripFail.textContent = tripFailed;
        damage.textContent = damageDealt;
        toggleLoader()
        isInDanger()
        whoseTurn();
    })
});

movePlayerBtn.addEventListener('click', () => {
    playerTripped = false;
    // stopInterval()
    
    inDangerFields = [];
    onCharge = false
    
    moveActionInThisTurn = 0;
    // inChargeRange(playerPosition, enemyPosition)
    move(landSpeed, playerPosition, enemyPosition)
    .then (() => {
        disableAllButtons()
        inChargeRange(playerPosition, enemyPosition)
        // isInDanger()
        // stopInterval()
        // console.log('Move player worked')
    })
    // .then (() => {
    //     isInDanger();
    // })
    .catch(() => {
        turn = false;
        isInDanger()
        stopInterval()
        // toggleLoader()
    })
    
    // .then (() =>
        
    // locatePcOnGrid(playerPosition, enemyPosition)
    // )
});

const charge = () => {
    return new Promise((resolve, reject) => {
        const distance = Math.floor(Math.random() * 10);
        setTimeout(() => {
            if (distance > chDist) {
                reject(`You are to far! The enemy was ${distance} away..., so you lack just ${distance - chDist} pixels!`)
            } else {
                reSetFigures(playerPosition, enemyPosition)
                // locatePcOnGrid(playerPosition, enemyPosition);
                resolve(`You've reached you destination by moving ${chDist} pixels!`)
                
            }
        }, 3000)
    })
}



















const attack = (player, attBon, misc=0) => {
    return new Promise((resolve, reject) => {
        attRoll = roll(20);
        // ac = ac()
        let armCl = 10 + dexBonus() + armorBonus()
        setTimeout(() => {
            if (attBon + misc + attRoll < armCl ){
                if ( player == playerPosition ) {
                    attackMissed++;
                } else if ( player == enemyPosition ) {
                    enemyAttackMissed++;
                }
                reject("You've missed! " + attRoll + " + " + misc + " + " + attBon + " against enemy's armor class equal to " + armCl)
            } else {
                if ( player == playerPosition ) {
                    attackSucceeded++;
                } else if ( player == enemyPosition ) {
                    enemyAttackSucceeded++;
                }
                resolve("You've hit the enemy! " + attRoll + " + " + misc + " + " + attBon + " against enemy's armor class equal to " + armCl)
            }
        }, 3000)
    })
}




const trip = (ab, player) => {
    return new Promise((resolve, reject) => {
        tripRoll = roll(20);
        tAc = 10 + dexBonus();
        setTimeout(() => {
            if (tripRoll + ab < tAc ) {
                if ( player == playerPosition ) {
                    attackMissed++;
                } else if ( player == enemyPosition ) {
                    enemyAttackMissed++;
                }
                reject(`No! You did not menage to hit the opponent! You rolled ${tripRoll} which with ${ab} is still less than enemy's ${tAc} armor class`);
            } else {
                if ( player == playerPosition ) {
                    attackSucceeded++;
                } else if ( player == enemyPosition ) {
                    enemyAttackSucceeded++;
                }
                resolve(`Well done! You rolled ${tripRoll} which with your ${ab} beats enemy's ${tAc} armor class. You've grabbed your enemy - now trip him!`);
            }
        }, 3000)
    })
}
const tripOnGround = (cStrBon, featBon, sBon, player) => {
    return new Promise((resolve, reject) => {
        strRoll = roll(20);
        oppStrRoll = roll(20) + roll(4);
        setTimeout(() => {
            if ( strRoll + cStrBon + featBon + sBon < oppStrRoll ) {
                if ( player == playerPosition ) {
                    tripFailed++;
                } else if ( player == enemyPosition ) {
                    enemyTripFailed++;
                }
                reject(`Your score: d20 roll ${strRoll} + cStrBon ${cStrBon} + featBon ${featBon} + sBon ${sBon} < oppStrRoll ${oppStrRoll} `)
            } else {
                if ( player == playerPosition ) {
                    tripSucceeded++;
                } else if ( player == enemyPosition ) {
                    enemyTripSucceeded++;
                }
                resolve(`Your score: d20 roll ${strRoll} + cStrBon ${cStrBon} + featBon ${featBon} + sBon ${sBon} beat opponents: oppStrRoll ${oppStrRoll}. He is down! `)
            }
        }, 3000)
    })
}

const dealDmg = (player, cStrBon, weaponDice) => {
    return new Promise((resolve, reject) => {
        dmg = roll(weaponDice) + cStrBon;
        setTimeout(() => {
            if (dmg < 1) {
                reject(`You were not able to slice through the enemy's hard skin with your sword (dmg: ${dmg})...for shame!.`)
            } else {
                if ( player == playerPosition ) {
                    damageDealt+=dmg;
                    finalDamage = dmg;
                } else if ( player == enemyPosition ) {
                    enemyDamageTaken+=dmg;
                    finalDamage = dmg;
                }
                finalDamage = dmg;
                playerSide.dispatchEvent(lifeDegradation);
                enemySide.dispatchEvent(lifeDegradation);
                resolve(`You've sliced through the enemy's hard skin with your sword (dmg: ${dmg}). Damage dealt: ${dmg}.`)
            }
        }, 3000)
    })
}





    const bullRush = (player, opponent, cStrBon, featBon=0, sBon=0) => {
        return new Promise((resolve, reject) => {
            const cRoll = roll(20);
            const oppRoll = roll(20);
            const oppStrBon = roll(4) - 1
            

            const bRDist = Math.floor(((cRoll + cStrBon + featBon + sBon) - (oppRoll + oppStrBon)) / 5) + 1
            const wallCrashDmg = roll(6,4) + (cStrBon * 2)


            setTimeout(() => {
                // console.log(`[1]Opponent is on field ${opponent} and player is on position ${player}. playerPosition wynosi ${playerPosition}`)
                    if ( (cRoll + cStrBon + featBon + sBon < oppRoll + oppStrBon) || (playerHealth < 1 || enemyHealth < 1) ) {
                        if ( player == playerPosition ) {
                            bullRushFailed++;
                        } else if ( player == enemyPosition ) {
                            enemyBullRushFailed++;
                        }
                        reject(`No! He is like a wall! Your d20 roll: ${cRoll} + Strength ${cStrBon} + your feat bonus ${featBon} + your size bonus ${sBon} is less than enemy's ${oppRoll} + his Strength ${oppStrBon}`)
                    } else {

                        

                        if ( player == playerPosition ) {
                            bullRushSucceeded++;
                        } else if ( player == enemyPosition ) {
                            enemyBullRushSucceeded++;
                        }
                        moveOpponentInBullRush(bRDist, player, opponent);
                        if (crashed) {
                            if ( player == playerPosition ) {
                                damageDealt+=wallCrashDmg
                                finalDamage = wallCrashDmg;
                                enemySide.dispatchEvent(lifeDegradation);
                            } else if ( player == enemyPosition ) {
                                enemyDamageTaken+=wallCrashDmg
                                finalDamage = wallCrashDmg;
                                playerSide.dispatchEvent(lifeDegradation);
                            }
                            
                            resolve(`Yes! You moved him for ${bRDist} and you crashed him against wall dealing ${wallCrashDmg}! Your d20 roll: ${cRoll} + Strength ${cStrBon} + your feat bonus ${featBon} + your size bonus ${sBon} is more than enemy's ${oppRoll} + his Strength ${oppStrBon}`)
                        }else {
                            resolve(`Yes! You moved him for ${bRDist}! Your d20 roll: ${cRoll} + Strength ${cStrBon} + your feat bonus ${featBon} + your size bonus ${sBon} is more than enemy's ${oppRoll} + his Strength ${oppStrBon}`)
                        }
                    }
            }, 3000)
        })
    }

    function moveOpponentInBullRush(squares, player, opponent) {
        // console.log(`[2]Opponent is on field ${opponent}`)
        if(opponent-player==11) {
            checkIfCrashedOnWall(11, squares, opponent)
        } else if(player-opponent==11) {
            checkIfCrashedOnWall(-11, squares, opponent)
        } else if(opponent-player==9) {
            checkIfCrashedOnWall(9, squares, opponent)
        } else if(player-opponent==9) {
            checkIfCrashedOnWall(-9, squares, opponent)
        } else if(opponent-player==10) {
            checkIfCrashedOnWall(10, squares, opponent)
        } else if(player-opponent==10) {
            checkIfCrashedOnWall(-10, squares, opponent)
        } else if(opponent-player==1) {
            checkIfCrashedOnWall(1, squares, opponent)
        } else if(player-opponent==1) {
            checkIfCrashedOnWall(-1, squares, opponent)
        }
    }

    function checkIfCrashedOnWall(number, squares, opponent) {
        // console.log(`[3]Opponent is on field ${opponent}`)
        for(let i = 1; i < squares+1; i++) {
            if( ( !(opponent%10) && !(((opponent+number)-9)%10) ) || ( !((opponent-9)%10)  && !((opponent+number)%10) ) || ( opponent+number < 0 || opponent+number > 99 ) ) {
                // console.log('Enemy has crashed on wall');
                crashed=true;
                break
            } else {
                enemyPosition+=number;
                playerPosition+=number;
                opponent+=number;
                // player+=number;
            }
        }
    }

    function setBattlefield(){
        for(let [i, td] of tds.entries()) {
            td.innerText = '';
            
        }
        enemyPosition = Math.floor(Math.random() * 100);
        playerPosition = Math.floor(Math.random() * 100);
        if(enemyPosition==playerPosition){
            enemyPosition = Math.floor(Math.random() * 100);
            playerPosition = Math.floor(Math.random() * 100);
        }

        
        tds[enemyPosition].innerHTML = '<img src="../src/assets/media/enemy.jpg">';
        
        let positionOfOpp = tds[enemyPosition].getBoundingClientRect();
    
        let oppTop = positionOfOpp.top;
        let oppRight = positionOfOpp.right;
        let oppBottom = positionOfOpp.bottom;
        let oppLeft = positionOfOpp.left;
    
        tds[playerPosition].innerHTML = '<img src="../src/assets/media/Cart-Hero.png">';
    
        let positionOfPC = tds[playerPosition].getBoundingClientRect();
    
        let pCTop = positionOfPC.top;
        let pCRight = positionOfPC.right;
        let pCBottom = positionOfPC.bottom;
        let pCLeft = positionOfPC.left;
    
        let oppTopToPcBottom = oppTop - pCBottom;
        let oppRightToPcLeft = oppRight - pCLeft;
        let oppBottomToPcTop = oppBottom - pCTop;
        let oppLeftToPcRight = oppLeft - pCRight;
    
        // console.log(oppTopToPcBottom, oppRightToPcLeft, oppBottomToPcTop, oppLeftToPcRight);

        let a = 0;
        let b = 0;
        if (oppTopToPcBottom <= oppBottomToPcTop) {
            a = oppTopToPcBottom;
        } else {
            a = oppBottomToPcTop;
        }
        if (oppRightToPcLeft <= oppLeftToPcRight) {
            b = oppRightToPcLeft;
        } else {
            b = oppLeftToPcRight;
        }
        chDist = Math.floor(Math.hypot(a,b));
        // console.log(Math.floor(Math.hypot(a,b)));

        if ( inDangerZone(playerPosition, enemyPosition) ) {
            // console.log(`You are to close to charge (2nd case)! Trip him or use Bull Rush!`);
            attackBtn.disabled = false;
            tripBtn.disabled = false;
            bullRushBtn.disabled = false;
            chargeBtn.disabled = true;
        }
        if ( inDangerZone(enemyPosition, playerPosition) ) {
            // console.log(`You are to close to charge! Trip him or use Bull Rush!`);
            enemyAttackBtn.disabled = false;
            enemyTripBtn.disabled = false;
            enemyBullRushBtn.disabled = false;
            enemyChargeBtn.disabled = true;
        }
        else {
            attackBtn.disabled = true;
            tripBtn.disabled = true;
            bullRushBtn.disabled = true;
            chargeBtn.disabled = true;

            enemyAttackBtn.disabled = true;
            enemyTripBtn.disabled = true;
            enemyBullRushBtn.disabled = true;
            enemyChargeBtn.disabled = true;

            playerHealthStat.textContent = playerHealth;
            enemyHealthStat.textContent = enemyHealth;
        return (enemyPosition, playerPosition);
        }
    }


    function reSetFigures(player, opponent){
        
        
        for(let [i, td] of tds.entries()) {
            
            td.innerText = '';
            td.style.color = 'unset';
            td.style.backgroundColor = '#F9F9F9';
        }
            tds[opponent].innerHTML = '<img src="../src/assets/media/enemy.jpg">';
            tds[player].innerHTML = '<img src="../src/assets/media/Cart-Hero.png">';
    }

    function reSetBattlefield(){
        
    
        for(let [i, td] of tds.entries()) {
            td.innerText = '';
            td.style.backgroundColor = '#F9F9F9';
            
        }
            tds[enemyPosition].innerHTML = '<img src="../src/assets/media/enemy.jpg">';
            tds[playerPosition].innerHTML = '<img src="../src/assets/media/Cart-Hero.png">';
            
    }


    function locatePcOnGrid(pcLoc, oppLoc) {
        // console.log(`Position of the Player is ${pcLoc} and the Enemy is on square ${oppLoc}`)
        pcLocArr = pcLoc.toString().split('');
        oppLocArr = oppLoc.toString().split('');
        // console.log(`w locatePcOnGrid pcLoc jest równy: ${pcLoc} a playerPosition: ${playerPosition}`)
        if (pcLoc == playerPosition) {
            if ( pcLoc > oppLoc ) {
            // if ( (pcLoc - 1 == oppLoc || pcLoc - 10 == oppLoc || pcLoc - 9 == oppLoc || pcLoc - 11 == oppLoc) && !( !((oppLoc - 9) % 10) && !(pcLoc % 10)) ) {
            if ( inDangerZone(pcLoc, oppLoc) ) {
                // console.log(`You are to close to charge! Trip him or use Bull Rush!`);
                attackBtn.disabled = false;
                tripBtn.disabled = false;
                bullRushBtn.disabled = false;
                movePlayerBtn.disabled = false;
                chargeBtn.disabled = true;
            } else {
                attackBtn.disabled = true;
                tripBtn.disabled = true;
                bullRushBtn.disabled = true;
                movePlayerBtn.disabled = false;
                chargeBtn.disabled = true;
                if ( !((pcLoc - oppLoc) % 9) && ( pcLocArr[1] < oppLocArr[1] || pcLocArr[1] < oppLocArr[0] ) ) {
                    // console.log(`After charge player will stand on square ${oppLoc + 9}`);
                    playerPosition = oppLoc + 9;
                    return playerPosition;
                }
                else if ( !((pcLoc - oppLoc) % 11) && ( pcLocArr[1] > oppLocArr[1] || pcLocArr[1] > oppLocArr[0] ) ) {
                    // console.log(`After charge player will stand on square ${oppLoc + 11}`);
                    playerPosition = oppLoc + 11;
                    return playerPosition;
                }
                else if ( oppLocArr.length == 1 && pcLocArr[1] == oppLocArr[0] || pcLocArr[1] == oppLocArr[1] ) {
                    // console.log(`After charge player will stand on square ${oppLoc + 10}`);
                    playerPosition = oppLoc + 10;
                    return playerPosition;
                }
                else if ( pcLocArr.length == 1 && oppLocArr.length == 1 || pcLocArr[0] == oppLocArr[0] ) {
                    // console.log(`After charge player will stand on square ${oppLoc + 1}`);
                    playerPosition = oppLoc + 1;
                    return playerPosition;
                }
                else if ( pcLocArr[1] < oppLocArr[1] || ( oppLocArr.length == 1 && pcLocArr[1] < oppLocArr[0] ) ) {
                    // console.log(`After charge player will stand on square ${oppLoc + 9}`);
                    playerPosition = oppLoc + 9;
                    return playerPosition;
                }
                else if ( pcLocArr[1] > oppLocArr[1] || ( oppLocArr.length == 1 && pcLocArr[1] > oppLocArr[0] ) ) {
                    // console.log(`After charge player will stand on square ${oppLoc + 11}`);
                    playerPosition = oppLoc + 11;
                    return playerPosition;
                } else {
                    // console.log(`Oh boy! Choose where you want to end your charge...`)
                }
            }
        } else {
            attackBtn.disabled = true;
            tripBtn.disabled = true;
            bullRushBtn.disabled = true;
            movePlayerBtn.disabled = false;
            chargeBtn.disabled = true;
            // if ( (pcLoc + 1 == oppLoc || pcLoc + 10 == oppLoc || pcLoc + 9 == oppLoc || pcLoc + 11 == oppLoc) && !( !((pcLoc - 9) % 10) && !(oppLoc % 10)) ) {
            if ( inDangerZone(pcLoc, oppLoc) ) {
                // console.log(`You are to close to charge (2nd case)! Trip him or use Bull Rush!`);
                attackBtn.disabled = false;
                tripBtn.disabled = false;
                bullRushBtn.disabled = false;
                movePlayerBtn.disabled = false;
                chargeBtn.disabled = true;
            } 
            else {
                if ( pcLocArr.length == 1 && pcLocArr[0] == oppLocArr[1] || pcLocArr[1] == oppLocArr[1] && oppLocArr.length !== 1) {
                    // console.log(`After charge player will stand on square ${oppLoc - 10}`);
                    playerPosition = oppLoc - 10;
                    return playerPosition;
                }
                else if ( pcLocArr.length == 1 && oppLocArr.length == 1 || pcLocArr[0] == oppLocArr[0] && pcLocArr.length !== 1) {
                    // console.log(`After charge player will stand on square ${oppLoc - 1}`);
                    playerPosition = oppLoc - 1;
                    return playerPosition;
                }
                else if ( !((pcLoc + oppLoc) % 9) && ( pcLocArr[1] > oppLocArr[1] || pcLocArr[1] > oppLocArr[0] ) ) {
                    // console.log(`After charge player will stand on square ${oppLoc - 9} (first case)`);
                    playerPosition = oppLoc - 9;
                    return playerPosition;
                }
                else if ( !((pcLoc + oppLoc) % 11) && ( pcLocArr[1] < oppLocArr[1] || pcLocArr[1] < oppLocArr[0] ) ) {
                    // console.log(`After charge player will stand on square ${oppLoc - 11} (first case)`);
                    playerPosition = oppLoc - 11;
                    return playerPosition;
                }
                else if ( pcLocArr[1] > oppLocArr[1] || ( pcLocArr.length == 1 && oppLocArr[1] < pcLocArr[0] ) ) {
                    // console.log(`After charge player will stand on square ${oppLoc - 9} (last case)`);
                    playerPosition = oppLoc - 9;
                    return playerPosition;
                }
                else if ( pcLocArr[1] < oppLocArr[1] || ( pcLocArr.length == 1 && oppLocArr[1] > pcLocArr[0] ) ) {
                    // console.log(`After charge player will stand on square ${oppLoc - 11} (last case)`);
                    playerPosition = oppLoc - 11;
                    return playerPosition;
                } else {
                    // console.log(`Oh boy! Choose where you want to end your charge...`)
                }
            }
        }
    }
    else {
        if ( pcLoc > oppLoc ) {
        // if ( (pcLoc - 1 == oppLoc || pcLoc - 10 == oppLoc || pcLoc - 9 == oppLoc || pcLoc - 11 == oppLoc) && !( !((oppLoc - 9) % 10) && !(pcLoc % 10)) ) {
        if ( inDangerZone(pcLoc, oppLoc) ) {
            // console.log(`You are to close to charge! Trip him or use Bull Rush!`);
            attackBtn.disabled = false;
            tripBtn.disabled = false;
            bullRushBtn.disabled = false;
            movePlayerBtn.disabled = false;
            chargeBtn.disabled = true;
        } else {
            attackBtn.disabled = true;
            tripBtn.disabled = true;
            bullRushBtn.disabled = true;
            movePlayerBtn.disabled = false;
            chargeBtn.disabled = true;
            if ( !((pcLoc - oppLoc) % 9) && ( pcLocArr[1] < oppLocArr[1] || pcLocArr[1] < oppLocArr[0] ) ) {
                // console.log(`After charge player will stand on square ${oppLoc + 9}`);
                enemyPosition = oppLoc + 9;
                return enemyPosition;
            }
            else if ( !((pcLoc - oppLoc) % 11) && ( pcLocArr[1] > oppLocArr[1] || pcLocArr[1] > oppLocArr[0] ) ) {
                // console.log(`After charge player will stand on square ${oppLoc + 11}`);
                enemyPosition = oppLoc + 11;
                return enemyPosition;
            }
            else if ( oppLocArr.length == 1 && pcLocArr[1] == oppLocArr[0] || pcLocArr[1] == oppLocArr[1] ) {
                // console.log(`After charge player will stand on square ${oppLoc + 10}`);
                enemyPosition = oppLoc + 10;
                return enemyPosition;
            }
            else if ( pcLocArr.length == 1 && oppLocArr.length == 1 || pcLocArr[0] == oppLocArr[0] ) {
                // console.log(`After charge player will stand on square ${oppLoc + 1}`);
                enemyPosition = oppLoc + 1;
                return enemyPosition;
            }
            else if ( pcLocArr[1] < oppLocArr[1] || ( oppLocArr.length == 1 && pcLocArr[1] < oppLocArr[0] ) ) {
                // console.log(`After charge player will stand on square ${oppLoc + 9}`);
                enemyPosition = oppLoc + 9;
                return enemyPosition;
            }
            else if ( pcLocArr[1] > oppLocArr[1] || ( oppLocArr.length == 1 && pcLocArr[1] > oppLocArr[0] ) ) {
                // console.log(`After charge player will stand on square ${oppLoc + 11}`);
                enemyPosition = oppLoc + 11;
                return enemyPosition;
            } else {
                // console.log(`Oh boy! Choose where you want to end your charge...`)
            }
        }
    } else {
        attackBtn.disabled = true;
        tripBtn.disabled = true;
        bullRushBtn.disabled = true;
        movePlayerBtn.disabled = false;
        chargeBtn.disabled = true;
        // if ( (pcLoc + 1 == oppLoc || pcLoc + 10 == oppLoc || pcLoc + 9 == oppLoc || pcLoc + 11 == oppLoc) && !( !((pcLoc - 9) % 10) && !(oppLoc % 10)) ) {
        if ( inDangerZone(pcLoc, oppLoc) ) {
            // console.log(`You are to close to charge (2nd case)! Trip him or use Bull Rush!`);
            attackBtn.disabled = false;
            tripBtn.disabled = false;
            bullRushBtn.disabled = false;
            movePlayerBtn.disabled = false;
            chargeBtn.disabled = true;
        } 
        else {
            if ( pcLocArr.length == 1 && pcLocArr[0] == oppLocArr[1] || pcLocArr[1] == oppLocArr[1] && oppLocArr.length !== 1) {
                // console.log(`After charge player will stand on square ${oppLoc - 10}`);
                enemyPosition = oppLoc - 10;
                return enemyPosition;
            }
            else if ( pcLocArr.length == 1 && oppLocArr.length == 1 || pcLocArr[0] == oppLocArr[0] && pcLocArr.length !== 1) {
                // console.log(`After charge player will stand on square ${oppLoc - 1}`);
                enemyPosition = oppLoc - 1;
                return enemyPosition;
            }
            else if ( !((pcLoc + oppLoc) % 9) && ( pcLocArr[1] > oppLocArr[1] || pcLocArr[1] > oppLocArr[0] ) ) {
                // console.log(`After charge player will stand on square ${oppLoc - 9} (first case)`);
                enemyPosition = oppLoc - 9;
                return enemyPosition;
            }
            else if ( !((pcLoc + oppLoc) % 11) && ( pcLocArr[1] < oppLocArr[1] || pcLocArr[1] < oppLocArr[0] ) ) {
                // console.log(`After charge player will stand on square ${oppLoc - 11} (first case)`);
                enemyPosition = oppLoc - 11;
                return enemyPosition;
            }
            else if ( pcLocArr[1] > oppLocArr[1] || ( pcLocArr.length == 1 && oppLocArr[1] < pcLocArr[0] ) ) {
                // console.log(`After charge player will stand on square ${oppLoc - 9} (last case)`);
                enemyPosition = oppLoc - 9;
                return enemyPosition;
            }
            else if ( pcLocArr[1] < oppLocArr[1] || ( pcLocArr.length == 1 && oppLocArr[1] > pcLocArr[0] ) ) {
                // console.log(`After charge player will stand on square ${oppLoc - 11} (last case)`);
                enemyPosition = oppLoc - 11;
                return enemyPosition;
            } else {
                // console.log(`Oh boy! Choose where you want to end your charge...`)
            }
        }
    }}
    }








    

const move = async (squares, player, opponent) => {
    let lineSkip = 0;
    for( let x = 1; x <= squares; x++) {
        if(isEveryThird(x)){
            lineSkip++
        }
        
    }

    if (squares == 0) {
        // console.log(`You cannot move!`)
    }
    else {
        for(let [i, td] of tds.entries()) {
        let iStr = i.toString().split('');
        let plPosStr = player.toString().split('');


        if ( i != opponent ) {

        

            if ( ( ( i - player <= squares ) && ( i > player ) ) || ( ( player - i <= squares ) && ( i < player ) ) ) {
                // function atTheSameLine() {
                    let jj = 0;
                    atTheSameLine(jj, squares, i, td, player, opponent)
                    
            }

            
            if ( ( (i - (player+(10*(2))) <= squares - 1) && (i >= player+(10*(2))) ) || ( ( (player+(10*(2))) - i <= squares - 1) && (i < player+(10*(2))) ) ) {
                if (squares > 3) {
                    // console.log("You have reached this condition        " + i)
                    let sqrs=2
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            } if ( ( (i - (player-(10*(2))) <= squares - 1) && (i >= player-(10*(2))) ) || ( ( (player-(10*(2))) - i <= squares - 1) && (i < player-(10*(2))) ) ) {
                if (squares > 3) {
                    let sqrs=2
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            }
            if ( ( (i - (player+(10*(3))) <= squares - 1) && (i >= player+(10*(3))) ) || ( ( (player+(10*(3))) - i <= squares - 1) && (i < player+(10*(3))) ) ) {
                if (squares > 3) {
                    // console.log("You have reached this condition        " + i)
                    let sqrs=3
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            } if ( ( (i - (player-(10*(3))) <= squares - 1) && (i >= player-(10*(3))) ) || ( ( (player-(10*(3))) - i <= squares - 1) && (i < player-(10*(3))) ) ) {
                if (squares > 3) {
                    let sqrs=3
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            }
            if ( ( (i - (player+(10*(4))) <= squares - 2) && (i >= player+(10*(4))) ) || ( ( (player+(10*(4))) - i <= squares - 2) && (i < player+(10*(4))) ) ) {
                if (squares > 6) {
                    // console.log("You have reached this condition        " + i)
                    let sqrs=4
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            } if ( ( (i - (player-(10*(4))) <= squares - 2) && (i >= player-(10*(4))) ) || ( ( (player-(10*(4))) - i <= squares - 2) && (i < player-(10*(4))) ) ) {
                if (squares > 6) {
                    let sqrs=4
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            }
            if ( ( (i - (player+(10*(5))) <= squares - 2) && (i >= player+(10*(5))) ) || ( ( (player+(10*(5))) - i <= squares - 2) && (i < player+(10*(5))) ) ) {
                if (squares > 6) {
                    // console.log("You have reached this condition        " + i)
                    let sqrs=5
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            } if ( ( (i - (player-(10*(5))) <= squares - 2) && (i >= player-(10*(5))) ) || ( ( (player-(10*(5))) - i <= squares - 2) && (i < player-(10*(5))) ) ) {
                if (squares > 6) {
                    let sqrs=5
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            }
        


            
            





            if (  (( (i - (player+10) <= squares) && (i >= (player+10)) ) || ( (i - (player-10) <= squares) && (i >= (player-10)) )) && ((plPosStr[0] != iStr[0]) || i < 10 || player < 10) ) {
                // player+=10
                // console.log(`${i} passed 2nd condition`)
                let jj = 1;
                atTheSameLine(jj, squares, i, td, player, opponent)
            }
            
            else if (  (( ((player+10) - i <= squares) && (i <= (player+10)) ) || ( ((player-10) - i <= squares) && (i <= (player-10)) )) && ((plPosStr[0] != iStr[0]) || i < 10 || player < 10) ) {
                // player+=10
                // console.log(`${i} passed 3nd condition`)
                let jj = 1;
                atTheSameLine(jj, squares, i, td, player, opponent)
            }
            
            else if ( ( (i - (player+(10*squares)) <= 1) && (i >= player+(10*squares)) ) || ( ( (player+(10*squares)) - i <= 1) && (i < player+(10*squares)) ) ) {
                // player+=10
                // console.log(`${i} passed last condition`)
                let jj = squares;
                atTheSameLine(jj, squares, i, td, player, opponent)
            } else if ( ( (i - (player-(10*squares)) <= 1) && (i >= player-(10*squares)) ) || ( ( (player-(10*squares)) - i <= 1) && (i < player-(10*squares)) ) ) {
                // player+=10
                // console.log(`${i} passed last condition`)
                let jj = squares;
                atTheSameLine(jj, squares, i, td, player, opponent)
            } 
            
            else if ( ( (i - (player+(10*(squares-lineSkip))) <= squares-lineSkip) && (i >= player+(10*(squares-lineSkip))) ) || ( ( (player+(10*(squares-lineSkip))) - i <= squares-lineSkip) && (i < player+(10*(squares-lineSkip))) ) ) {
                
                
                let sqrs=squares-lineSkip
                // console.log(`${i} passed last condition`)
                let jj = sqrs;
                atTheSameLine(jj, sqrs, i, td, player, opponent)
                
            }
            else if ( ( (i - (player-(10*(squares-lineSkip))) <= squares-lineSkip) && (i >= player-(10*(squares-lineSkip))) ) || ( ( (player-(10*(squares-lineSkip))) - i <= squares-lineSkip) && (i < player-(10*(squares-lineSkip))) ) ) {
                
                // console.log(i)
                // console.log(lineSkip)
                let sqrs=squares-lineSkip
                // console.log(`${i} passed last condition`)
                let jj = sqrs;
                atTheSameLine(jj, sqrs, i, td, player, opponent)
                
            } else if ( ( (i - (player+(10*(squares-1))) <= 3) && (i >= player+(10*(squares-1))) ) || ( ( (player+(10*(squares-1))) - i <= 3) && (i < player+(10*(squares-1))) ) ) {
                
                    
                if (squares > 3) {
                    let sqrs=squares-1
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
                
                
            } else if ( ( (i - (player-(10*(squares-1))) <= 3) && (i >= player-(10*(squares-1))) ) || ( ( (player-(10*(squares-1))) - i <= 3) && (i < player-(10*(squares-1))) ) ) {
                
                    
                if (squares > 3) {
                    let sqrs=squares-1
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
                
                // for 4
            } else if ( ( (i - (player+(10*(squares-2))) <= 3) && (i >= player+(10*(squares-2))) ) || ( ( (player+(10*(squares-2))) - i <= 3) && (i < player+(10*(squares-2))) ) ) {
                if (squares > 3) {
                    let sqrs=squares-2
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            } else if ( ( (i - (player-(10*(squares-2))) <= 3) && (i >= player-(10*(squares-2))) ) || ( ( (player-(10*(squares-2))) - i <= 3) && (i < player-(10*(squares-2))) ) ) {
                if (squares > 3) {
                    let sqrs=squares-2
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }

                // for 5
            } else if ( ( (i - (player+(10*(squares-2))) <= 4) && (i >= player+(10*(squares-2))) ) || ( ( (player+(10*(squares-2))) - i <= 4) && (i < player+(10*(squares-2))) ) ) {
                if (squares > 4) {
                    let sqrs=squares-2
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            } else if ( ( (i - (player-(10*(squares-2))) <= 4) && (i >= player-(10*(squares-2))) ) || ( ( (player-(10*(squares-2))) - i <= 4) && (i < player-(10*(squares-2))) ) ) {
                if (squares > 4) {
                    let sqrs=squares-2
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
                
                // for more than 8
            } if ( ( (i - (player+(10*(squares-2))) <= 5) && (i >= player+(10*(squares-2))) ) || ( ( (player+(10*(squares-2))) - i <= 5) && (i < player+(10*(squares-2))) ) ) {
                // console.log(`In line squares-2 załapał się         ${i}`)
                if (squares > 7) {
                    // console.log(`In line squares-2 załapał się         ${i}`)
                    let sqrs=squares-2
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
            } else if ( ( (i - (player-(10*(squares-2))) <= 5) && (i >= player-(10*(squares-2))) ) || ( ( (player-(10*(squares-2))) - i <= 5) && (i < playerPosition-(10*(squares-2))) ) ) {
                if (squares > 7) {
                    let sqrs=squares-2
                    // console.log(`${i} passed last condition`)
                    let jj = sqrs;
                    atTheSameLine(jj, sqrs, i, td, player, opponent)
                }
                
                
            }
        }
        
        
        
        

    }


    }
}


function atTheSameLine(jj, squares, i, td, curPlayer, curOpponent) {
    // let inDangerFields = [];
    
    for(let j = jj; j <= squares; j++ ) {
        let iStr = i.toString().split('');
        let playerStr = (curPlayer+(j*10)).toString().split('');
        // console.log(playerPositionStr)
        if ( playerStr.length > 2 ) {
            // console.log("It is forbidden to move outside the battlefield!")
        }  else if ( (( playerStr[0] == iStr[0] && playerStr.length == iStr.length ) || ( playerStr.length < 2 && i < 10 ))  ) {
            // console.log(`In line ${j} same line are squares ${i}`)
            if (!onCharge){
                conditions(td, i, j, curPlayer, curOpponent)
            }
            if ( inDangerZone(i, curOpponent) ){
                if (!onCharge) {
                    td.style.backgroundColor = `rgba(${255-(j*10)},${0+(j*10)},${0+(j*10)}, 0.2)`
                }
                inDangerFields.push(i);
            }
            return i, inDangerFields, curPlayer, curOpponent, playerPosition, enemyPosition;
        } else {
            break
        }
    }
    for( let j = jj; j <= squares; j++ ) {
        let iStr = i.toString().split('');
        let playerStr = (curPlayer-(j*10)).toString().split('');
        // console.log(playerPositionStr)
        if ( playerStr[0] == "-" ) {
            // console.log("It is forbidden to move outside the battlefield!")
        } 
        else if ( ( playerStr[0] == iStr[0] && playerStr.length == iStr.length ) || ( playerStr.length < 2 && i < 10 ) ) {
            if (!onCharge){
                conditions(td, i, j, curPlayer, curOpponent)
            }
            if ( inDangerZone(i, curOpponent) ){
                if (!onCharge) {
                    td.style.backgroundColor = `rgba(${255-(j*10)},${0+(j*10)},${0+(j*10)}, 0.2)`
                }
                inDangerFields.push(i);
            }
            return i, inDangerFields, curPlayer, curOpponent, playerPosition, enemyPosition;
        }
        else {
            break
        }
    }
}








function inDangerZone(field, opponent) {
    // console.log(playerPosition, enemyPosition)
    if ( ((opponent-field==11) || (opponent-field==10) || (opponent-field==9) || (opponent-field==1) || (field-opponent==11) || (field-opponent==10) || (field-opponent==9) || (field-opponent==1)) && ( ( opponent%10 || (field-9)%10 ) && ( (opponent-9)%10 || field%10 ) ) ) {
        return true
    } else {
        return false
    }
}

async function isInDanger() {
    if (playerHealth > 0 && enemyHealth > 0) {
        if (turn) {
            disableEnemyButtons();
            if ( inDangerZone(playerPosition, enemyPosition) ) {
                // console.log(`You are to close to charge! Trip him or use Bull Rush!`);
                attackBtn.disabled = false;
                tripBtn.disabled = false;
                bullRushBtn.disabled = false;
                movePlayerBtn.disabled = false;
                chargeBtn.disabled = true;
            } else {
                attackBtn.disabled = true;
                tripBtn.disabled = true;
                bullRushBtn.disabled = true;
                movePlayerBtn.disabled = false;
                chargeBtn.disabled = true;
            }
        } else {
            disablePlayerButtons();
            if ( inDangerZone(enemyPosition, playerPosition) ) {
                // console.log(`You are to close to charge! Trip him or use Bull Rush!`);
                enemyAttackBtn.disabled = false;
                enemyTripBtn.disabled = false;
                enemyBullRushBtn.disabled = false;
                moveEnemyBtn.disabled = false;
                enemyChargeBtn.disabled = true;
            } else {
                enemyAttackBtn.disabled = true;
                enemyTripBtn.disabled = true;
                enemyBullRushBtn.disabled = true;
                moveEnemyBtn.disabled = false;
                enemyChargeBtn.disabled = true;
            }
        }
    }
    // console.log('movePlayerBtn.disabled = false');
}


async function disableAllButtons() {
    disablePlayerButtons();
    disableEnemyButtons();
}

async function disablePlayerButtons() {
    attackBtn.disabled = true;
    tripBtn.disabled = true;
    bullRushBtn.disabled = true;
    movePlayerBtn.disabled = true;
    chargeBtn.disabled = true;
}
async function disableEnemyButtons() {
    enemyAttackBtn.disabled = true;
    enemyTripBtn.disabled = true;
    enemyBullRushBtn.disabled = true;
    moveEnemyBtn.disabled = true;
    enemyChargeBtn.disabled = true;
}



async function toggleLoader() {
    // console.log("toggled!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    if (loader.style.display === 'none') {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
        if (turn) {
            turn = false;
            whoseTurn();
            turnSpan.innerText = whoseTurn();
        } else {
            turn = true;
            whoseTurn();
            turnSpan.innerText = whoseTurn();
        }
    }
}

async function inChargeRange(field, opponent) {
    onCharge = true;
    // console.log(`1wewnątrz in charge range ${fakeMoveToCalcChargeRange == true}`)
    if ( turn == true ) {
        // console.log(`2wewnątrz in charge range ${fakeMoveToCalcChargeRange == true}`)
        fakeMoveToCalcChargeRange = true
        // console.log(`2,5 wewnątrz in charge range ${fakeMoveToCalcChargeRange == true}`)
        move(landSpeed*2, field, opponent)
        fakeMoveToCalcChargeRange = false
    } else if ( turn == false ) {
        // console.log(`3wewnątrz in charge range ${fakeMoveToCalcChargeRange == true}`)
        fakeMoveToCalcChargeRange = true
        // console.log(`3,5wewnątrz in charge range ${fakeMoveToCalcChargeRange == true}`)
        move(enemyLandSpeed*2, field, opponent)
        fakeMoveToCalcChargeRange = false
    }
    
    if(!(inDangerZone(field, opponent)) && inDangerFields.length) {
        if ( field == playerPosition) {
            chargeBtn.disabled = false;
            
        } else {
            enemyChargeBtn.disabled = false;
            
        }
        lightUpChargeBtn(field)
                
    } else {
        chargeBtn.disabled = true;
        enemyChargeBtn.disabled = true;
        
    }
    
    // console.log(inDangerFields)
    // console.log(playerPosition, enemyPosition)
    // if ( ((enemyPosition-field==22) || (enemyPosition-field==20) || (enemyPosition-field==18) || (enemyPosition-field==2) || (field-enemyPosition==22) || (field-enemyPosition==20) || (field-enemyPosition==18) || (field-enemyPosition==2)) && (!( !(enemyPosition%10) && !((field-9)%10) ) || !( !((enemyPosition-9)%10) && !((field)%10) )) ) {
    //     console.log(`Enemy is in range of a charge`)
    //     return true
    // } else {
    //     console.log(`Enemy is not in range of a charge`)
    //     return false
    // }
}
// inChargeRange(playerPosition)
function conditions(td, i, j, curPlayer, curOpponent) {
    // console.log(`wewnątrz conditions ${fakeMoveToCalcChargeRange == true} for ${i}`)
    
    if (!fakeMoveToCalcChargeRange){
        td.style.backgroundColor = `rgba(${0+(j*10)},${255-(j*10)},${0+(j*10)}, 0.2)`
        td.onclick = function movePlayerOnField ()  {
            stopInterval()
            // td.style.backgroundColor = "rgba(255,255,0,0.2)"
            // if (curPlayer == playerPosition) {
                
            if (turn == true && !moveActionInThisTurn) {
                // console.log(`curPlayer == playerPosition`)
                playerPosition = i;
                // curPlayer = i;
                // console.log("Before reSetFigures: " + enemyPosition, playerPosition)
                reSetFigures(playerPosition, enemyPosition);
                // console.log("Before locatePcOnGrid: " + enemyPosition, playerPosition)
                locatePcOnGrid(playerPosition, enemyPosition);
                playerPosition = i;
                // curPlayer = i;
                if ( !inDangerZone(playerPosition, enemyPosition) ) {
                    turn = false;
                    turnSpan.innerText = whoseTurn();
                    // console.log('nie jest w strefie zagrożenia')
                }
                isInDanger()
                movePlayerBtn.disabled = true;
                moveActionInThisTurn++
                // console.log(moveActionInThisTurn)
                for (let td of tds) {
                    td.onclick = console.log('Event Removed')
                }
                // return curPlayer
            // } else if (curPlayer == enemyPosition) {
            } if (turn == false && !moveActionInThisTurn) {
                // console.log(`curPlayer == enemyPosition`)
                enemyPosition = i;
                // curPlayer = i;
                
                // console.log("Before reSetFigures: " + enemyPosition, playerPosition)
                reSetFigures(playerPosition, enemyPosition);
                // console.log("Before locatePcOnGrid: " + enemyPosition, playerPosition)
                locatePcOnGrid(enemyPosition, playerPosition);
                
                enemyPosition = i;

                if ( !inDangerZone(enemyPosition, playerPosition) ) {
                    turn = true;
                    turnSpan.innerText = whoseTurn();
                    // console.log('nie jest w strefie zagrożenia')
                }
                // curPlayer = i;
                isInDanger()
                
                moveEnemyBtn.disabled = true;
                moveActionInThisTurn++
                // console.log(moveActionInThisTurn)
                // return curPlayer
                for (let td of tds) {
                    td.onclick = console.log('Event Removed')
                }
            }  
            
        }
    }
}

// function movePlayerOnField () {

// }
