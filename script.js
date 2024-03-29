document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", function () {
      li.remove();
      updateLocalStorage();
    });
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    updateLocalStorage();
  }

  function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(function (task) {
      tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.forEach(function (taskText) {
        addTask(taskText);
      });
    }
  }

  loadTasks();
});
