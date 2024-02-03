let addList = () => {
    var title = document.getElementById("playerName").value;
    var scoring = document.getElementById("playerScore").value;

    const firebaseRef = firebase.database().ref("MyList");
    firebaseRef.push({
        title: title,
        score: scoring,
    })

    alert("Add list complete!");
    document.getElementById("playerName").value = "";
    document.getElementById("playerScore").value = "";
}