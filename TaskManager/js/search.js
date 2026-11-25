/* Участник 4: поиск по названию/описанию и фильтр по статусу. */
(() => {
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");
  if (!searchInput || !statusFilter) return;

  function applyFilters() {
    const query = searchInput.value.trim().toLocaleLowerCase("ru");
    const status = statusFilter.value;
    const filtered = window.TaskManager.getTasks().filter(task => {
      const matchesText = `${task.title} ${task.description}`.toLocaleLowerCase("ru").includes(query);
      const matchesStatus = status === "all" || (status === "done" ? task.done : !task.done);
      return matchesText && matchesStatus;
    });
    window.TaskManager.render(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  statusFilter.addEventListener("change", applyFilters);

  // После добавления/изменения задач фильтр будет применяться при следующем вводе.
  // Событие taskmanager:changed можно использовать для расширения проекта.
})();
