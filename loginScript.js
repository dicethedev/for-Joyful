
    const loginForm = document.getElementById("loginForm");
    const authTokenKey = "authToken";
    const usersKey = "users";

    // Function to check if the user is authenticated
    const isAuthenticated = () => {
        const authToken = localStorage.getItem(authTokenKey);
        return !!authToken;
    };

    // Function to redirect to the login page
    const redirectToLogin = () => {
        window.location.href = "login.html"; // Replace with your login page URL
    };

    // Function to redirect to the registration page
    const redirectToRegistration = () => {
        window.location.href = "register.html"; // Replace with your registration page URL
    };

    // Function to handle login form submission
    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Get users from local storage
        const users = JSON.parse(localStorage.getItem(usersKey)) || [];

        // Find user by username
        const user = users.find(u => u.username === username);

        if (user && user.password === password) {
            // Set an authentication token in local storage
            localStorage.setItem(authTokenKey, "yourAuthToken");

            // Redirect to the main page here
            window.location.href = "dashboard.html"; // Replace with your dasboard page URL
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };

    if (isAuthenticated()) {
        // User is authenticated, continue loading the page
    } else {
        // User is not authenticated, redirect to the appropriate page
        if (window.location.href.includes("register.html")) {
            // User is on the registration page, continue loading
        } else if (window.location.href.includes("login.html")) {
            // User is on the login page, continue loading
        } else {
            // User is not on login or registration page, redirect to registration
            redirectToRegistration();
        }
    }

    // Attach event listener to the login form
    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    }

