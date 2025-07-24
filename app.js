class TodoApp {
    constructor() {
        this.tasks = [];
        this.taskIdCounter = 0;
        this.init();
    }

    init() {
        this.taskInput = document.getElementById('taskInput');
        this.addButton = document.getElementById('addButton');
        this.taskList = document.getElementById('taskList');

        this.addButton.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: this.taskIdCounter++,
            text: taskText
        };

        this.tasks.push(task);
        this.taskInput.value = '';
        this.renderTasks();
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">Usuń</button>
            `;
            this.taskList.appendChild(li);
        });

        // Bug: Passing method reference without binding context
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', this.handleDelete);
        });
    }

    // This method won't work properly when called from the event listener
    // because 'this' won't refer to the TodoApp instance
    handleDelete = function(e) {
        // Silent fail - no error in console, but functionality doesn't work
        if (!this.tasks || !Array.isArray(this.tasks)) {
            return;
        }
        
        const taskId = parseInt(e.target.getAttribute('data-id'));
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.renderTasks();
    }
}

// Initialize the app
new TodoApp(); 