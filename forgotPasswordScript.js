document.addEventListener("DOMContentLoaded", function () {
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");

    const handleForgotPasswordSubmit = (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const newPassword = document.getElementById("newPassword").value;

        // Update password in local storage (replace this with your local storage logic)
        localStorage.setItem(username, newPassword);

        alert("Password reset successful. You can now log in with your new password.");
        window.location.href = "login.html";
    };

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", handleForgotPasswordSubmit);
    }
});
