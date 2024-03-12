//const currentUser = firebase.auth().currentUser;
const gameRef = firebase.database().ref('Game');
const Userlist = firebase.database().ref('users');
//const UnameRef = firebase.database().ref('users/' + currentUser.uid + '/username');

const btnQuickmatch = document.querySelector('#btnQuick');
btnQuickmatch.addEventListener("click", joinRoom);

var Ustate = 'none'


function createGameRoom() {
    const currentUser = firebase.auth().currentUser;
    var roomId = gameRef.push().key;
    var UnameRef = firebase.database().ref('users/' + currentUser.uid + '/username');
    UnameRef.once('value').then(function (snapshot) {
        var Uname = snapshot.val();

        var gameState = {
            userO: currentUser.uid,
            scoreO: 0,
            userOname: Uname,
            userX: '',
            scoreX: 0,
            userXname: '',
            status: 'lobby',
            roomId: roomId,
            Turn: 'O',
            spaces: Array(9).fill(''),
            winner: ""
        };

        return gameRef.child(roomId).set(gameState);
    }).then(() => {
        window.location.href = "field.html?roomId=" + roomId;
    }).catch((error) => {
        console.error("Error creating game room:", error);
    });

}

function joinRoom() {
    console.log('Finding room...');
    const currentUser = firebase.auth().currentUser;
    var UnameRef = firebase.database().ref('users/' + currentUser.uid + '/username');
    UnameRef.once('value').then(function (snapshot) {
        var Uname = snapshot.val();

        gameRef.once('value').then((snapshot) => {
            if (snapshot.exists()) {
                console.log('Rooms exist');
                const gameData = snapshot.val();
                let foundValidRoom = false;
                Object.keys(gameData).forEach((key) => {
                    const room = gameData[key];
                    if (room.status === 'lobby' && room.userX === '') {
                        gameRef.child(key).update({
                            userXname: Uname,
                            userX: currentUser.uid,
                            status: 'occupied'
                        }).then(() => {
                            window.location.href = "field.html?roomId=" + key;
                        }).catch((error) => {
                            console.error("Error updating room:", error);
                        });
                        foundValidRoom = true;
                    }
                });

                if (!foundValidRoom) {
                    console.log("No valid room found, creating a new one");
                    createGameRoom();
                }
            } else {
                console.log("No rooms exist, creating a new one");
                createGameRoom();
            }
        }).catch((error) => {
            console.error("Error finding room:", error);
        });
    }).catch((error) => {
        console.error("Error fetching username:", error);
    });
}



firebase.auth().onAuthStateChanged((user) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {

    } else {

    }
    console.log("User: ", user);
});

