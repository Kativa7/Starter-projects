// selectors
const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-button');
const toDoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//event listener
document.addEventListener('DOMContentLoaded',getTodos);
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);

//functions 
function addToDo(event) {
    event.preventDefault();
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo');
    const newToDo = document.createElement('li');
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);
    saveLocalToDos(toDoInput.value)
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    toDoDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    toDoDiv.appendChild(trashButton);
    toDoList.appendChild(toDoDiv);
    toDoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    //delete
    if (item.classList[0] === "trash-btn") {
        const toDo = item.parentElement;
        toDo.classList.add("fall");
        removeLocalTodos(toDo);
        toDo.addEventListener("transitionend", function () {
            toDo.remove();
        })
    }
    //check-btn
    if (item.classList[0] === "complete-btn") {
        const toDo = item.parentElement;
        toDo.classList.toggle("completed");
    }
}

function filterToDo(event) {
    const todos = toDoList.childNodes;
    todos.forEach(function (toDo) {
        switch (event.target.value) {
            case "all":
                toDo.style.display = "flex";
                break;
            case "completed":
                if (toDo.classList.contains("completed")) {
                    toDo.style.display = "flex";
                } else {
                    toDo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!toDo.classList.contains("completed")) {
                    toDo.style.display = "flex";
                } else {
                    toDo.style.display = "none";
                }
                break;

        }
    });
}
function saveLocalToDos(toDo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(toDo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(toDo){
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add('todo');
        const newToDo = document.createElement('li');
        newToDo.innerText = toDo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        toDoDiv.appendChild(completedButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        toDoDiv.appendChild(trashButton);
        toDoList.appendChild(toDoDiv);
    });
}
function removeLocalTodos(toDo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const toDoIndex = todos.indexOf(toDo.children[0].innerText);
    todos.splice(toDoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos))
}