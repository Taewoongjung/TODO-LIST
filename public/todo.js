var submit = document.getElementById('regi-todo');
    var todo = document.getElementById('todo');
    var list = document.getElementById('todo-list');

    submit.addEventListener('click', clickButton);

    function clickButton() {
      var temp = document.createElement('li');
      temp.innerHTML = todo.value;
      list.appendChild(temp);
}