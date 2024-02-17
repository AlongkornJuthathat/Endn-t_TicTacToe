const usersInfo = firebase.database().ref("Users");

let addusers = () => {
    var Display_name = document.getElementById("input-name-signup").value;

    const currentUser = firebase.auth().currentUser;
    usersInfo.child(currentUser.uid).push({
        Display_name: Display_name,
    })

    console.log("Add user complete!");
    
    getUserInfo();
}