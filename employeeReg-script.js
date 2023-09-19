
const employeeForm = document.querySelector('.employee-form');
const employeeTable = document.getElementById('employee-table');
const addNew = document.querySelector('.add');
const closeForm = document.querySelector('.material-symbols-outlined');
const employeeSubmit = document.querySelector('.submitEmployee');
const employeeFirstNameInput = document.getElementById('firstname');
const employeeLastNameInput = document.getElementById('lastname');
const employeeDepartmentInput = document.getElementById('department');
const employeeRoleInput = document.getElementById('role');
const searchInput = document.getElementById('searchInput');


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

    const searchTerm = searchInput.value.toLowerCase();

    const filteredData = localEmployeeData.filter((data) => {
        const fullName = `${data.firstName} ${data.lastName}`.toLowerCase();
        return fullName.includes(searchTerm);
    });

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

    if (filteredData.length === 0) {
        employeeTableContent.push(`<tr><td colspan="7">No matching records found</td></tr>`);
    } else {
        filteredData.forEach((data, index) => {
            let result = '';
            result += `<td>${index + 1}</td>`;
            result += `<td>${data.firstName}</td>`;
            result += `<td>${data.lastName}</td>`;
            result += `<td>${data.department}</td>`;
            result += `<td>${data.role}</td>`;
            result += `<td><button class="edit" onclick="editReg(${index})">Edit</button></td>`;
            result += `<td><button class="delete" onclick="deleteReg(${index})">Delete</button></td>`;
    
            employeeTableContent.push(`<tr>${result}</tr>`);
        });
    }

    employeeTable.innerHTML = employeeTableContent.join('');
};
searchInput.addEventListener('input', updateEmployeeTable);
updateEmployeeTable();


// // Function to initialize face recognition
// async function initializeFaceRecognition() {
//     const videoElement = document.getElementById('video');
//     const canvas = document.getElementById('canvas');
//     const displaySize = { width: videoElement.width, height: videoElement.height };

//     // Access the user's webcam
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoElement.srcObject = stream;

//     // Load the face-api.js models
//     await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
//     await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//     await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

//     // Detect faces and draw on the canvas
//     setInterval(async () => {
//         const detections = await faceapi.detectAllFaces(videoElement).withFaceLandmarks().withFaceDescriptors();
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//     }, 1000); // Adjust the interval as needed
// }

// // Call this function to initialize face recognition
// initializeFaceRecognition();





