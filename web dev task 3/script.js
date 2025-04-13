document.addEventListener("DOMContentLoaded", function () {
    // ------------------ To-Do List Functionality ------------------

    const taskForm = document.getElementById("taskForm");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescInput = document.getElementById("taskDesc");
    const taskList = document.getElementById("taskList");

    let editingTask = null; // Track the task being edited

    if (taskForm && taskTitleInput && taskDescInput && taskList) {
        // Load tasks from localStorage on page load
        loadTasks();

        // Add Task
        taskForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = taskTitleInput.value.trim();
            const desc = taskDescInput.value.trim();

            if (title === "" || desc === "") {
                showAlert("Please fill in both title and description.", "error");
                return;
            }

            if (editingTask) {
                // If editing, update the task
                editingTask.title = title;
                editingTask.desc = desc;
                updateTaskInStorage(editingTask);
                updateTaskInUI(editingTask);
                editingTask = null; // Clear editing task

                // ✅ Revert button back to "Add Task"
                taskForm.querySelector("button").innerHTML = '<i class="fas fa-plus"></i> Add Task';
            } else {
                // If adding a new task
                const task = {
                    id: Date.now(),
                    title,
                    desc
                };
                saveTask(task);
                displayTask(task);
            }

            taskForm.reset(); // Reset the form after submitting
        });
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(displayTask);
    }

    function displayTask(task) {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
            <div class="card shadow-sm" data-id="${task.id}">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.desc}</p>
                    <button class="btn btn-warning btn-sm edit-task" data-id="${task.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        taskList.appendChild(col);

        // Add edit and delete event listeners
        const editBtn = col.querySelector(".edit-task");
        const deleteBtn = col.querySelector(".delete-task");

        editBtn.addEventListener("click", function () {
            editTask(task, col);
        });

        deleteBtn.addEventListener("click", function () {
            deleteTask(task.id, col);
        });
    }

    function deleteTask(id, element) {
        // Get tasks from localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        
        // Filter out the task with the matching id
        tasks = tasks.filter(task => task.id !== id);
    
        // Save the updated tasks back to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    
        // Remove the task element from the DOM
        element.remove();
    }

    function editTask(task, element) {
        // Populate form with current task data
        taskTitleInput.value = task.title;
        taskDescInput.value = task.desc;

        // Set editing task to current task
        editingTask = task;

        // Change the form submission logic to handle updating
        taskForm.querySelector("button").innerHTML = '<i class="fas fa-save"></i> Update Task'; // Change button to Save
    }

    function updateTaskInStorage(updatedTask) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateTaskInUI(updatedTask) {
        const taskCard = document.querySelector(`.card[data-id='${updatedTask.id}']`);
        taskCard.querySelector(".card-title").textContent = updatedTask.title;
        taskCard.querySelector(".card-text").textContent = updatedTask.desc;
    }

    // ------------------ Registration Form Validation ------------------

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

    // ------------------ Login Form Validation ------------------

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

    // ------------------ Contact Us Form Validation ------------------

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

    // ------------------ Shared Utility Functions ------------------

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function showAlert(message, type) {
        Swal.fire({
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: 2000
        });
    }
});
