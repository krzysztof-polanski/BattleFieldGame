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

    
    tds[enemyPosition].innerHTML = '<img src="./src/assets/media/enemy.jpg">';
    
    let positionOfOpp = tds[enemyPosition].getBoundingClientRect();

    let oppTop = positionOfOpp.top;
    let oppRight = positionOfOpp.right;
    let oppBottom = positionOfOpp.bottom;
    let oppLeft = positionOfOpp.left;

    tds[playerPosition].innerHTML = '<img src="./src/assets/media/Cart-Hero.png">';

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
        tds[opponent].innerHTML = '<img src="./src/assets/media/enemy.jpg">';
        tds[player].innerHTML = '<img src="./src/assets/media/Cart-Hero.png">';
}

function reSetBattlefield(){
    

    for(let [i, td] of tds.entries()) {
        td.innerText = '';
        td.style.backgroundColor = '#F9F9F9';
        
    }
        tds[enemyPosition].innerHTML = '<img src="./src/assets/media/enemy.jpg">';
        tds[playerPosition].innerHTML = '<img src="./src/assets/media/Cart-Hero.png">';
        
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
            turnDiv.innerText = whoseTurn();
        } else {
            turn = true;
            whoseTurn();
            turnDiv.innerText = whoseTurn();
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
                    turnDiv.innerText = whoseTurn();
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
                    turnDiv.innerText = whoseTurn();
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