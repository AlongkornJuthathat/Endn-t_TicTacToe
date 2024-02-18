const gameRef = firebase.database().ref('Game');
const gamePrivateRoomRef = firebase.database().ref('Game/PrivateRoom');
const gamePublicRoomRef = firebase.database().ref('Game/PublicRoom');
const Userlist = firebase.database().ref('users');

const btnQuickmatch = document.getElementById('btnQuick');
btnQuickmatch.document.addEventListener("click", createGameRoom);

function FindRoom(){
  if(user){
    
  }
}




function createGameRoom() {
  var roomId = gameRoomRef.push().key;
  const currentUser = firebase.auth().currentUser;
  var gameState = {
    players: [{
      id: currentUser.uid,
      name: playerName,
      symbol: 'X' // Assuming player 1 always plays 'X'
    }],
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    currentPlayer: currentUser.uid, // Player 1 starts first
    winner: null,
    gameOver: false
  };

  // Store game state in the database
  database.ref('gameRooms/' + roomId).set(gameState);

  // Return the room ID
  return roomId;
}

firebase.auth().onAuthStateChanged((user) => {
  const currentUser = firebase.auth().currentUser;
  if (user) {

  } else {
  }
  console.log("User: ", user);
});

