"use strict";

const todo_title_input = document.querySelector("#todo-title-input");
const todo_add_btn = document.getElementById("todo-add-btn");
const todo_table = document.getElementById("todo-table-body");


eel.expose
function displayTodo(todo) {

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = todo['title'];

    let td2 = document.createElement("td");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("data-id", todo['id']);
    checkbox.setAttribute("type", "checkbox");

    // checkbox click
    checkbox.addEventListener("click", (event) => {

        event.target.setAttribute("disabled", "true");

        let id = event.target.getAttribute("data-id");
        eel.delete_todo(parseInt(id));

        // remove row from table
        let tr = event.target.parentElement.parentElement;
        $(tr).fadeTo("slow", 0.001, function () {
            $(this).remove();
        })
    });

    td2.appendChild(checkbox);
    tr.appendChild(td1);
    tr.appendChild(td2);
    todo_table.appendChild(tr);

    todo_title_input.value = "";
}

eel.expose
function displayAllTodos(todos) {

    for (let todo of todos["todos"]) {
        displayTodo(todo);
    }
}

todo_add_btn.addEventListener("click", (event) => {

    let content = todo_title_input.value;
    if (content != "") {
        // create a new todo element and display it on table
        eel.create_todo(content)(displayTodo);
    }
})

eel.list_todo()(displayAllTodos);