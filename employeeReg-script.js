
const employeeForm = document.querySelector('.employee-form');
const employeeTable = document.getElementById('employee-table');
const addNew = document.querySelector('.add');
const closeForm = document.querySelector('.material-symbols-outlined');
const employeeSubmit = document.querySelector('.submitEmployee');
const employeeFirstNameInput = document.getElementById('firstname');
const employeeLastNameInput = document.getElementById('lastname');
const employeeDepartmentInput = document.getElementById('department');
const employeeRoleInput = document.getElementById('role');

// Opening Form
addNew.addEventListener('click', (e) => {
    e.preventDefault();

    employeeForm.classList.add('active');
});

//Closing Form
closeForm.addEventListener('click', (e) => {
    e.preventDefault();

    employeeForm.classList.remove('active');
});

//Submit function
employeeSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Submit button clicked');

    const firstName = employeeFirstNameInput.value;
    const lastName = employeeLastNameInput.value;
    const department = employeeDepartmentInput.value;
    const role = employeeRoleInput.value;

    const employeeFormObject = {
        firstName: firstName,
        lastName: lastName,
        department: department,
        role: role
    };

    const currentEmployeeLocal = getEmployeeLocal();
    const editedIndex = parseInt(employeeSubmit.getAttribute('data-edit-index'), 10);

    if (isNaN(editedIndex)) {
        localStorage.setItem('employeeData', JSON.stringify([...currentEmployeeLocal, employeeFormObject]));
    } else {
        currentEmployeeLocal[editedIndex] = employeeFormObject;
        localStorage.setItem('employeeData', JSON.stringify(currentEmployeeLocal));
        employeeSubmit.removeAttribute('data-edit-index');
    }

    updateEmployeeTable();

    employeeForm.classList.remove('active');
});

// Initialize attendance data in local storage if it's not already set
if (!localStorage.getItem('employeeData')) {
    localStorage.setItem('employeeData', '[]');
}

const getEmployeeLocal = () => {
    const localEmployeeData = localStorage.getItem('employeeData');
    return JSON.parse(localEmployeeData);
};

//Edit button Function
const editReg = (index) => {
    const localEmployeeData = getEmployeeLocal();
    const employeeToEdit = localEmployeeData[index];

    if (!employeeToEdit) return;

    employeeFirstNameInput.value = employeeToEdit.firstName;
    employeeLastNameInput.value = employeeToEdit.lastName;
    employeeDepartmentInput.value = employeeToEdit.department;
    employeeRoleInput.value = employeeToEdit.role;

    employeeSubmit.textContent = 'Edit Employee';
    employeeSubmit.setAttribute('data-edit-index', index);

    employeeForm.classList.add('active');
};

//Delete Button Function
const deleteReg = (index) => {
    const localEmployeeData = getEmployeeLocal();
    localEmployeeData.splice(index, 1);
    localStorage.setItem('employeeData', JSON.stringify(localEmployeeData));
    updateEmployeeTable();
};

const updateEmployeeTable = () => {
  
    const localEmployeeData = getEmployeeLocal();
    if (!localEmployeeData) return;

    let employeeTableContent = [
        `<tr>
           <th>Employee No.</th>
           <th>First name</th>
           <th>Last name</th>
           <th>Department</th>
           <th>Role</th>
           <th>Edit</th>
           <th>Delete</th>
       </tr>`
    ];

    localEmployeeData.forEach((data, index) => {
        let result = '';
        result += `<td>${index + 1}</td>`;
        result += `<td>${data.firstName}</td>`;
        result += `<td>${data.lastName}</td>`;
        result += `<td>${data.department}</td>`;
        result += `<td>${data.role}</td>`;
        result += `<td><button onclick="editReg(${index})">Edit</button></td>`;
        result += `<td><button onclick="deleteReg(${index})">Delete</button></td>`;
        
        employeeTableContent.push(`<tr>${result}</tr>`);
    });

    employeeTable.innerHTML = employeeTableContent.join('');
};
updateEmployeeTable();