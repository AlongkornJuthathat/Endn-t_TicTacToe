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