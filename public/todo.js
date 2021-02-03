const createTodo = (lists, i) => {
    const row = document.createElement('tr');
    let td = document.createElement('th');
    let row_data;
    if(i !== null){
        row_data = lists.todo[i];
        console.log(row_data);
    }
    else{
        row_data = lists.todo;
    }
    const data_id = row_data.id;
    //load whole lists
    td.textContent = row_data.comment;
    td.className="todo"
    row.appendChild(td);
}

window.onload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/todo/showlist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.addEventListener('load', () => {
        const lists = JSON.parse(xhr.responseText);
        const tbody = document.querySelector('todo-list');
        for(let i = 0; i < lists.todo.length; i++){
            tbody.appendChild(createTodo(lists, i));
        }
    });
}

const todo = document.getElementById('todo-list');
const todo_context = document.getElementById('todo');
const submit = document.getElementById('regi-todo');
submit.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/todo');
    xhr.setRequestHeader('Content-type', 'application/json');

    const tbody = document.querySelector('todo-list');
    xhr.addEventListener('load', () => {
        const list = JSON.parse(xhr.responseText);
        tbody.appendChild(createTodo(list, null));
    });
});

document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const todo = e.target.todo.value;
    
    try {
      await axios.post('/todo', { todo });
    } catch (err) {
      console.error(err);
    }

    e.target.todo.value = '';
});
  