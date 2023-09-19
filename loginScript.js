
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
        window.location.href = "login.html";
    };

    // Function to redirect to the registration page
    const redirectToRegistration = () => {
        window.location.href = "register.html";
    };

    // Function to handle login form submission
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        // Detect a face
         const faceDetected = await detectFace();

         if (!faceDetected) {
             alert("Face not detected. Please try again.");
             return;
         }


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

    async function detectFace() {
        const videoElement = document.getElementById("video");
        const detections = await faceapi.detectSingleFace(videoElement);
    
        if (detections) {
            return true; // Face detected
        } else {
            return false; // No face detected
        }
    }
    

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


// Initialize face recognition
async function initializeFaceRecognition() {
    const videoElement = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    let displaySize = { width: 640, height: 480 }; // Default dimension

    // Load necessary models
    await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('./models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('./models');
    
    // Load the SsdMobilenetv1 model
    await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');

    // Access the user's webcam
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;

    // Detect faces and draw on the canvas
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoElement).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 1000); // Adjust the interval as needed
}

// Call this function to initialize face recognition
initializeFaceRecognition();
