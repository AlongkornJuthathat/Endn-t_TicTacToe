const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", createUser);

const signupFeedback = document.querySelector("#feedback-msg-signup");
const signupModal = new bootstrap.Modal(document.querySelector("#modal-signup"));

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", loginUser);

const loginFeedback = document.querySelector("#feedback-msg-login");
const loginModal = new bootstrap.Modal(document.querySelector("#modal-login"));


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
        signupFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}.`;
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
        loginFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`
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
    if (user) {
        console.log("User: ", user);
        // getList(user);
    }
    setupUI(user);
});

const btnLogout = document.querySelector("#btnLogOut");
btnLogout.addEventListener("click", function() {
    firebase.auth().signOut();
    console.log("Logout Completed.");
})