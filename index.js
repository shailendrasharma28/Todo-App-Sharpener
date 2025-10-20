"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
const form = document.getElementById('todo-form');
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const todoUl = document.getElementById('todo-list');
        const todoValue = document.getElementById('todo').value;
        const dueDate = document.getElementById('due-date').value;
        const todoListItem = document.createElement("li");
        todoListItem.classList.add("todo-list-element");
        todoListItem.innerHTML = `
    <h2>Task: <br> ${todoValue}</h2>
    <h2>Due Date: <br> ${dueDate}</h2>
    <input type="checkbox">
   `;
        if (todoUl) {
            todoUl.appendChild(todoListItem);
        }
    });
}
//# sourceMappingURL=index.js.map