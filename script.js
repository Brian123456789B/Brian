const cells = document.querySelectorAll('.cell');
const statusText=document.getElementById('status');
const resetButton =document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
const winningCombinations = [
    [0,1,2],
    [6,7,8],
    [2,4,6],
    [1,4,7],
    [3,4,5],
    [0,4,8],
    [0,3,6],
    [2,5,8]
    
];
 // 事件處理
 function handleClick(e) {
    const index = e.target.getAttribute('data-index');

    // 檢查是否已標記過，或遊戲是否結束
    if (gameBoard[index] !== '' || !isGameActive) return;

    // 更新遊戲板狀態
    gameBoard[index] = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());
    e.target.textContent = currentPlayer;

    // 檢查勝利或平手
    checkWinner();
   
    if (isGameActive) {  // 只在遊戲仍在進行時切換玩家和更新狀態
        // 先切換玩家
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // 再更新狀態文字
        statusText.textContent = `輪到玩家 ${currentPlayer}`;
    }
}

function checkWinner() {
    let roundWon = false;

    // 檢查所有的勝利組合
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    // 處理勝利或平手
    if (roundWon) {
        statusText.textContent = `玩家 ${currentPlayer} 勝利！`;
        isGameActive = false;
    } else if (!gameBoard.includes('')) {
        statusText.textContent = '平手！';
        isGameActive = false;
    }
}

function resetGame() {
    // 重設遊戲狀態
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    statusText.textContent = `輪到玩家 ${currentPlayer}`;

    // 清除格子的標記
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

// 監聽格子點擊事件
cells.forEach(cell => cell.addEventListener('click', handleClick));

// 監聽重置按鈕
resetButton.addEventListener('click', resetGame);

// 初始化狀態文字
statusText.textContent = `輪到玩家 ${currentPlayer}`;
