interface Todo {
  task: string;
  dueDate: string;
  completed: boolean;
}

const form = document.getElementById('todo-form') as HTMLFormElement | null;
const todoUl = document.getElementById('todo-list') as HTMLUListElement | null;

// Load todos from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const todos = getTodosFromStorage();
  renderTodos(todos);
});

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoValue = (document.getElementById('todo') as HTMLInputElement).value.trim();
    const dueDate = (document.getElementById('due-date') as HTMLInputElement).value.trim();

    if (!todoValue || !dueDate) return; // stop if empty

    const newTodo: Todo = {
      task: todoValue,
      dueDate,
      completed: false,
    };

    const todos = getTodosFromStorage();
    todos.push(newTodo);
    saveTodosToStorage(todos);

    addTodoToDOM(newTodo);

    // clear inputs
    (document.getElementById('todo') as HTMLInputElement).value = "";
    (document.getElementById('due-date') as HTMLInputElement).value = "";
  });
}

// ---------------- Helper functions ----------------

function getTodosFromStorage(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  return todosJSON ? JSON.parse(todosJSON) : [];
}

function saveTodosToStorage(todos: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos(todos: Todo[]): void {
  if (!todoUl) return;
  todoUl.innerHTML = ""; // clear list first
  todos.forEach(addTodoToDOM);
}
function addTodoToDOM(todo: Todo): void {
  if (!todoUl) return;

  const li = document.createElement("li");
  li.classList.add("todo-list-element");
  li.innerHTML = `
    <h2>Task: ${todo.task}</h2>
    <h2>Due Date: ${todo.dueDate}</h2>
    <input type="checkbox" ${todo.completed ? "checked" : ""}>
    <button class="delete-btn">Delete</button>
  `;

  // --- Checkbox logic ---
  const checkbox = li.querySelector("input[type='checkbox']") as HTMLInputElement;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    const todos = getTodosFromStorage();
    const updated = todos.map(t =>
      t.task === todo.task && t.dueDate === todo.dueDate ? todo : t
    );
    saveTodosToStorage(updated);
  });

  // --- Delete button logic ---
  const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement;
  deleteBtn.addEventListener("click", () => {
    // 1. Remove from DOM
    li.remove();

    // 2. Remove from localStorage
    const todos = getTodosFromStorage();
    const filtered = todos.filter(
      t => !(t.task === todo.task && t.dueDate === todo.dueDate)
    );
    saveTodosToStorage(filtered);
  });

  todoUl.appendChild(li);
}
