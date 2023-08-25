const leaveTable = document.getElementById('leaveTableEmployee');
const leaveForm = document.querySelector('.leave-form');
const leaveSubmit = document.querySelector('.SubmitLeave');
const leaveInputEl = document.querySelectorAll('.leave-form .input');
const addLeaveButton = document.querySelector('.add-leave');
const closeLeaveFormButton = document.querySelector('.leave-form .closeModal');
const employeeLeaveFullNameInput = document.getElementById('fullName');
const employeeLeaveTypeInput = document.getElementById('leaveType');
const employeeLeaveStartDateInput = document.getElementById('startDate');
const employeeLeaveEndDateInput = document.getElementById('endDate');
const employeeLeaveSearchInput = document.getElementById('employeeLeaveSearchInput');

//Opening Form
addLeaveButton.addEventListener('click', () => {
    leaveForm.classList.add('active');
    clearLeaveForm();
});

//Closing Form
closeLeaveFormButton.addEventListener('click', () => {
    leaveForm.classList.remove('active');
    clearLeaveForm();
});

// Clear Leave Form
function clearLeaveForm() {
    leaveInputEl.forEach(input => (input.value = ''));
}

// Populate Leave Form for Editing
function populateLeaveForm(leave) {
    leaveInputEl[0].value = leave.fullName;
    leaveInputEl[1].value = leave.leaveType;
    leaveInputEl[2].value = leave.startDate;
    leaveInputEl[3].value = leave.endDate;
};

leaveSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('Submit button clicked');

    const fullName = employeeLeaveFullNameInput.value;
    const leaveType = employeeLeaveTypeInput.value;
    const startDate = employeeLeaveStartDateInput.value;
    const endDate = employeeLeaveEndDateInput.value;

    const employeeLeaveFormObject = {
        fullName: fullName,
        leaveType: leaveType,
        startDate: startDate,
        endDate: endDate
    };

    const currentEmployeeLeaveLocal = getEmployeeLeaveLocal();
    const editedIndex = parseInt(leaveSubmit.getAttribute('data-edit-index'), 10);

    if (isNaN(editedIndex)) {
        localStorage.setItem('leaveData', JSON.stringify([...currentEmployeeLeaveLocal, employeeLeaveFormObject]));
    } else {
        currentEmployeeLeaveLocal[editedIndex] = employeeLeaveFormObject;
        localStorage.setItem('leaveData', JSON.stringify(currentEmployeeLeaveLocal));
        leaveSubmit.removeAttribute('data-edit-index');
    }

    updateEmployeeLeaveTable();

    leaveForm.classList.remove('active');
    clearLeaveForm();
});


// Initialize attendance data in local storage if it's not already set
if (!localStorage.getItem('leaveData')) {
    localStorage.setItem('leaveData', '[]');
}

const getEmployeeLeaveLocal = () => {
    const localEmployeeLeaveData = localStorage.getItem('leaveData');
    return JSON.parse(localEmployeeLeaveData);
};

//Edit button Function
const editEmployeeLeave = (index) => {
    const localEmployeeLeaveData = getEmployeeLeaveLocal();
    const employeeLeaveToEdit = localEmployeeLeaveData[index];

    if (!employeeLeaveToEdit) return;

    employeeLeaveFullNameInput.value = employeeLeaveToEdit.leaveFullName;
    employeeLeaveTypeInput.value = employeeLeaveToEdit.leaveType;
    employeeLeaveStartDateInput.value = employeeLeaveToEdit.leaveStartDate;
    employeeLeaveEndDateInput.value = employeeLeaveToEdit.leaveEndDate;

    leaveSubmit.textContent = 'Edit Leave Details';
    leaveSubmit.setAttribute('data-edit-index', index);

    leaveForm.classList.add('active');
    clearLeaveForm();
};

//Delete Button Function
const deleteEmployeeLeave = (index) => {
    const localEmployeeLeaveData = getEmployeeLeaveLocal();
    localEmployeeLeaveData.splice(index, 1);
    localStorage.setItem('leaveData', JSON.stringify(localEmployeeLeaveData));
    updateEmployeeLeaveTable();
};

const updateEmployeeLeaveTable = () => {
  
    const localEmployeeLeaveData = getEmployeeLeaveLocal();
    if (!localEmployeeLeaveData) return;

    
    const searchTerm = employeeLeaveSearchInput.value.toLowerCase();

    const filteredData = localEmployeeLeaveData.filter((data) => {
        const fullName = `${data.fullName}`.toLowerCase();
        return fullName.includes(searchTerm);
    });

    let employeeLeaveTableContent = [
        `<tr>
          <th>Serial No</th>
           <th>Full Name</th>
           <th>Leave Type</th>
           <th>Start Date</th>
           <th>End Date</th>
           <th>Edit</th>
           <th>Delete</th>
       </tr>`
    ];

    if (filteredData.length === 0) {
        employeeLeaveTableContent.push(`<tr><td colspan="7">No matching records found</td></tr>`);
    } else {
    filteredData.forEach((data, index) => {
        let result = '';
        result += `<td>${index + 1}</td>`;
        result += `<td>${data.fullName}</td>`;
        result += `<td>${data.leaveType}</td>`;
        result += `<td>${data.startDate}</td>`;
        result += `<td>${data.endDate}</td>`;
        result += `<td><button class="edit" onclick="editEmployeeLeave(${index})">Edit</button></td>`;
        result += `<td><button class="delete" onclick="deleteEmployeeLeave(${index})">Delete</button></td>`;
        
        employeeLeaveTableContent.push(`<tr>${result}</tr>`);
    });

}

    leaveTable.innerHTML = employeeLeaveTableContent.join('');
};
employeeLeaveSearchInput.addEventListener('input', updateEmployeeLeaveTable);
updateEmployeeLeaveTable();

