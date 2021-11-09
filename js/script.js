const todoForm = document.querySelector('#form__todo');
const auther = document.getElementById('auther');
const post = document.getElementById('post');
const list = document.querySelector('.todo__list');





const base = {
    employee: 'Петров Сергей Иванович',
    todo: getTodoLS(),
    check(id) {
        for (let i = 0; i < base.todo.length; i++) {
            if (base.todo[i].id === id) {
                base.todo[i].ready = true;
            }
        }
    },
    addTodo(auther, post) {
        const todo = {
            id: 'td' + (Date.now()),   //(base.todo.length + 1),
            auther,
            post,
            ready: false,
        };

        base.todo.push(todo)

        return todo;
    }
};


function addTodo(e) {
    e.preventDefault();
    const autherText = auther.value;
    const postText = post.value;

    const objTodo = base.addTodo(autherText, postText);
    const todoLi = createTodo(objTodo);
    list.append(todoLi);
    setTodoLS();
    todoForm.reset();
}

function createTodo(objTodo) {
    const todoItem = `
        <article class="post ${objTodo.ready ? 'post__complete' : ''}">
            <h3 class="post__auther">${objTodo.auther}</h3>
            <p class="post__todo">${objTodo.post}</p>
            ${!objTodo.ready ? `
            <button class="post__ready" type="button"
                    data-id = "${objTodo.id}"><svg xmlns="http://www.w3.org/2000/svg"
                    height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
            </button>
            ` : ''}
            
        </article>
    `;

    const li = document.createElement('li');
    li.classList.add('todo__list-item');
    li.innerHTML = todoItem;

    return li;
}

function renderTodo() {
    for (let i = 0; i < base.todo.length; i++) {
        const todoLi = createTodo(base.todo[i]);
        list.append(todoLi);
    }
}

function checkTodo(e) {
    const btn = e.target.closest('.post__ready');

    if (btn) {
        const post = btn.closest('.post');
        btn.remove();
        post.classList.add('post__complete');
        const id = btn.dataset.id;
        base.check(id);
        setTodoLS();
    }
}

function getTodoLS() {
    if (localStorage.getItem('todo')) {
        return JSON.parse(localStorage.getItem('todo'))
    }

    return [];
}


function setTodoLS() {
    localStorage.setItem('todo', JSON.stringify(base.todo));
}


renderTodo();

todoForm.addEventListener('submit', addTodo);
list.addEventListener('click', checkTodo);