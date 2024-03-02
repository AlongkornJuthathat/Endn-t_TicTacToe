const gameRef = firebase.database().ref('Game');
const Userlist = firebase.database().ref('users');

const btnQuickmatch = document.querySelector('#btnQuick');
btnQuickmatch.addEventListener("click", joinRoom);

var Ustate = 'none'

/* function FindRoom(){
  const currentUser = firebase.auth().currentUser;
  console.log(currentUser)
    if (currentUser) {
        Userlist.child(currentUser.uid).push({
            status: 'findroom',
        })
        Ustate = 'findroom'
    }
    joinRoom();
}
 */

function createGameRoom() {
  console.log(Ustate);
  var roomId = gameRef.push().key;
  window.location.href = "lobby_quickmatch.html?roomId=" + roomId;
  const currentUser = firebase.auth().currentUser;
  var gameState = {
    userO: currentUser.uid,
    userX: '',
    status: 'lobby',
    roomId: roomId
  };
  Ustate = 'lobby'
  // Store game state in the database
  gameRef.child(roomId).set(gameState);
  console.log(Ustate);
  // Return the room ID
  return roomId;
}

function joinRoom() {
  console.log('findroom');
  const currentUser = firebase.auth().currentUser;

  gameRef.once('value').then((snapshot) => {
    if (snapshot.exists()) {
      console.log('have room');
      const gameData = snapshot.val();
      let foundValidRoom = false;
      // Iterate over each room
      Object.keys(gameData).forEach((key) => {
        const room = gameData[key];
        // Check if the room is valid for joining
        if (room.status === 'lobby' && room.userO === '') {
          // Update game state to mark the room as occupied by the current user
          gameRef.child(key).update({
            userO: currentUser.uid,
            status: 'occupied'
          }).then(() => {
            // Redirect to the game field page after updating the database
            window.location.href = "lobby_quickmatch.html?roomId=" + key;
          }).catch((error) => {
            console.error("Error updating room:", error);
          });

          foundValidRoom = true; // Set flag to indicate a valid room was found
        }
      });

      // If no valid room was found, create a new room
      if (!foundValidRoom) {
        console.log("No valid room found, creating a new one");
        createGameRoom();
      }
    } else {
      // No rooms exist, create a new one
      console.log("No rooms exist, creating a new one");
      createGameRoom();
    }
  }).catch((error) => {
    console.error("Error finding room:", error);
  });
}

firebase.auth().onAuthStateChanged((user) => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {

  } else {

  }
  console.log("User: ", user);
});

