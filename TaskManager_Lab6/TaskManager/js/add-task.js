/* Участник 2: добавление задач. Использует общий API из main.js. */
(() => {
  const form = document.getElementById("taskForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleInput = document.getElementById("taskTitle");
    const descriptionInput = document.getElementById("taskDescription");

    if (window.TaskManager.addTask(titleInput.value, descriptionInput.value)) {
      form.reset();
      titleInput.focus();
    } else {
      titleInput.setCustomValidity("Введите название задачи.");
      titleInput.reportValidity();
      titleInput.addEventListener("input", () => titleInput.setCustomValidity(""), { once: true });
    }
  });
})();
