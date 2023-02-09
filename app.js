const token = localStorage.getItem("token");
if (!token) {
    window.location.replace("login.html")
}
let form = document.querySelector("#form"),
    list = document.querySelector("#list"),
    input = document.querySelector("#input");

//? CREATE TODO

form.addEventListener("submit", (event) => {
    let inputVal = event.target[0].value;
    event.preventDefault();

    fetch(`https://todo-for-n92.cyclic.app/todos/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(token),
        },

        body: JSON.stringify({
            task: inputVal,
        }),
    })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch("error");

    if (input.value == "") {
        alert("Matn Kiriting!");
    } else {
        const listText = document.createElement("div");
        const btns = document.createElement("div");
        const text = document.createElement("li");
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const toggleBtn = document.createElement("button");

        deleteBtn.className = "deleteBtn";
        editBtn.className = "editBtn";
        text.className = "text";
        listText.className = "listText";
        toggleBtn.className = "toggleBtn";
        btns.className = "btns";
        toggleBtn.textContent = "Check";
        editBtn.textContent = "Editing";
        deleteBtn.textContent = "Delete";

        text.innerText = inputVal;
        list.appendChild(listText);
        listText.append(text, btns);
        btns.append(toggleBtn, editBtn, deleteBtn);

        //? GET TODOS
        function allTodo() {
            fetch('https://todo-for-n92.cyclic.app/todos/all', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
            })
                .then((response) => response.json())
                .then((data) => {

                    console.log('Success:', data);
                })
                .catch((error) => {

                    console.error('Error:', error);
                });
        }
        allTodo();

        //? DELETE TODO
        deleteBtn.addEventListener('click', () => {
            fetch("https://todo-for-n92.cyclic.app/todos/",{
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            listText.style.display = "none";
        });

        //? EDIT TOTO
        editBtn.addEventListener('click', () => {
            const edit = prompt("Enter Editing Text?");
            text.textContent = edit;
        });

        //? CHECK TODO
        toggleBtn.addEventListener('click', () => {
            text.classList.toggle('checkshow');
        //     fetch("https://todo-for-n92.cyclic.app/todos?id={todoId}", {
        //   headers: {
        //      "x-access-token": token
        //    }
        // .then((response) => response.json())
        //         .then((data) => {
        //             console.log('Success:', data);
        //         })
        //         .catch((error) => {
        //             console.error('Error:', error);
        //         });
        });
    }

    input.value = "";
});



