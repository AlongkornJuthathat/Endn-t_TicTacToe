
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", createUser);

const signupFeedback = document.querySelector("#feedback-msg-signup");
const signupModal = new bootstrap.Modal(document.querySelector("#modal-signup"));

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", loginUser);

const loginFeedback = document.querySelector("#feedback-msg-login");
const loginModal = new bootstrap.Modal(document.querySelector("#modal-login"));

const logoutItems = document.querySelectorAll(".logged-out");
const loginItems = document.querySelectorAll(".logged-in");

let setupUI = (user) => {
    const currentUser = firebase.auth().currentUser;
    if (user) {
        loginItems.forEach((item) => (item.style.display = "inline-block"));
        logoutItems.forEach((item) => (item.style.display = "none"));
    } else {
        loginItems.forEach((item) => (item.style.display = "none"));
        logoutItems.forEach((item) => (item.style.display = "inline-block"));
        document.querySelector("#btnLogIn").innerHTML = "Login <i class='bi bi-person'></i>";
    }
}

function createUser(event) {
    event.preventDefault();
    const Displayname = signupForm["input-name-signup"].value;
    const email = signupForm["input-email-signup"].value;
    const password = signupForm["input-password-signup"].value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        signupFeedback.style = "color: green";
        signupFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Signup Completed.";
        const user = userCredential.user;
        firebase.database().ref('users/' + user.uid).set({
            username: Displayname,
            email: email,
            id : user.uid,
            score: 0,
          });
        setTimeout(() => {
            signupModal.hide();
            signupForm.reset();
            signupFeedback.innerHTML = "";
        }, 1000)
    })
    .catch((error) => {
        signupFeedback.style = "color: crimson";
        signupFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`;
        signupForm.reset();
    })
}

function loginUser(event){
    event.preventDefault();
    const email = loginForm["input-email-login"].value;
    const password = loginForm["input-password-login"].value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        loginFeedback.style = "color: green";
        loginFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Login succeed!";
        setTimeout(() => {
            loginModal.hide();
            loginForm.reset();
            loginFeedback.innerHTML = "";
        }, 1000)
    })
    .catch((error) => {
        loginFeedback.style = "color: crimson";
        loginFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> Email or Password is Incorrect`
        loginForm.reset();
    })
}


const btnCancels = document.querySelectorAll(".btn-cancel");
btnCancels.forEach((btn) => {
    btn.addEventListener("click", () => {
        signupForm.reset();
        signupFeedback.innerHTML = "";
        loginForm.reset();
        loginFeedback.innerHTML = "";
    })
});


firebase.auth().onAuthStateChanged((user) => {
    const currentUser = firebase.auth().currentUser;
    if (user){
        var userNameRef = firebase.database().ref('users/' + currentUser.uid + '/username');
        var userScoreRef = firebase.database().ref('users/' + currentUser.uid + '/score');
        userNameRef.once("value", (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            document.getElementById('btnAccount').innerHTML = data + " <i class='bi bi-person'></i>";
            document.getElementById('DisplayName').innerHTML = data;

        });

        userScoreRef.once("value", (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            document.getElementById('UserScore').innerHTML = data;
        });
    } else {
        document.querySelector("#btnLogIn").innerHTML = "Login <i class='bi bi-person'></i>";
    }
    console.log("User: ", user);
    setupUI(user);
});

const btnLogout = document.querySelector("#btnLogOut");
btnLogout.addEventListener("click", function() {
    firebase.auth().signOut();
    console.log("Logout Completed.");
    alert("Logout Completed!");
})
