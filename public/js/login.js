  // Already registered user handler
  const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (email && password) {
      console.log('logged in');
      // Send a POST request to the API endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // Sign up handler
  // Function to show the signup form
  function showSignupForm() {
    // Toggle the visibility of the signup form
    const signupCard = document.getElementById("signup-card");
    signupCard.classList.toggle("is-hidden");
  }

  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector("#signup-first-name").value.trim();
    const lastName = document.querySelector("#signup-last-name").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (firstName && lastName && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
  
      if (response.ok) {
        // Retrieve user data after successful signup
        const userData = await response.json();
        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("redirecting to new user profile...");
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // Event Listeners
  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
  
  // document
  //   .querySelector(".signup-form")
  //   .addEventListener("submit", signupFormHandler);

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);
  
    