/* Участник 1: общая логика, отображение и статистика.
   Контракт для остальных модулей: window.TaskManager.addTask(title, description),
   window.TaskManager.getTasks(), window.TaskManager.render().
*/
(() => {
  const STORAGE_KEY = "taskmanager_tasks_v1";
  let tasks = [];

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    tasks = Array.isArray(saved) ? saved : [];
  } catch {
    tasks = [];
  }

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  function render(list = tasks) {
    const container = document.getElementById("taskList");
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = '<div class="empty-state">Подходящих задач нет.</div>';
    } else {
      container.innerHTML = list.map((task) => `
        <article class="task-item ${task.done ? "is-done" : ""}" data-id="${escapeHtml(task.id)}">
          <input class="task-check" type="checkbox" data-action="toggle" aria-label="Отметить выполнение" ${task.done ? "checked" : ""}>
          <div class="task-content">
            <h3 class="task-title">${escapeHtml(task.title)}</h3>
            <p class="task-description">${escapeHtml(task.description || "Описание не указано")}</p>
          </div>
          <div class="task-actions">
            <button class="icon-button" type="button" data-action="edit">Изменить</button>
            <button class="icon-button delete" type="button" data-action="delete">Удалить</button>
          </div>
        </article>`).join("");
    }

    const total = tasks.length;
    document.getElementById("totalCount").textContent = total;
    document.getElementById("activeCount").textContent = tasks.filter(t => !t.done).length;
    document.getElementById("doneCount").textContent = tasks.filter(t => t.done).length;
    document.getElementById("visibleCount").textContent = `Показано задач: ${list.length}`;
  }

  function addTask(title, description) {
    const cleanTitle = String(title || "").trim();
    if (!cleanTitle) return false;
    tasks.unshift({
      id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      title: cleanTitle,
      description: String(description || "").trim(),
      done: false,
      createdAt: new Date().toISOString()
    });
    save();
    render();
    return true;
  }

  function updateTask(id, changes) {
    const task = tasks.find(item => item.id === id);
    if (!task) return false;
    if (typeof changes.title === "string" && changes.title.trim()) task.title = changes.title.trim();
    if (typeof changes.description === "string") task.description = changes.description.trim();
    if (typeof changes.done === "boolean") task.done = changes.done;
    save();
    render();
    return true;
  }

  function deleteTask(id) {
    const oldLength = tasks.length;
    tasks = tasks.filter(item => item.id !== id);
    if (tasks.length === oldLength) return false;
    save();
    render();
    return true;
  }

  window.TaskManager = {
    addTask,
    getTasks: () => tasks.map(task => ({ ...task })),
    updateTask,
    deleteTask,
    render
  };

  const date = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  document.getElementById("todayDate").textContent = date.format(new Date());
  render();
})();
