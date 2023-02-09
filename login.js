const loginBtn = document.getElementById('signIn');
const signUpBtn = document.getElementById('signUp');
const signForm = document.getElementById('form1');
const loginForm = document.getElementById('form2');
const container = document.querySelector('.container');
const loginUser = document.querySelector('#login-user');
const loginPass = document.querySelector('#login-pass');
const signUser = document.querySelector('#sign-user');
const signPass = document.querySelector('#sign-pass');

//? SIGNIN JS

loginForm.addEventListener("submit", (e) =>{
      e.preventDefault();
      const data = {
        username: event.target[0].value,
        password: event.target[1].value,
      };
      fetch("https://todo-for-n92.cyclic.app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.token));
        window.location.replace("index.html");
      })
      .catch("error");
    });
      
//? SIGNUP JS

signForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const data = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
  
    fetch("https://todo-for-n92.cyclic.app/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.token));
        window.location.replace("index.html");
      })
      .catch("error");
});


//? ANIMATION JS

signUpBtn.addEventListener("click", () => {
    container.classList.add('right-panel-active');
});
loginBtn.addEventListener("click", () => {
    container.classList.remove('right-panel-active');
});