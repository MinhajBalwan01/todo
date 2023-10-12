const allToDos = document.querySelector('.all-todos');
const todoInput = document.getElementById('todo-input');
const todos = JSON.parse(localStorage.getItem('todos')) || [];

const saveTodosToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const createTodoElement = (inputValue) => {
    const todo = document.createElement("li");
    todo.className = "todo";

    const todo_para = document.createElement("p");

    const divElement = document.createElement("div");
    divElement.className = "todo-action";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn ph-fill ph-check-fat icon";
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn ph-fill ph-pencil icon";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn ph-fill ph-trash icon";
    divElement.appendChild(completeBtn);
    divElement.appendChild(editBtn);
    divElement.appendChild(deleteBtn);

    todo.appendChild(todo_para);
    todo.appendChild(divElement);

    todo_para.textContent = inputValue;

    todo.style.transform = "translateY(5px)";
    setTimeout(() => {
        todo.style.transform = "translateY(0)";
    }, 10);

    allToDos.appendChild(todo);

    deleteBtn.addEventListener('click', () => {
        setTimeout(() => {
            todo.style.opacity = "0";
            setTimeout(() => {
                todo.remove();
                const index = todos.indexOf(todo_para.textContent);
                if (index !== -1) {
                    todos.splice(index, 1);
                    saveTodosToLocalStorage();
                }
            }, 200);
        }, 100);
    });

    editBtn.addEventListener('click', () => {
        const newText = prompt("Edit the todo:", todo_para.textContent);
        if (newText !== null && newText.trim() !== "") {
            todo_para.textContent = newText;
            const index = todos.indexOf(inputValue);
            if (index !== -1) {
                todos[index] = newText;
                saveTodosToLocalStorage();
            }
        }
    });

    completeBtn.addEventListener('click', () => {
        todo_para.style.textDecoration = "line-through";
        todo_para.style.color = "#aaa";
        editBtn.disabled = true;
    });
};

const loadTodosFromLocalStorage = () => {
    todos.forEach(todo => {
        createTodoElement(todo);
    });
};

todoInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        const inputValue = todoInput.value.trim();
        if (inputValue) {
            createTodoElement(inputValue);
            todos.push(inputValue);
            saveTodosToLocalStorage();
            todoInput.value = "";
        }
    }
});

loadTodosFromLocalStorage();