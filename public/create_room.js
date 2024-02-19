const gameRef = firebase.database().ref('Game');
const gamePrivateRoomRef = firebase.database().ref('Game/PrivateRoom');
const gamePublicRoomRef = firebase.database().ref('Game/PublicRoom');
const Userlist = firebase.database().ref('users');

const btnQuickmatch = document.querySelector('#btnQuick');
btnQuickmatch.addEventListener("click", createGameRoom);

var Ustate = 'none'


function FindRoom(){
  console.log(currentUser)
    if (currentUser) {
        Userlist.child(currentUser.uid).push({
            status: 'findroom',
        })
        Ustate = 'findroom'
    }
    joinRoom();
}



function joinRoom(){

}


function createGameRoom() {
  console.log(Ustate);
  var roomId = gameRef.push().key;
  const currentUser = firebase.auth().currentUser;
  var gameState = {
    userX : '',
    userO : '',
    status: 'lobby'
  };
  Ustate = 'lobby'
  // Store game state in the database
  gameRef.child(roomId).set(gameState);

  console.log(Ustate);
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

