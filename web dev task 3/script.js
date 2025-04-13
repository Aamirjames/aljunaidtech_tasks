document.addEventListener("DOMContentLoaded", function () {
    // ------------------ To-Do List Functionality ------------------

    const taskForm = document.getElementById("taskForm");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescInput = document.getElementById("taskDesc");
    const taskList = document.getElementById("taskList");

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

            const task = {
                id: Date.now(),
                title,
                desc
            };

            saveTask(task);
            displayTask(task);
            taskForm.reset();
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
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.desc}</p>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(col);

        // Add delete event
        const deleteBtn = col.querySelector(".delete-task");
        deleteBtn.addEventListener("click", function () {
            deleteTask(task.id, col);
        });
    }

    function deleteTask(id, element) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        element.remove();
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
