const signupForm = document.querySelector("#signup");

const signup = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value
  const password = document.querySelector("#password").value

  if (username && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

signupForm.addEventListener("submit", signup);