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
<<<<<<< HEAD
      titleInput.setCustomValidity("Введите задачу.");
=======
      titleInput.setCustomValidity("Введите название задачи.");
>>>>>>> 076b328bd10c0ba2677a61b1ad193d37482a8a4c
      titleInput.reportValidity();
      titleInput.addEventListener("input", () => titleInput.setCustomValidity(""), { once: true });
    }
  });
})();
