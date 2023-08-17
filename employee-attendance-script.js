// Show modal
const showModal = () => {
    const modal = document.getElementById('attendanceFormModal');
    modal.style.display = 'flex';
};

// Hide modal
const hideModal = () => {
    const modal = document.getElementById('attendanceFormModal');
    modal.style.display = 'none';
};

// Open modal when "+ Add new" button is clicked
const addAttendanceButton = document.querySelector('.add-attendance');
addAttendanceButton.addEventListener('click', showModal);

// Close modal when "X" is clicked
const closeModalButton = document.querySelector('.closeModal');
closeModalButton.addEventListener('click', hideModal);

// Submit Attendance Form
const attendanceSubmit = document.querySelector('.SubmitA');
const employeeNameInput = document.getElementById('employeeName');
const attendanceDateInput = document.getElementById('attendanceDate');
const attendanceTimeInput = document.getElementById('attendanceTime');
const attendanceNotesInput = document.getElementById('attendanceNotes');
const attendanceTable = document.getElementById('attendanceTable');

attendanceSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    const employeeName = employeeNameInput.value;
    const attendanceDate = attendanceDateInput.value;
    const attendanceTime = attendanceTimeInput.value;
    const attendanceNotes = attendanceNotesInput.value;

    const attendanceFormObject = {
        employeeName: employeeName,
        attendanceDate: attendanceDate,
        attendanceTime: attendanceTime,
        attendanceNotes: attendanceNotes
    };

    const currentAttendanceLocal = getAttendanceLocal();
    const editedIndex = parseInt(attendanceSubmit.getAttribute('data-edit-index'), 10);

    if (isNaN(editedIndex)) {
        localStorage.setItem('attendanceData', JSON.stringify([...currentAttendanceLocal, attendanceFormObject]));
    } else {
        currentAttendanceLocal[editedIndex] = attendanceFormObject;
        localStorage.setItem('attendanceData', JSON.stringify(currentAttendanceLocal));
        attendanceSubmit.removeAttribute('data-edit-index');
    }

    updateAttendanceTable();

    hideModal();
});

// Initialize attendance data in local storage if it's not already set
if (!localStorage.getItem('attendanceData')) {
    localStorage.setItem('attendanceData', '[]');
}

const getAttendanceLocal = () => {
    const localAttendanceData = localStorage.getItem('attendanceData');
    return JSON.parse(localAttendanceData);
};

const editAttendance = (index) => {
    const localAttendanceData = getAttendanceLocal();
    const attendanceToEdit = localAttendanceData[index];

    if (!attendanceToEdit) return;

    employeeNameInput.value = attendanceToEdit.employeeName;
    attendanceDateInput.value = attendanceToEdit.attendanceDate;
    attendanceTimeInput.value = attendanceToEdit.attendanceTime;
    attendanceNotesInput.value = attendanceToEdit.attendanceNotes;

    attendanceSubmit.textContent = 'Edit Attendance';
    attendanceSubmit.setAttribute('data-edit-index', index);

    showModal();
};

const deleteAttendance = (index) => {
    const localAttendanceData = getAttendanceLocal();
    localAttendanceData.splice(index, 1);
    localStorage.setItem('attendanceData', JSON.stringify(localAttendanceData));
    updateAttendanceTable();
};

const updateAttendanceTable = () => {
    const localAttendanceData = getAttendanceLocal();
    if (!localAttendanceData) return;

    let attendanceTableContent = [
        `<tr>
            <th>Serial No.</th>
            <th>Employee name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Notes</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>`
    ];

    localAttendanceData.forEach((data, index) => {
        let result = '';
        result += `<td>${index + 1}</td>`;
        result += `<td>${data.employeeName}</td>`;
        result += `<td>${data.attendanceDate}</td>`;
        result += `<td>${data.attendanceTime}</td>`;
        result += `<td>${data.attendanceNotes}</td>`;
        result += `<td><button onclick="editAttendance(${index})">Edit</button></td>`;
        result += `<td><button onclick="deleteAttendance(${index})">Delete</button></td>`;
        
        attendanceTableContent.push(`<tr>${result}</tr>`);
    });

    attendanceTable.innerHTML = attendanceTableContent.join('');
};

updateAttendanceTable();


