document.addEventListener('DOMContentLoaded', function() {
    const p = document.querySelector('#ay');
    const err = document.querySelector('#errorMessage');
    p.addEventListener('click', function() {
        err.classList.add('is-hidden');
    });
});

function register() {
    const playerOneFirstName = document.querySelector('#first').value;
    const playerOneLastName = document.querySelector('#second').value;
    const playerTwoFirstName = document.querySelector('#third').value;
    const playerTwoLastName = document.querySelector('#fourth').value;

    if (playerOneFirstName === '' && playerOneLastName === '') {
        playerOneFirstName = "Player";
        playerOneLastName = "1";
    }
        
    if (playerTwoFirstName === '' && playerTwoLastName === '') {
        playerTwoFirstName = "Player";
        playerTwoLastName = "2";
    }

    if (playerOneFirstName === playerTwoFirstName && playerOneLastName === playerTwoLastName) {
        const errorMessage = document.querySelector('#errorMessage');
        errorMessage.classList.remove('is-hidden');
        return;
    }

    

    const player1 = `+1 ${playerOneFirstName} ${playerOneLastName}`;
    const player2 = `+1 ${playerTwoFirstName} ${playerTwoLastName}`;

    localStorage.setItem('player1', player1);
    localStorage.setItem('player2', player2);
    window.location.href = 'index2.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const player1 = localStorage.getItem('player1');
    const player2 = localStorage.getItem('player2');
    if (player1) {
        document.querySelector('#p1Button').textContent = player1;
    }
    if (player2) {
        document.querySelector('#p2Button').textContent = player2;
    }
});

const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}


p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
})
p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
})


winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}








