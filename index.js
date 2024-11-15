//declaration des variables

//contantes
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const pagination = document.getElementById('pagination');

//variables
let tasks = [];
let editIndex = null;
let currentPage = 1;
let tasksPerPage = 4;

//ajouter un evenement a un element
addBtn.addEventListener('click', () => {
    //trim() pour supprimer les espaces blancs
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        if (editIndex == null) {
            //ajouter une nouvelle tache
            tasks.push({ text: taskText, completed: false })
        } else {
            //modifier la tache
            tasks[editIndex].text = taskText;
            editIndex = null;
        }
        taskInput.value = '';
        renderTasks();
    }
})


function renderTasks() {
    //retourner le html d'un element
    taskList.innerHTML = '';
    //pagination
    const start = (currentPage - 1) * tasksPerPage;
    const end = start + tasksPerPage;
    //slice() 
    const PaginatedTasks = tasks.slice(start, end);

    PaginatedTasks.forEach((task, index) => {
        //creer un element
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        if (task.completed) {
            taskCard.classList.add('completed');
        }
        const taskContent = document.createElement('div');
        taskContent.innerHTML = `<input type="checkbox"${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>`;

        const checkbox = taskContent.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '&#9998;';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            taskInput.value = task.text;
            editIndex = start + index;
        });
        taskCard.appendChild(taskContent);
        taskCard.appendChild(editBtn);
        taskList.appendChild(taskCard);

    });
    renderPagination();

}


function renderPagination() {
    pagination.innerHTML='';
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true;
        }

        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderTasks();
        });
        pagination.appendChild(pageButton);
    }
}


renderTasks();



