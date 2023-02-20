const loginForm = document.querySelector("#login");

const login = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value
  const password = document.querySelector("#password").value

  if (username && password) {
    console.log(username + password)
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({username: username, password: password}),
      headers: {"Content-Type": "application/json"},
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

loginForm.addEventListener("submit", login);