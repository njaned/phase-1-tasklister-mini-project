document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const input = document.querySelector("#new-task-description");
  const prioritySelect = document.querySelector("#task-priority");
  const sortSelect = document.querySelector("#sort-tasks");
  const taskList = document.querySelector("#tasks");

  const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

  function createTaskItem(description, priority) {
    const item = document.createElement("li");
    item.className = `task ${priority}`;
    item.dataset.priority = priority;

    const text = document.createElement("span");
    text.className = "task-description";
    text.textContent = description;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-task";
    deleteButton.textContent = "Delete";

    item.append(text, deleteButton);
    return item;
  }

  function sortTasks(direction) {
    const items = Array.from(taskList.children);
    const multiplier = direction === "descending" ? -1 : 1;

    items
      .sort(
        (a, b) =>
          (PRIORITY_ORDER[a.dataset.priority] -
            PRIORITY_ORDER[b.dataset.priority]) *
          multiplier
      )
      .forEach((item) => taskList.appendChild(item));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const description = input.value.trim();
    if (!description) return;

    const priority = prioritySelect ? prioritySelect.value : "medium";
    taskList.appendChild(createTaskItem(description, priority));

    if (sortSelect && sortSelect.value !== "none") {
      sortTasks(sortSelect.value);
    }

    form.reset();
    input.focus();
  });

  taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-task")) {
      event.target.closest("li").remove();
    }
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      if (sortSelect.value !== "none") sortTasks(sortSelect.value);
    });
  }
});
