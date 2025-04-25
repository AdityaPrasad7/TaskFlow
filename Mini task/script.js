const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const completedTasks = document.getElementById("completedTasks");

// Load tasks from localStorage on page load
window.onload = () => {
  const active = JSON.parse(localStorage.getItem("activeTasks")) || [];
  const completed = JSON.parse(localStorage.getItem("completedTasks")) || [];

  active.forEach(task => createTaskElement(task, false));
  completed.forEach(task => createTaskElement(task, true));
};

// Save tasks to localStorage
function saveTasks() {
  const active = [...taskList.children].map(li => li.textContent.replace("Done", "").trim());
  const completed = [...completedTasks.children].map(li => li.textContent.replace("Delete", "").trim());

  localStorage.setItem("activeTasks", JSON.stringify(active));
  localStorage.setItem("completedTasks", JSON.stringify(completed));
}

// Create task element
function createTaskElement(taskText, isCompleted) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (isCompleted) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    deleteBtn.onclick = () => {
      completedTasks.removeChild(li);
      saveTasks();
    };
    li.appendChild(deleteBtn);
    completedTasks.appendChild(li);
  } else {
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.className = "doneBtn";
    doneBtn.onclick = () => {
      taskList.removeChild(li);
      li.removeChild(doneBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "deleteBtn";
      deleteBtn.onclick = () => {
        completedTasks.removeChild(li);
        saveTasks();
      };

      li.appendChild(deleteBtn);
      completedTasks.appendChild(li);
      saveTasks();
    };
    li.appendChild(doneBtn);
    taskList.appendChild(li);
  }
}

// Add task on button click
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  createTaskElement(taskText, false);
  taskInput.value = "";
  saveTasks();
});
