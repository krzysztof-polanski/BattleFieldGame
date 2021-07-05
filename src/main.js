

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




chargeBtn.disabled = true;





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
turnDiv.innerText = whoseTurn();


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


