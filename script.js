// Filter functionality
let currentFilter = 'all';

function filterTasks(filter) {
    currentFilter = filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderTasks();
}

// Update renderTasks to handle filtering
function renderTasksFiltered() {
    taskList.innerHTML = '';
    
    let filteredTasks = tasks;
    
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
    
    // Update task count
    updateTaskCount(filteredTasks.length, tasks.length);
}

// Replace original renderTasks
function renderTasks() {
    renderTasksFiltered();
}

// Update task count display
function updateTaskCount(filtered, total) {
    let countElement = document.getElementById('taskCount');
    if (!countElement) {
        countElement = document.createElement('div');
        countElement.id = 'taskCount';
        countElement.className = 'task-count';
        document.querySelector('.filter-section').appendChild(countElement);
    }
    
    if (currentFilter === 'all') {
        countElement.textContent = `Total: ${total} tasks`;
    } else if (currentFilter === 'active') {
        countElement.textContent = `Active: ${filtered} of ${total} tasks`;
    } else {
        countElement.textContent = `Completed: ${filtered} of ${total} tasks`;
    }
}