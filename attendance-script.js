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
    localStorage.setItem('attendanceData', JSON.stringify([...currentAttendanceLocal, attendanceFormObject]));

    updateAttendanceTable();

    hideModal();
});

const getAttendanceLocal = () => {
    const localAttendanceData = localStorage.getItem('attendanceData');

    if (!localAttendanceData) {
        localStorage.setItem('attendanceData', '[]');
        return null;
    }
    return JSON.parse(localAttendanceData);
};

const updateAttendanceTable = () => {
    const localAttendanceData = getAttendanceLocal();
    if (!localAttendanceData) return;
    if (localAttendanceData.length === 0) return;

    let attendanceTableContent = [
        `<tr>
            <th>Serial No.</th>
            <th>Employee name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Notes</th>
        </tr>`
    ];

    localAttendanceData.forEach((data, index) => {
        let result = '';
        result += `<td>${index + 1}</td>`;
        result += `<td>${data.employeeName}</td>`;
        result += `<td>${data.attendanceDate}</td>`;
        result += `<td>${data.attendanceTime}</td>`;
        result += `<td>${data.attendanceNotes}</td>`;
        
        attendanceTableContent.push(`<tr>${result}</tr>`);
    });

    attendanceTable.innerHTML = attendanceTableContent.join('');
};


