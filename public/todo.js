const createBtn = (type, attribute, value) => {
    const btn = document.createElement('input');
    btn.setAttribute('type', type);
    if(value !== null){
        btn.setAttribute(attribute, value);
    }
    return btn;
}

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

    const del = createBtn('submit', 'value', 'delete');
    del.addEventListener('click', async () => {
        const erase = new XMLHttpRequest();
        erase.open('DELETE', '/todo/delete');
        const todo_id = data_id;
        const req_del = {todo_id};
        erase.setRequestHeader('Content-Type', 'application/json');
        erase.send(JSON.stringify(req_del));
        erase.addEventListener('load', () => {});
        //delete a todo row in html
        const useless_tag = del.parentNode;
        useless_tag.parentNode.removeChild(useless_tag);
    })
    td = document.createElement('td');
    del.className = "todo-btn";
    td.append(del);
    row.append(del);

    // td = document.createElement('td');
    // td.className = "user-id";
    // td.innerText = row_data.id;
    // row.appendChild(td);
    return row;
}

window.onload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/todo/showlist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.addEventListener('load', () => {
        const lists = JSON.parse(xhr.responseText);
        console.log("전송 됨? : ", lists);
        const tbody = document.querySelector('#todo-list');
        console.log("맞음? : ", tbody);
        for(let i = 0; i < lists.todo.length; i++){
            tbody.appendChild(createTodo(lists, i));
        }
    });
}

const todo = document.getElementById('todo-list');
const todo_context = document.getElementById('todo');
const submit = document.getElementById('regi-todo');
submit.addEventListener('click', () => {
    let data = {'todo': todo_context.value};
    data = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/todo');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(data);
    const tbody = document.querySelector('todo-list');
    xhr.addEventListener('load', () => {
        const list = JSON.parse(xhr.responseText);
        tbody.appendChild(createTodo(list, null));
    });
});