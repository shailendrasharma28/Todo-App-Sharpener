const form  = document.getElementById('todo-form');

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
   const todoUl = document.getElementById('todo-list') as HTMLInputElement | null;
   const todoValue = (document.getElementById('todo') as HTMLInputElement).value;
   const dueDate = (document.getElementById('due-date') as HTMLInputElement).value;

   const todoListItem = document.createElement("li");
   todoListItem.classList.add("todo-list-element");
   todoListItem.innerHTML = `
    <h2>Task: ${todoValue}</h2>
    <h2>Due Date: ${dueDate}</h2>
    <input type="checkbox">
   `
    if(todoUl){
        todoUl.appendChild(todoListItem);
    }
  });
}