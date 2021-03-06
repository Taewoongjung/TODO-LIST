const createBtn = (type, attribute, value) => {
    const btn = document.createElement('input');
    btn.setAttribute('type', type);
    if(value !== null){
        btn.setAttribute(attribute, value);
    }
    return btn;
}

let max_priority = 1;
let todo_priority = 1;
const ids = new Map();
const order_num = new Map();

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

    const done = createBtn('checkbox', 'checked', null);
    done.addEventListener('click', () => {
        const finish = new XMLHttpRequest();
        let checked;
        finish.open('PUT', 'todo/done');
        if(done.hasAttribute('checked')){
            checked = false;
            done.removeAttribute('checked');
        }
        else{
            checked = true;
            done.setAttribute('checked', true);
        }
        const todo_id = data_id;
        const req_done = {
            todo_id,
            checked,
        };
        finish.setRequestHeader('Content-type', 'application/json');
        finish.send(JSON.stringify(req_done));
        finish.addEventListener('load', () => {});
    });
    if(row_data.done){
        done.setAttribute('checked', 'true');
    }
    done.className = "todo-btn";
    td.appendChild(done);
    row.appendChild(td);
    
    const edit = createBtn('submit', 'value', 'edit');
    edit.addEventListener('click', async () => {
        const new_todo = prompt('input new todo');
        const change = new XMLHttpRequest();
        change.open('PUT', '/todo/edit');
        const todo_id = data_id;
        const req_todo = {
            todo_id,
            new_todo,
        };
        change.setRequestHeader('Content-Type', 'application/json');
        change.send(JSON.stringify(req_todo));
        change.addEventListener('load', () => {
            edit.parentElement.querySelector('td').textContent = new_todo;
        })
    });
    td = document.createElement('td');
    edit.className = "todo-btn"
    td.appendChild(edit);
    row.appendChild(edit);

    
    const priority = createBtn('text', 'placeholder', todo_priority++);
    ids.set(todo_priority - 1, data_id);
    order_num.set(todo_priority - 1, row_data.order);

    max_priority = Math.max(max_priority, todo_priority);
    priority.className = "priority";
    let data = "";
    priority.onkeyup = (event) => {
        const priority_id = data_id;
        if(event.code === 'Enter'){
            if(data >= max_priority) alert('input is bigger than max priority');
            else{
                const change_order = new XMLHttpRequest();
                change_order.open('PUT', '/todo/order');
                const prev_key = priority.placeholder - '0';
                const new_key = data - '0';
                const req_order = {
                    prev_id: ids.get(prev_key),
                    prev_order: order_num.get(prev_key),
                    new_id: ids.get(new_key),
                    new_order: order_num.get(new_key),
                }
                console.log(req_order);
                change_order.setRequestHeader('Content-Type', application/json);
                change_order.send(JSON.stringify(req_order));
                change_order.addEventListener('load', () => {
                    location.reload();
                });
            }
            data="";
        }
        else if('1' <= event.key && event.key <= '9'){
            data += event.key;
        }
    }
    td = document.createElement('td');
    td.appendChild(priority);
    row.appendChild(td);

    td = document.createElement('td');
    td.className = "user-id";
    td.innerText = row_data.id;
    row.appendChild(td);
    return row;
}

window.onload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/todo/showlist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.addEventListener('load', () => {
        const lists = JSON.parse(xhr.responseText);
        const tbody = document.querySelector('#todo-list');
        for(let i = 0; i < lists.todo.length; i++){
            tbody.appendChild(createTodo(lists, i));
        }
    });
}

const todo = document.getElementById('todo-list');
const todo_context = document.getElementById('todo');
const submit = document.getElementById('regi-todo');
submit.addEventListener('click', () => {
    let data = {'todo': todo_context.value, 'order': max_priority + 1};
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