const gameRef = firebase.database().ref('Game');
var ThisRoomId = '';
let channels = Array.from(document.getElementsByClassName('channel'));
let spaces = Array(9).fill('');

const O_text = 'O'
const X_text = 'X'
let currentPlayer = O_text
let p1Score = document.getElementById('numScore1');
let p2Score = document.getElementById('numScore2');
let currentP1Score = 0
let currentP2Score = 0;

document.addEventListener("DOMContentLoaded", function () {
    // Get room ID parameter value from URL
    var params = new URLSearchParams(window.location.search);
    ThisRoomId = params.get("roomId"); // Assign the value to global roomId
    console.log(ThisRoomId);

});

function renderName() {
    //const currentUser = firebase.auth().currentUser;
    gameRef.on('value', (snapshot) => {
        const gameData = snapshot.val();
        console.log(gameData);
        if (gameData) {
            Object.keys(gameData).forEach((key) => {
                const room = gameData[key];
                if (ThisRoomId === room.roomId && room.status === 'occupied') {
                    console.log('occupied');
                    document.querySelectorAll('.channel').forEach((button) => {
                        button.disabled = false;
                    });
                    document.querySelector('#playerName1').innerHTML = room.userOname;
                    document.querySelector('#playerName2').innerHTML = room.userXname;
                } else if (ThisRoomId === room.roomId && room.status === 'lobby') {
                    console.log('lobby');
                    document.querySelectorAll('.channel').forEach((button) => {
                        button.disabled = true;
                    });
                    document.querySelector('#playerName1').innerHTML = room.userOname;
                    document.querySelector('#playerName2').innerHTML = 'Waiting...';
                }
            });
        }
    });
}

function chClicked(event) {
    console.log("Is clicked " + event.target.id);
    const id = event.target.getAttribute('id')

    gameRef.once('value', (snapshot) => {
        const gameData = snapshot.val();
        console.log('this is ' + gameData);
        Object.keys(gameData).forEach((key) => {
            //room = game/idแต่ละห้อง.val
            const room = gameData[key];
            if (ThisRoomId === room.roomId && room.status === 'occupied') {
                console.log('Is in ' + ThisRoomId)
                if (!spaces[id]) {
                    room.spaces[id] = room.currentTurn;
                    event.target.innerText = room.currentTurn
                }
                spaces[id] = room.currentTurn;
                gameRef
                    .child(ThisRoomId)
                    .update({
                        'currentTurn': currentPlayer === 'O' ? 'X' : 'O',
                        'spaces': spaces
                    })
                    .then(() => {
                        console.log('Turn updated successfully.');
                        // Check for a winner after updating the turn
                        if (playerHasWon() !== false) {
                            console.log('player has Won!');
                            let winSpaces = playerHasWon()
                            for (let ch of winSpaces) {
                                channels[ch].innerText = '';
                                spaces[ch] = '';
                            }
                            if (currentPlayer === X_text) {
                                winSpaces = null;
                                currentP1Score += 1; // Increment player 1's score
                                p1Score.innerText = currentP1Score; // Update player 1's score on the UI
                                return
                            } else {
                                winSpaces = null;
                                currentP2Score += 1; // Increment player 2's score
                                p2Score.innerText = currentP2Score; // Update player 2's score on the UI
                                return
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating turn:', error);
                    });
            }
        })
    })
    currentPlayer = currentPlayer == O_text ? X_text : O_text
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

/* const winningCombos = [
    ['ch01', 'ch02', 'ch03'],
    ['ch04', 'ch05', 'ch06'],
    ['ch07', 'ch08', 'ch09'],
    ['ch01', 'ch04', 'ch07'],
    ['ch02', 'ch05', 'ch08'],
    ['ch03', 'ch06', 'ch09'],
    ['ch01', 'ch05', 'ch09'],
    ['ch03', 'ch05', 'ch07']
] */

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            // Update spaces to empty strings in Firebase
            gameRef.child(ThisRoomId).update({
                'spaces': spaces.map((space, index) => {
                    if (index === a || index === b || index === c) {
                        return '';
                    } else {
                        return space;
                    }
                })
            })
            return [a, b, c];
        }

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

function runningGame() {
    channels.forEach(ch => {
        ch.addEventListener('click', chClicked);
    });

}

function startGame() {
    renderName();
    runningGame();
}

startGame();