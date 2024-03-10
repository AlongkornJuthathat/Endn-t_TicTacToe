let readList = () => {
    var ref = firebase.database().ref("MyList");
    document.getElementById("main-content").innerHTML = "";

    ref.once("value").then((snapshot) => {
        snapshot.forEach((data) => {
            var id = data.key;
            ref.once("value").then((snapshot) => {
                let title = snapshot.child(id).child("title").val();

                const newDiv = `
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input">
                        <label class="form-check-label">${title}</label>
                    </div>
                `
                const newElement = document.createRange().createContextualFragment(newDiv);
                document.getElementById("main-content").appendChild(newElement);
            })
        })
    })
}

window.onload = readList;