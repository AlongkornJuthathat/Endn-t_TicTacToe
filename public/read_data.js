let readList = () => {
    var ref = firebase.database().ref("users");
    document.getElementById("forAddName").innerHTML = "";
    document.getElementById("forAddScore").innerHTML = "";

    ref.once("value").then((snapshot) => {
        let playerData = [];
        snapshot.forEach((data) => {
            var id = data.key;
            let name = snapshot.child(id).child("username").val();
            let score = snapshot.child(id).child("score").val();
            playerData.push({ name, score });
        });

        playerData.sort((a, b) => b.score - a.score);

        playerData.forEach(player => {
            const newTableName = `<div>${player.name}</div>`;
            const newTableScore = `<div>${player.score}</div>`;

            const newElementName = document.createRange().createContextualFragment(newTableName);
            document.getElementById("forAddName").appendChild(newElementName);

            const newElementScore = document.createRange().createContextualFragment(newTableScore);
            document.getElementById("forAddScore").appendChild(newElementScore);
        });
    });
}

window.onload = readList;  