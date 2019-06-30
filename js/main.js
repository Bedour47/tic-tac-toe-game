console.log('Hello JS');

//Players
const $playerX = [];
const $playerO = [];
let $move =1; //X starts
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
    //This should show X or O from css
    
    // $(this).css({
    //     'background': 'gray'
    // })
    if(checkForWin() === true) //maybe make the board freze if true?
    return console.log('freze code gose here');
    else if(isGameOver() === true)
        console.log('Game Over');
};

//Create click event for each cell ONLY for once
const start = function(){
    for(let i=1; i<=9 ; i++){
        const $id = $(`#${i}`);
        //Set data 'clicked' for the clicked cells 
        $id.click(function(){
            $(this).data('clicked', true);
            if($move % 2 === 1){
                $(this).append('X');
                $playerX.push(i);
            }
            else if($move % 2 === 0){
                $(this).append('O');
                $playerO.push(i);
            }
            $move++;
        });
        $id.one('click', myCallback); 
    };
}
start();
/*------------------------------------------------------------*/

//function to set the Players' arrays
const playersArrays = function(){

}

//function to check for win WHEN any of player's array is equals to 3 or more
const checkForWin = function(){
    if($playerX.length >= 3 || $playerO.length >= 3){
        let $counterX = 0;
        let $counterO = 0;
        
        for(let i = 0 ; i < $winCases.length; i++){
            for(let j = 0 ; j < $playerX.length; j++){
                if($playerX[j] === $winCases[i][j])
                $counterX++
            }
            for(let j = $playerX.length-1; j >= 0; j--){
                if($playerX[j] === $winCases[i][j])
                $counterX++
            }
            if($counterX === 6){
                winner('X');
                return true;
            }
            for(let k = 0 ; k < $playerO.length; k++){
                if($playerO[k] === $winCases[i][k])
                 $counterO++
            }
            for(let k = $playerO.length-1; k >= 0; k--){
                if($playerO[k] === $winCases[i][k])
                 $counterO++
            }
            if($counterO === 6){
                winner('O');
                return true;
            }
        };
    };
    return false;
}


//function to dispaly winner
const winner = function(win){
    if(win === 'X')
    console.log('X wins'); //should be animated css
    else if(win === 'O')
    console.log('O wins');
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
    if($counter === 9)
    return true;
};

$('reset').click(function(){
    //code here
});