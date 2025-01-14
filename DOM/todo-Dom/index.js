//querySelector, querySelectorAll, getElementById, getElementByClassName, getElementsByClassName

const todos = document.querySelector("ul");
const input = document.querySelector("input");
const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", () => {
  const newTodoText = input.value.trim();

  if (newTodoText) {
    const newTodo = document.createElement("li");
    newTodo.innerHTML = newTodoText;

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn-delete')
    deleteBtn.innerText = "delete"
    newTodo.appendChild(deleteBtn)
    todos.appendChild(newTodo);
    input.value = "";
  } else {
    alert("please enter a todo");
  }
});
todos.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('btn-delete')) {
    const li = e.target.closest('li');
    todos.removeChild(li);
    //li.parentNode.remove()
    //li.destroy()
  }
})
