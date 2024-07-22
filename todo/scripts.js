document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const timestamp = new Date().toLocaleString();
    addTask(taskText, timestamp);

    taskInput.value = '';
    updateCounters();
});

document.getElementById('delete-selected').addEventListener('click', function() {
    const tasks = document.querySelectorAll('#tasks li');
    tasks.forEach(task => {
        if (task.querySelector('input[type="checkbox"]').checked) {
            task.remove();
        }
    });
    updateCounters();
});

document.getElementById('delete-all').addEventListener('click', function() {
    const tasks = document.querySelectorAll('#tasks li');
    tasks.forEach(task => task.remove());
    updateCounters();
});

document.getElementById('filter-all').addEventListener('click', function() {
    filterTasks('all');
});

document.getElementById('filter-pending').addEventListener('click', function() {
    filterTasks('pending');
});

document.getElementById('filter-completed').addEventListener('click', function() {
    filterTasks('completed');
});

function addTask(taskText, timestamp) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <input type="checkbox">
        <span class="task-text">${taskText}</span>
        <span class="time">${timestamp}</span>
        <div class="actions">
            <button class="complete"><i class="fas fa-check"></i> Complete</button>
            <button class="delete"><i class="fas fa-trash"></i> Delete</button>
        </div>
    `;

    taskItem.querySelector('.complete').addEventListener('click', function() {
        completeTask(taskItem);
    });

    taskItem.querySelector('.delete').addEventListener('click', function() {
        deleteTask(taskItem);
    });

    document.getElementById('tasks').appendChild(taskItem);
}

function completeTask(taskItem) {
    taskItem.classList.toggle('completed');
    updateCounters();
}

function deleteTask(taskItem) {
    taskItem.remove();
    updateCounters();
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll('#tasks li');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'pending':
                if (task.classList.contains('completed')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = 'flex';
                }
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
}

function updateCounters() {
    const totalTasks = document.querySelectorAll('#tasks li').length;
    const completedTasks = document.querySelectorAll('#tasks li.completed').length;

    document.getElementById('total-count').textContent = `Total Tasks: ${totalTasks}`;
    document.getElementById('completed-count').textContent = `Completed: ${completedTasks}`;
}
