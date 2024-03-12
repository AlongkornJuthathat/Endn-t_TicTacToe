const urlParams = new URLSearchParams(window.location.search);
const gameRef = firebase.database().ref(`Game/`);
var result = document.getElementById('gameResult');

var backtoHome = document.getElementById('btnBacktoHome');
var playAgain = document.getElementById('btnPlayAgain');

var currentUser;
firebase.auth().onAuthStateChanged((user) => {
    currentUser = user.uid;
    const UserRef = firebase.database().ref('users/' + currentUser);
    gameRef.once('value', (snapshot) => {
        const gameData = snapshot.val();
        UserRef.once('value', (snapshot) => {
            const Userdata = snapshot.val()
            if (result.innerText === 'WINNER!') {
                document.querySelector('#win-update-name').innerHTML = Userdata.username;
                document.querySelector('#win-update-score').innerHTML = `Your Score : ${Userdata.score}`;
            } else {
                document.querySelector('#lose-update-name').innerHTML = Userdata.username;
                document.querySelector('#lose-update-score').innerHTML = `Your Score : ${Userdata.score}`;
            }
        })
    })
});

backtoHome.addEventListener('click', () => {
    gameRef
    gameRef.remove()
        .then(() => {
            console.log("Game successfully removed from the database.");
        })
        .catch((error) => {
            console.error("Error removing game:", error);
        });
    setTimeout(() => {
        window.location = `index.html`;
    }, 1000);
})

playAgain.addEventListener('click', () => {
    gameRef.remove()
        .then(() => {
            console.log("Game successfully removed from the database.");
        })
        .catch((error) => {
            console.error("Error removing game:", error);
        });
    setTimeout(() => {
        window.location = `select_mode.html`;
    }, 1000);
})

/* function removeGame() {
    gameRef.remove()
        .then(() => {
            console.log("Game successfully removed from the database.");
        })
        .catch((error) => {
            console.error("Error removing game:", error);
        });
        ${urlParams.get("roomId")}
} */