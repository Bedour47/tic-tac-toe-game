console.log('Hello JS');

//Declaration section
let $playerX = [];
let $playerO = [];
let $xTurn = true;
let $xScore = 0;
let $oScore = 0;
let $roundsCounter = 1;
let $winner;
const $winCases = [
    //rows
    [1,2,3],
    [4,5,6],
    [7,8,9],
    //columns
    [1,4,7],
    [2,5,8],
    [3,6,9],
    //diagonal
    [1,5,9],
    [3,5,7]
];

/*------------------------------------------------------------*/
const myCallback = function(){
    //disable the click events when there is a winner
    if(checkForWin() === true){
        for(let i=1; i<=9 ; i++){
            const $id = $(`#${i}`);
            $id.off();
        }
    }
    //disable the click events when tie
    else if(isGameOver() === true) {
        alert('tie...');
        console.log('Game Over: tie');
        for(let i=1; i<=9 ; i++){
            const $id = $(`#${i}`);
            $id.off();
        }
    }
};

//Create click event for each cell ONLY for once
const start = function(){
    $('.newRound').hide();
    for(let i=1; i<=9 ; i++){
        const $id = $(`#${i}`);
        $id.click(function(){
          if($id.hasClass('x') === false && $id.hasClass('o') === false){
            // Set data 'clicked' for the clicked cells 
            $id.data('clicked', true);
            if($xTurn === true){
                $id.addClass('x');
                $playerX.push(i);
                $xTurn = false;
                $('.playTurns').text(`Player O Turn`);
                console.log('O turn');
            }
            else if($xTurn === false){
                $(this).addClass('o');
                $playerO.push(i);
                $xTurn = true;
                $('.playTurns').text(`Player X Turn`);
                console.log('X turn');
            }
          }
        });
        $id.one('click', myCallback); 
    };
}
let $rounds = prompt('Rounds?','3');
console.log('Round: ' +$roundsCounter);
$('.round').text(`Round # ${$roundsCounter}`);
console.log('X turn');
$('.playTurns').text(`Player X Turn`);
start();
/*------------------------------------------------------------*/


//function to check for win WHEN any of player's array is equals to 3 or more
const checkForWin = function(){
    if($playerX.length >= 3 || $playerO.length >= 3){
        let $counterX = 0;
        let $counterO = 0;
        
        for(let i = 0 ; i < $winCases.length; i++){
            for(let j = 0 ; j < $playerX.length; j++){
                //store the players' index for each iteration to use it with .include() method
                const index1 = $playerX[j];
                const index2 = $playerO[j];
                    if ($winCases[i].includes(index1) === true){
                        $counterX++;
                        if($counterX === 3){
                            roundWinner('X');
                            return true;
                        }
                    } 
                    else 
                    if ($winCases[i].includes(index2) === true){
                        $counterO++; 
                        if($counterO === 3){
                            roundWinner('O');
                            return true;
                        }
                    } 
            }//inner for loop
        //to make sure that the counter begins with zero for each $winCases[i] iteration
         $counterX = 0;
         $counterO = 0;
        }//for loop
    }//if
    return false;
}//function


//function to dispaly each round winner
const roundWinner = function(win){
    if(win === 'X'){
        $xScore++;
        $('.scoreX').text(`X Score : ${$xScore}`);
        console.log('X wins');
        alert('x wins the round!');
        if(winner() === true)
        return;
        $('.newRound').show();
    }
    else if(win === 'O'){
        $oScore++;
        $('.scoreO').text(`O Score : ${$oScore}`);
        console.log('O wins');
        alert('o wins the round!');
        if(winner() === true)
        return;
        $('.newRound').show();
    }
    console.log('x score: '+ $xScore);
    console.log('o score: '+ $oScore);
}

//the winner (of all rounds)
const winner = function(){ //maybe we need to check if the rounds are completed here??
    if($roundsCounter >= $rounds){
        if($xScore > $oScore)
            $winner = 'X';
        if($xScore < $oScore)
            $winner = 'O';
        if($xScore === $oScore)
            $winner = ' ';
        if($winner === ' '){
            console.log('tie...');
            alert('tie...');
            return true;
        }
        console.log('THE WINNER IS: ' +$winner);
        alert(`THE WINNER IS: ${$winner}`);
        return true;
    }
    return false;
}

//finction to check if the game is over
const isGameOver = function(){
    let $counter = 0;
    for(let i=1; i<=9 ; i++){
        const $id = $(`#${i}`);
        //Check if the cell's data contains 'clicked' which mean the cell was clicked
        if($id.data('clicked')){
            $counter++;
        }
    }
    //if all cells are clicked = the board is full = the game is over
    if($counter === 9 && winner() === true){
        $('.newRound').show();
        return true;
    }
};

$('.newRound').click(function(){
    console.log('----------------------');
    $playerX = [];
    $playerO = [];
    if($roundsCounter < $rounds)
    $roundsCounter++;
    for(let i=1; i<=9 ; i++){
        const $id = $(`#${i}`);
        if($id.data('clicked')){
            if($id.hasClass('x')){
                $id.removeClass('x');
            }
            if($id.hasClass('o')){
                $id.removeClass('o');
            }
            $id.prop('click', null);
            $id.data('clicked', false);
        }
    };
    $xTurn = true;
    console.log('Round: ' +$roundsCounter);
    $('.round').text(`Round # ${$roundsCounter}`);
    console.log('X turn');
    $('.playTurns').text(`Player X Turn`);
});