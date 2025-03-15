document.addEventListener("DOMContentLoaded", function () {
    // Registration Form Validation
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let fullName = document.getElementById("fullName").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;

            if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
                showAlert("All fields are required!", "error");
                return;
            }

            if (!validateEmail(email)) {
                showAlert("Please enter a valid email address!", "error");
                return;
            }

            if (password.length < 6) {
                showAlert("Password must be at least 6 characters long!", "error");
                return;
            }

            if (password !== confirmPassword) {
                showAlert("Passwords do not match!", "error");
                return;
            }

            Swal.fire("Success!", "Registration successful!", "success");
            registerForm.reset();
        });
    }

    // Login Form Validation
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value;

            if (email === "" || password === "") {
                showAlert("Please fill out all fields!", "error");
                return;
            }

            if (!validateEmail(email)) {
                showAlert("Please enter a valid email address!", "error");
                return;
            }

            Swal.fire("Success!", "Login successful!", "success");
            loginForm.reset();
        });
    }

    // Email Validation Function
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to Show Alerts
    function showAlert(message, type) {
        Swal.fire({
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: 2000
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Contact Us Form Validation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let subject = document.getElementById("subject").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || subject === "" || message === "") {
                showAlert("All fields are required!", "error");
                return;
            }

            if (!validateEmail(email)) {
                showAlert("Please enter a valid email address!", "error");
                return;
            }

            Swal.fire("Thank You!", "Your message has been sent successfully.", "success");
            contactForm.reset();
        });
    }

    // Email Validation Function
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to Show Alerts
    function showAlert(message, type) {
        Swal.fire({
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: 2000
        });
    }
});
