
// Function that handle Logout
 const logoutButton = document.getElementById("logoutButton");
    const authTokenKey = "authToken";

    // Function to check if the user is authenticated
    const isAuthenticated = () => {
        const authToken = localStorage.getItem(authTokenKey);
        return !!authToken;
    };

    // Function to redirect to the login page
    const redirectToLogin = () => {
        window.location.href = "login.html"; // Replace with your login page URL
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem(authTokenKey);
        redirectToLogin();
    };

    if (isAuthenticated()) {
        // User is authenticated, continue loading the page
        if (logoutButton) {
            logoutButton.addEventListener("click", handleLogout);
        }
    } else {
        // User is not authenticated, redirect to the login page
        redirectToLogin();
    }

// Light Mode switch

const input = document.querySelector(".theme-switcher input");
input.addEventListener("change", (e) => {
    if (e.target.checked) {
        document.body.setAttribute("data-theme", "light");
    } else {
        document.body.setAttribute("data-theme", "dark");
    }
});

// Web Tab

const tab = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.body');

tab.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();

        tabContent.forEach((content) => {
            content.classList.remove('active');
        });
        tabContent[index].classList.add('active');
    });
});