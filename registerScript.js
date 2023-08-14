
    const form = document.querySelector('.register-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form inputs
        const firstName = form.firstname.value;
        const lastName = form.lastname.value;
        const department = form.department.value;
        const role = form.role.value;
        const username = form.username.value;
        const password = form.password.value;

        // Create user object
        const user = {
            firstName,
            lastName,
            department,
            role,
            username,
            password
        };

        // Store user in local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Clear form inputs
        form.reset();

        // Display success message
        alert('Registration successful! You can now log in.');

        // Redirect to login page
        window.location.href = 'login.html';
    });