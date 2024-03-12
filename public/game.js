const urlParams = new URLSearchParams(window.location.search);
const gameRef = firebase.database().ref(`Game/${urlParams.get("roomId")}`);
//const UserRef = firebase.database().ref('users/' + currentUser.uid);
let channels = Array.from(document.getElementsByClassName('channel'));
let spaces = Array(9).fill('');
let p1Score = document.getElementById('numScore1');
let p2Score = document.getElementById('numScore2');
let currentP1Score = 0;
let currentP2Score = 0;
let winner = false

var currentUser;

firebase.auth().onAuthStateChanged((user) => {
    currentUser = user;
});

function renderName() {
    //const currentUser = firebase.auth().currentUser;
    gameRef.on('value', (snapshot) => {
        const gameData = snapshot.val();
        if (gameData) {
            if (gameData.status === 'lobby') {
                console.log('lobby');
                document.querySelectorAll('.channel').forEach((button) => {
                    button.disabled = true;
                });
                document.querySelector('#playerName1').innerHTML = gameData.userOname;
                document.querySelector('#playerName2').innerHTML = 'Waiting...';
            }
            else {
                document.querySelectorAll('.channel').forEach((button) => {
                    button.disabled = false;
                });
                document.querySelector('#playerName1').innerHTML = gameData.userOname;
                document.querySelector('#playerName2').innerHTML = gameData.userXname;
            }
        }
    });
}

function cellClicked(ev) {
    console.log("Is clicked " + ev.currentTarget.id);
    const id = ev.target.getAttribute('id')

    gameRef.once('value', (snapshot) => {
        const gameData = snapshot.val();
        var CurrentTurn = gameData.Turn;
        currentUser = firebase.auth().currentUser.uid;
        if (playerHasWon() !== true) {
            console.log("in here")
            if (currentUser == gameData[`user${CurrentTurn}`]) {
                console.log("Ev Check: ", ev.currentTarget.innerText)
                if ((ev.currentTarget.innerText == "" && gameData.winner == "")) {
                    console.log("Last Click", ev.currentTarget.id)

                    ev.currentTarget.innerText = gameData.Turn;
                    gameData.spaces[id] = gameData.Turn;
                    //checkGame();
                    gameRef.update({
                        Turn: gameData.Turn == 'O' ? 'X' : 'O',
                        spaces: gameData.spaces
                    })
                    checkGame();
                }
            }
        }
    })
}

function checkGame() {
    playerHasWon()
    gameRef.on('value', (snapshot) => {
        currentUser = firebase.auth().currentUser.uid;
        console.log(currentUser)
        const UserRef = firebase.database().ref('users/' + currentUser);
        const gameData = snapshot.val();
        if (gameData.scoreO == 3 || gameData.scoreX == 3) {
            document.querySelectorAll('.channel').forEach((button) => {
                button.disabled = true;
            });
            if (gameData.scoreO == 3 && currentUser == gameData.userO) {
                UserRef.once('value', (snapshot) => {
                    const Userdata = snapshot.val()
                    //console.log(Userdata.score)
                    var newUserScore = Userdata.score + 100
                    UserRef.update({
                        score: newUserScore
                    }).then(() => {
                        setTimeout(() => {
                            window.location = `resultwin.html?roomid=${urlParams.get("roomId")}`;
                        }, 2000);
                    }).catch((error) => {
                        console.error('Error updating user score:', error);
                    });
                });
            } else if (gameData.scoreX == 3 && currentUser == gameData.userX) {
                UserRef.once('value', (snapshot) => {
                    const Userdata = snapshot.val()
                    var newUserScore = Userdata.score + 100
                    UserRef.update({
                        score: newUserScore
                    }).then(() => {
                        setTimeout(() => {
                            window.location = `resultwin.html?roomid=${urlParams.get("roomId")}`;
                        }, 2000);
                    }).catch((error) => {
                        console.error('Error updating user score:', error);
                    });
                });
            } else {
                setTimeout(() => {
                    window.location = `resultlose.html?roomid=${urlParams.get("roomId")}`;
                }, 2000);
            }

            gameRef.update({
                status: 'End',
                winner: true
            });
        }
    });
}

gameRef.on('value', (snapshot) => {
    const gameData = snapshot.val();
    console.log('has put symbol')
    if (gameData.spaces != null) {
        channels.forEach((ch) => {
            var ch_id = ch.id
            ch.innerText = gameData.spaces[`${ch_id}`]
        });
    }
    p1Score.innerText = gameData.scoreO;
    p2Score.innerText = gameData.scoreX;
});

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

function playerHasWon() {
    console.log('in playerHasWon')
    gameRef.once('value', (snapshot) => {
        const gameData = snapshot.val();
        for (const condition of winningCombos) {
            let [a, b, c] = condition;
            console.log(gameData.spaces[a])
            if (gameData.spaces[a] && (gameData.spaces[a] == gameData.spaces[b] && gameData.spaces[a] == gameData.spaces[c])) {
                if(gameData.spaces[a] === 'O'){
                    currentP1Score += 1
                } else {
                    currentP2Score += 1
                }
                const updatedSpaces = gameData.spaces.map((space, index) => {
                    if (index === a || index === b || index === c) {
                        return '';
                    } else {
                        return space;
                    }
                });
                console.log(updatedSpaces)

                gameRef.update({
                    spaces: updatedSpaces,
                })
                if(gameData.spaces[a] === 'O'){
                    gameRef.update({
                        [`score${gameData.spaces[a]}`] : currentP1Score
                    })
                } else {
                    gameRef.update({
                        [`score${gameData.spaces[a]}`] : currentP2Score
                    })
                }
                
                return [a, b, c];
            }
        }
        return true;
    });
}

channels.forEach(ch => {
        ch.addEventListener('click', cellClicked);
});

renderName();


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

/* function chClicked(event) {
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
                    //event.target.innerText = room.currentTurn
                }
                spaces[id] = room.currentTurn;
                console.log(spaces)
                gameRef
                    .child(ThisRoomId)
                    .update({
                        'currentTurn': currentPlayer === 'O' ? 'X' : 'O',
                        'spaces': spaces
                    })
                    .then(() => {
                        console.log('Turn updated successfully.');
                        if(event.target.innerText === ''){
                            renderBoard(event);
                        } else {
                            event.target. = true
                        }
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
                                p1Score.innerText = currentP1Score;
                                return
                            } else {
                                winSpaces = null;
                                currentP2Score += 1; // Increment player 2's score
                                p2Score.innerText = currentP2Score;
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
} */