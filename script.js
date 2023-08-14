
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

    
// Local Storage

const table = document.querySelector('table');
const submit = document.querySelector('.Submit');
const inputEl = document.querySelectorAll('.input');
const form = document.querySelector('form');
const secondTable = document.querySelector('.table');

const getLocal = () => {
    const localData = localStorage.getItem('tableData');

    if (!localData) {
        localStorage.setItem('tableData', '[]')
        return null;
    }
    return JSON.parse(localData);
}

const updateTable = () => {
    const localData = getLocal();
    if (!localData) return;
    if (localData.length === 0) return;

    let tableContent = [
        `<tr>
            <th>Employee No.</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Department</th>
            <th>Role</th>
        </tr>`
    ];

    localData.forEach(data => {
        if (!data.hasOwnProperty("attendanceData")) { // Exclude rows with attendanceData
            let result = '';
            for (const key in data) {
                if (key !== "password") {
                    result += `<td>${data[key]}</td>`;
                }
            }
    
            tableContent.push(`<tr>${result}</tr>`);
        }
    });


    // table.innerHTML = tableContent.join('');

    secondTable.innerHTML = tableContent.join('');
}

updateTable();

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

// Opening Form

const addNew = document.querySelector('.add');
const closeForm = document.querySelector('.material-symbols-outlined');

addNew.addEventListener('click', (e) => {
    e.preventDefault();

    form.classList.add('active');
});

closeForm.addEventListener('click', (e) => {
    e.preventDefault();

    form.classList.remove('active');
});


const createData = ([firstName, lastName, department, role]) => ({
    id: getLocal().length + 1,
    firstName,
    lastName,
    department,
    role,
});

//  Adding Employee

submit.addEventListener('click', (e) => {
    e.preventDefault();

    const formValues = Array.from(inputEl).map(el => el.value)

    const formObject = createData(formValues)

    console.log(formObject);

    const currentLocal = getLocal()

    localStorage.setItem('tableData', JSON.stringify([...currentLocal, formObject]))

    updateTable()

    form.classList.remove('active');

    let result = `<td>${table.getElementsByTagName('tr').length}</td>`;

    inputEl.forEach(el => {
        result += `<td>${el.value}</td>`;
    });
    table.innerHTML += `<tr>${result}</tr>`;

    secondTable.innerHTML += `<tr>${result}</tr>`;
});