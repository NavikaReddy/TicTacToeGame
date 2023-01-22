const grid = Array.from(document.querySelectorAll('.grid'))
const displayPlayer = document.querySelector('.display-player')
const resetButton = document.querySelector('#reset')
const result = document.querySelector('.result')
let board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
let currentPlayer = 'X';
let isGameActive = true;

const playerXWon = 'Player X won'
const playerOWon = 'Player O won'
const tie = 'TIE'

const winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]

function checkResult()
{
    let gameWon=false
    for(let i=0;i<=7;i++)
    {
        const winCondition=winningCondition[i];
        const a = board[winCondition[0]]
        const b= board[winCondition[1]]
        const c= board[winCondition[2]]
        if(a==' ' || b==' ' ||c==' ')
        {
            continue;
        }
        if(a===b && b===c)
        {
            gameWon=true;
            break;
        }
    }
    if(gameWon)
    {
        result.style.color = (currentPlayer==='X'? '#ff0023':'#fefe2c')
        result.textContent= (currentPlayer==='X'? 'Player X won!!':'Player O won!!')
        isGameActive=false
        return;
    }
    if(!board.includes(' '))
    {
            result.style.color = '#1702fc'
            result.textContent="OH OH IT'S A TIE!!";
    }        
}

const isValid = (grid)=>{
    if(grid.innerText==='X' || grid.innerText==='O')
    {
        return false;
    }
    return true;
}

const updateGrid =(index)=>{
    board[index]=currentPlayer
}


const changePlayer = ()=>{
    displayPlayer.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === 'X'? 'O':'X'
    displayPlayer.style.color = (currentPlayer==='X'? '#ff0023':'#fefe2c')
    displayPlayer.textContent = currentPlayer
    displayPlayer.classList.add(`player${currentPlayer}`)
}

const playerMove = (grid,index) =>{
    if(isValid(grid) && isGameActive)
    {
        grid.style.color = (currentPlayer==='X'? '#ff0023':'#fefe2c')
        grid.textContent = currentPlayer;
        grid.classList.add(`player${currentPlayer}`)
        updateGrid(index)
        checkResult()
        changePlayer()
    }
}

const resetBoard = ()=>{
    board=[' ',' ',' ',' ',' ',' ',' ',' ',' ']
    isGameActive=true
    if(currentPlayer==='O')
    {
        changePlayer();
    }
    grid.forEach(grid =>{
        grid.textContent='';
        result.textContent='';
        grid.classList.remove('Player-x')
        grid.classList.remove('Player-o')
    })
}

grid.forEach((grid,index)=>{
    grid.addEventListener('click',()=>playerMove(grid,index))
})

resetButton.addEventListener('click',resetBoard)