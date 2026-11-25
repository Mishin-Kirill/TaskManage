/* Участник 3: изменение статуса, редактирование и удаление задач. */
(() => {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const item = button.closest(".task-item");
    if (!item) return;
    const id = item.dataset.id;

    if (button.dataset.action === "delete") {
      const task = window.TaskManager.getTasks().find(t => t.id === id);
      if (task && window.confirm(`Удалить задачу «${task.title}»?`)) {
        window.TaskManager.deleteTask(id);
      }
    }

    if (button.dataset.action === "edit") {
      const task = window.TaskManager.getTasks().find(t => t.id === id);
      if (!task) return;
      const title = window.prompt("Новое название задачи:", task.title);
      if (title === null) return;
      if (!title.trim()) {
        window.alert("Название задачи не может быть пустым.");
        return;
      }
      const description = window.prompt("Новое описание задачи:", task.description);
      if (description === null) return;
      window.TaskManager.updateTask(id, { title, description });
    }
  });

  list.addEventListener("change", (event) => {
    if (!event.target.matches('input[data-action="toggle"]')) return;
    const item = event.target.closest(".task-item");
    if (!item) return;
    window.TaskManager.updateTask(item.dataset.id, { done: event.target.checked });
  });
})();
