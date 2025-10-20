"use strict";
const form = document.getElementById('todo-form');
const todoUl = document.getElementById('todo-list');
// Load todos from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const todos = getTodosFromStorage();
    renderTodos(todos);
});
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const todoValue = document.getElementById('todo').value.trim();
        const dueDate = document.getElementById('due-date').value.trim();
        if (!todoValue || !dueDate)
            return; // stop if empty
        const newTodo = {
            task: todoValue,
            dueDate,
            completed: false,
        };
        const todos = getTodosFromStorage();
        todos.push(newTodo);
        saveTodosToStorage(todos);
        addTodoToDOM(newTodo);
        // clear inputs
        document.getElementById('todo').value = "";
        document.getElementById('due-date').value = "";
    });
}
// ---------------- Helper functions ----------------
function getTodosFromStorage() {
    const todosJSON = localStorage.getItem("todos");
    return todosJSON ? JSON.parse(todosJSON) : [];
}
function saveTodosToStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function renderTodos(todos) {
    if (!todoUl)
        return;
    todoUl.innerHTML = ""; // clear list first
    todos.forEach(addTodoToDOM);
}
function addTodoToDOM(todo) {
    if (!todoUl)
        return;
    const li = document.createElement("li");
    li.classList.add("todo-list-element");
    li.innerHTML = `
    <h2>Task: ${todo.task}</h2>
    <h2>Due Date: ${todo.dueDate}</h2>
    <input type="checkbox" ${todo.completed ? "checked" : ""}>
    <button class="delete-btn">Delete</button>
  `;
    // --- Checkbox logic ---
    const checkbox = li.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        const todos = getTodosFromStorage();
        const updated = todos.map(t => t.task === todo.task && t.dueDate === todo.dueDate ? todo : t);
        saveTodosToStorage(updated);
    });
    // --- Delete button logic ---
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        // 1. Remove from DOM
        li.remove();
        // 2. Remove from localStorage
        const todos = getTodosFromStorage();
        const filtered = todos.filter(t => !(t.task === todo.task && t.dueDate === todo.dueDate));
        saveTodosToStorage(filtered);
    });
    todoUl.appendChild(li);
}
