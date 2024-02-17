const logoutItems = document.querySelectorAll(".logged-out");
const loginItems = document.querySelectorAll(".logged-in");

let setupUI = (user) => {
    const currentUser = firebase.auth().currentUser;
    if (user) {
        onValue(ref(database, 'users/' + currentUser.uid+ '/username'), (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            document.getElementById('name').innerText = data;
        });
    } else {
            document.querySelector("#btnLogIn").innerHTML = "Login";
        }
}