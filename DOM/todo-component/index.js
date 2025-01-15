let todos = []
let id = 0;
function todoComponent(todo) {
    const divElmt = document.createElement('div')
    const btnElmt = document.createElement('button')
    const content = document.querySelector('.content')

    btnElmt.innerText = 'Delete'
    divElmt.innerHTML = todo.task
    divElmt.setAttribute('id', `todo-${todo.id}`)

    divElmt.appendChild(btnElmt)
    btnElmt.addEventListener('click', () => {
        todos = todos.filter((t) => t.id !== todo.id);
        divElmt.remove();
    });

    content.appendChild(divElmt);
}

const handleSubmit =()=>{
    const input = document.querySelector('input')
    if(!input.value){
        alert('enter a todo')
        return
    }
    const newTodo = {id: id++, task: input.value.trim()}
    todos = [...todos, newTodo]
    todoComponent(newTodo)

    input.value = ''
}


